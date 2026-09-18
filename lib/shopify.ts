/**
 * Medvanta - Shopify Storefront API GraphQL Client
 * Handles live catalog fetching, inventory queries, and native Shopify Cart/Checkout.
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'qrgte5-fm.myshopify.com';
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-07';

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data: T; errors?: any[] }> {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR caching for 60 seconds
    });

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
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
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
    });
    return res.data?.product || null;
  } catch (e) {
    console.warn(`[Shopify] Product fetch for ${handle} failed:`, e);
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
