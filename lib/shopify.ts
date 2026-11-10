/**
 * Medvanta - Shopify Storefront API GraphQL Client
 * Handles live catalog fetching, inventory queries, and native Shopify Cart/Checkout.
 */

import type { Product } from '@/data/products';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'qrgte5-fm.myshopify.com';
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-07';

export async function shopifyFetch<T>({
  query,
  variables = {},
  revalidate = 60,
}: {
  query: string;
  variables?: Record<string, any>;
  revalidate?: number | false;
}): Promise<{ data: T; errors?: any[] }> {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
  };

  try {
    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    };

    if (revalidate === false) {
      fetchOptions.cache = 'no-store';
    } else {
      fetchOptions.next = { revalidate };
    }

    const res = await fetch(endpoint, fetchOptions);

    if (!res.ok) {
      throw new Error(`Shopify GraphQL HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.errors) {
      console.error('[Shopify Storefront GraphQL Errors]:', json.errors);
    }
    return json;
  } catch (error) {
    console.error('[Shopify Storefront Fetch Error]:', error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Live Product Queries
// -----------------------------------------------------------------------------

export interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        sku?: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export async function getShopifyProducts(first = 50): Promise<ShopifyProductNode[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProductNode }> } }>({
      query,
      variables: { first },
    });
    return res.data?.products?.edges.map((e) => e.node) || [];
  } catch (e) {
    console.warn('[Shopify] Falling back to local static catalog:', e);
    return [];
  }
}

export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  if (!SHOPIFY_TOKEN) return null;

  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        vendor
        productType
        tags
        description
        descriptionHtml
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch<{ product: ShopifyProductNode | null }>({
      query,
      variables: { handle },
      revalidate: 86400,
    });
    return res.data?.product || null;
  } catch (e) {
    console.warn(`[Shopify] Product fetch for ${handle} failed:`, e);
    return null;
  }
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseTechnicalSpecs(
  html: string,
  vendor: string,
  sku: string,
  category: string
): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  if (vendor) specs.push({ label: 'Manufacturer / Brand', value: vendor });
  if (sku) specs.push({ label: 'Catalog Part / SKU', value: sku });
  if (category) specs.push({ label: 'Clinical Category', value: category });

  const regex = /<p[^>]*>\s*<strong>([^<:]+):?\s*<\/strong>:?\s*([^<]+)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null && specs.length < 10) {
    const label = stripHtmlTags(match[1]).replace(/:$/, '').trim();
    const value = stripHtmlTags(match[2]).trim();
    if (
      label &&
      value &&
      label.toLowerCase() !== 'product description' &&
      !specs.some((s) => s.label.toLowerCase() === label.toLowerCase())
    ) {
      specs.push({ label, value });
    }
  }

  return specs;
}

export async function getLiveShopifyProductAsLocalProduct(
  handle: string
): Promise<(Product & { variantId?: string }) | null> {
  const fallbackImage =
    'https://www.medventa.in/cdn/shop/files/ChatGPT_Image_Aug_13_2025_02_02_46_PM_1536x564.png';

  // 1. Try Storefront GraphQL API first
  const sp = await getShopifyProductByHandle(handle);
  if (sp) {
    const firstVariant = sp.variants?.edges?.[0]?.node;
    const price = parseFloat(
      firstVariant?.price?.amount || sp.priceRange?.minVariantPrice?.amount || '0'
    );
    const rawCompare =
      firstVariant?.compareAtPrice?.amount || sp.compareAtPriceRange?.minVariantPrice?.amount;
    const compareAtPrice = rawCompare ? parseFloat(rawCompare) : undefined;
    const vendor = sp.vendor || 'MedVenta Verified OEM';
    const category = sp.productType || sp.tags?.[0] || 'Medical & Surgical Supplies';
    const categorySlug = category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'medical-supplies';
    const sku = firstVariant?.sku || handle.split('-').pop()?.toUpperCase() || 'MV-SKU';

    const images = (sp.images?.edges || []).map((e) => e.node.url).filter(Boolean);
    const primaryImage = sp.featuredImage?.url || images[0] || fallbackImage;
    const cleanDescription =
      stripHtmlTags(sp.descriptionHtml || sp.description || '') ||
      `${sp.title} supplied directly for hospital and institutional clinical procurement across India with CDSCO compliance and GST tax invoice support.`;

    const technicalSpecs = parseTechnicalSpecs(
      sp.descriptionHtml || '',
      vendor,
      sku,
      category
    );

    const features: string[] = [
      `Authentic ${vendor} clinical medical product with verified factory batch traceability`,
      '100% GST Input Tax Credit (ITC) compliant tax invoice (HSN 9018 / 3005)',
      'Fast pan-India dispatch across Delhi NCR, Mumbai, Bengaluru, Chennai & Tier-1/2 hospitals',
      ...technicalSpecs.slice(0, 3).map((s) => `${s.label}: ${s.value}`),
    ];

    return {
      id: sp.id,
      handle: sp.handle,
      name: sp.title,
      category,
      categorySlug,
      brand: vendor,
      sku,
      price: Number.isFinite(price) && price > 0 ? price : 1999.0,
      compareAtPrice:
        compareAtPrice && Number.isFinite(compareAtPrice) && compareAtPrice > price
          ? compareAtPrice
          : undefined,
      specs: `${category} | SKU: ${sku}${firstVariant?.title && firstVariant.title !== 'Default Title' ? ` | ${firstVariant.title}` : ''}`,
      technicalSpecs,
      certifications: 'US FDA / CE Marked / CDSCO Import Compliant Medical Device',
      description: cleanDescription,
      features,
      image: primaryImage,
      gallery: images.length ? images : [primaryImage],
      inStock: sp.availableForSale !== false,
      variantId: firstVariant?.id,
    };
  }

  // 2. Public Shopify Storefront .json fallback (zero-token resilience if env var is missing)
  try {
    const res = await fetch(
      `https://${SHOPIFY_DOMAIN}/products/${encodeURIComponent(handle)}.json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const p = json?.product;
    if (!p || !p.handle) return null;

    const v0 = p.variants?.[0];
    const price = parseFloat(v0?.price || '0');
    const compareAtPrice = v0?.compare_at_price ? parseFloat(v0.compare_at_price) : undefined;
    const vendor = p.vendor || 'MedVenta Verified OEM';
    const category = p.product_type || 'Medical & Surgical Supplies';
    const categorySlug = category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'medical-supplies';
    const sku = v0?.sku || handle.split('-').pop()?.toUpperCase() || 'MV-SKU';
    const images: string[] = (p.images || []).map((im: any) => im.src).filter(Boolean);
    const primaryImage = p.image?.src || images[0] || fallbackImage;
    const cleanDescription =
      stripHtmlTags(p.body_html || '') ||
      `${p.title} supplied directly for institutional hospital procurement across India.`;
    const technicalSpecs = parseTechnicalSpecs(p.body_html || '', vendor, sku, category);

    return {
      id: `gid://shopify/Product/${p.id}`,
      handle: p.handle,
      name: p.title,
      category,
      categorySlug,
      brand: vendor,
      sku,
      price: Number.isFinite(price) && price > 0 ? price : 1999.0,
      compareAtPrice:
        compareAtPrice && Number.isFinite(compareAtPrice) && compareAtPrice > price
          ? compareAtPrice
          : undefined,
      specs: `${category} | SKU: ${sku}${v0?.title && v0.title !== 'Default Title' ? ` | ${v0.title}` : ''}`,
      technicalSpecs,
      certifications: 'US FDA / CE Marked / CDSCO Import Compliant Medical Device',
      description: cleanDescription,
      features: [
        `Authentic ${vendor} clinical medical product with verified batch traceability`,
        '100% GST Input Tax Credit (ITC) compliant tax invoice',
        'Pan-India institutional dispatch & hospital rate contract availability',
      ],
      image: primaryImage,
      gallery: images.length ? images : [primaryImage],
      inStock: true,
      variantId: v0?.id ? `gid://shopify/ProductVariant/${v0.id}` : undefined,
    };
  } catch (e) {
    console.warn(`[Shopify JSON Fallback] Failed for ${handle}:`, e);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Live Cart & Hosted Checkout Mutations
// -----------------------------------------------------------------------------

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            title: string;
            handle: string;
            featuredImage?: {
              url: string;
            };
          };
        };
      };
    }>;
  };
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            product {
              title
              handle
              featuredImage {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function createShopifyCart(
  lines: Array<{ merchandiseId: string; quantity: number }> = []
): Promise<ShopifyCart | null> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: { input: { lines } },
  });

  return res.data?.cartCreate?.cart || null;
}

export async function addLinesToShopifyCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart | null> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart | null;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: { cartId, lines },
  });

  return res.data?.cartLinesAdd?.cart || null;
}

export async function updateShopifyCartLine(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart | null> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart | null;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: { cartId, lines },
  });

  return res.data?.cartLinesUpdate?.cart || null;
}

export async function removeShopifyCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart | null;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: { cartId, lineIds },
  });

  return res.data?.cartLinesRemove?.cart || null;
}
