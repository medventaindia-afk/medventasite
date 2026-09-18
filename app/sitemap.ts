import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/seoBlogService';
import { PRODUCTS } from '@/data/products';
import { getAllLocations } from '@/data/locations';
import { getAllCategories } from '@/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.medventa.in';
  const now = new Date();

  // 1. Core static routes (Priority 0.7 - 1.0)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections/all`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/supply`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/in/b2b-quote`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pages/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/policies/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/shipping-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/refund-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. Direct Products (12 items, Priority 0.85)
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Technical Dossiers & Programmatic Blogs (100 articles, Priority 0.8)
  const blogPosts = getAllBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. City Master Hubs (40 Healthcare Capitals, Priority 0.85)
  const locations = getAllLocations();
  const locationRoutes: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${baseUrl}/supply/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Programmatic City + Category Landing Pages (40 locations x 7 categories = 280 URLs, Priority 0.75)
  const categories = getAllCategories();
  const supplyCategoryRoutes: MetadataRoute.Sitemap = [];
  for (const loc of locations) {
    for (const cat of categories) {
      supplyCategoryRoutes.push({
        url: `${baseUrl}/supply/${loc.slug}/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }
  }

  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...locationRoutes,
    ...supplyCategoryRoutes,
  ];
}
