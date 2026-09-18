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

      // If still not resolved, query the first available product in Shopify as fallback
      if (!resolvedVariantId) {
        try {
          const fallbackRes = await shopifyFetch<{
            products: {
              edges: Array<{
                node: {
                  variants: {
                    edges: Array<{ node: { id: string } }>;
                  };
                };
              }>;
            };
          }>({
            query: `
              query getFirstAvailableVariant {
                products(first: 1) {
                  edges {
                    node {
                      variants(first: 1) {
                        edges {
                          node {
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
          });
          const fallbackId = fallbackRes.data?.products?.edges?.[0]?.node?.variants?.edges?.[0]?.node?.id;
          if (fallbackId) {
            resolvedVariantId = fallbackId;
          }
        } catch (e) {
          console.warn('[Shopify Checkout] Fallback variant lookup failed:', e);
        }
      }

      if (resolvedVariantId) {
        lines.push({
          merchandiseId: resolvedVariantId,
          quantity: item.quantity || 1,
        });
      }
    }

    if (!lines.length) {
      return NextResponse.json({ error: 'No valid products found for checkout' }, { status: 400 });
    }

    // Call Shopify Storefront cartCreate
    const cart = await createShopifyCart(lines);

    if (!cart || !cart.checkoutUrl) {
      return NextResponse.json({ error: 'Failed to create Shopify checkout session' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
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
