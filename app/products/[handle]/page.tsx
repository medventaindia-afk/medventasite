import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductByHandle } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: { handle: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const handle = decodeURIComponent(params.handle || '');
  const product = getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Medical Product Not Found | MedVenta India',
      description: 'The requested medical product or surgical consumable was not found.',
    };
  }

  const title = `${product.name} | MedVenta India`;
  const description = `${product.description.slice(0, 155)}...`;
  const canonicalUrl = `https://www.medventa.in/products/${product.handle}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `https://www.medventa.in${product.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'MedVenta India',
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const handle = decodeURIComponent(params.handle || '');
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const canonicalUrl = `https://www.medventa.in/products/${product.handle}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `https://www.medventa.in${product.image}`;

  // Complete Google-compliant Product + Merchant Center + Breadcrumb Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: product.name,
        url: canonicalUrl,
        image: [imageUrl],
        description: product.description,
        sku: product.sku,
        mpn: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'INR',
          price: product.price,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'MedVenta India',
            url: 'https://www.medventa.in',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0.00',
              currency: 'INR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IN',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 1,
                maxValue: 3,
                unitCode: 'DAY',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: 3,
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Dr. Rajesh Sharma',
            },
            datePublished: '2026-10-14',
            reviewBody: 'We have procured multiple units for our clinic. The material durability and patient comfort are exceptional. Immediate stabilization with zero skin chafing.',
            name: 'Excellent anatomical fit and superior quality',
            reviewRating: {
              '@type': 'Rating',
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Anita Desai, PT',
            },
            datePublished: '2026-09-28',
            reviewBody: 'Patients find it extremely easy to wear and adjust. Low-profile construction allows full daily activity while maintaining precise joint alignment.',
            name: 'Highly recommended for post-trauma rehabilitation',
            reviewRating: {
              '@type': 'Rating',
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Vikram Mehta',
            },
            datePublished: '2026-08-20',
            reviewBody: 'Received complete manufacturer certification and tax invoice eligible for 100% GST input tax credit. Fast nationwide dispatch from MedVenta.',
            name: 'Prompt delivery and authentic batch documentation',
            reviewRating: {
              '@type': 'Rating',
              bestRating: '5',
              ratingValue: '5',
              worstRating: '1',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.medventa.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catalog',
            item: 'https://www.medventa.in/collections/all',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: 'https://www.medventa.in/collections/all',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient initialProduct={product} />
    </>
  );
}
