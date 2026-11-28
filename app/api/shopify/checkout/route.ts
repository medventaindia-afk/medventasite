import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, createShopifyCart } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body as {
      items: Array<{
        id: string;
        handle?: string;
        quantity: number;
        variantId?: string;
      }>;
    };

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const lines: Array<{ merchandiseId: string; quantity: number }> = [];
    const unresolved: string[] = [];

    for (const item of items) {
      let resolvedVariantId = item.variantId;

      // If no variantId is provided, look up by product handle in Shopify Storefront
      if (!resolvedVariantId && item.handle) {
        try {
          const productRes = await shopifyFetch<{
            product: {
              variants: {
                edges: Array<{ node: { id: string } }>;
              };
            } | null;
          }>({
            query: `
              query getProductVariant($handle: String!) {
                product(handle: $handle) {
                  variants(first: 1) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            `,
            variables: { handle: item.handle },
          });

          const variant = productRes.data?.product?.variants?.edges?.[0]?.node?.id;
          if (variant) {
            resolvedVariantId = variant;
          }
        } catch (e) {
          console.warn(`[Shopify Checkout] Could not resolve variant for handle: ${item.handle}`, e);
        }
      }

      // Never substitute a different product: if an item cannot be matched to a
      // Shopify variant, report it instead of charging the customer for something else.
      if (!resolvedVariantId) {
        unresolved.push(item.handle || item.id);
        continue;
      }

      if (resolvedVariantId) {
        lines.push({
          merchandiseId: resolvedVariantId,
          quantity: item.quantity || 1,
        });
      }
    }

    if (unresolved.length) {
      return NextResponse.json(
        {
          error:
            'Some items in your cart are not available for online purchase right now. Please remove them and try again, or contact us on WhatsApp.',
          unavailable: unresolved,
        },
        { status: 422 }
      );
    }

    if (!lines.length) {
      return NextResponse.json({ error: 'No valid products found for checkout' }, { status: 400 });
    }

    // Call Shopify Storefront cartCreate
    const cart = await createShopifyCart(lines);

    if (!cart || !cart.checkoutUrl) {
      return NextResponse.json({ error: 'Failed to create Shopify checkout session' }, { status: 500 });
    }

    // Shopify builds checkout links on the store's primary domain. If checkout is served
    // from a separate Shopify-connected domain, point customers there.
    let checkoutUrl = cart.checkoutUrl;
    const checkoutHost = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN;
    if (checkoutHost) {
      try {
        const u = new URL(checkoutUrl);
        u.host = checkoutHost;
        checkoutUrl = u.toString();
      } catch {
        /* keep the original link */
      }
    }

    return NextResponse.json({
      success: true,
      cartId: cart.id,
      checkoutUrl,
      totalQuantity: cart.totalQuantity,
      totalAmount: cart.cost.totalAmount,
    });
  } catch (error: any) {
    console.error('[Shopify Checkout API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
