import enrichedPosts from './seo_blog_enriched.json';

export interface EnrichedBlogPost {
  id: number;
  slug: string;
  title: string;
  bucket: 'International Export & Global B2B' | 'Domestic India B2B & Clinical Procurement';
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  entities: string[];
  featuredQuestion: string;
  paaQueries: string[];
  schemaType: string;
  internalLinks: string[];
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  directAnswer: string;
  diagramType: 'tensile' | 'cvc' | 'incoterms' | 'coldchain' | 'regulatory';
  specsTable: { param: string; spec: string }[];
  sections: { heading: string; content: string }[];
  faqAnswers: string[];
}

const ALL_POSTS = enrichedPosts as EnrichedBlogPost[];

export function getAllBlogPosts(): EnrichedBlogPost[] {
  return ALL_POSTS;
}

export function getBlogPostBySlug(slug: string): EnrichedBlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): EnrichedBlogPost[] {
  return ALL_POSTS.filter(p => p.category === category);
}

export function getBlogPostsByBucket(bucket: string): EnrichedBlogPost[] {
  return ALL_POSTS.filter(p => p.bucket === bucket);
}

export function getRelatedPosts(currentId: number, count = 3): EnrichedBlogPost[] {
  const current = ALL_POSTS.find(p => p.id === currentId);
  if (!current) return ALL_POSTS.slice(0, count);

  return ALL_POSTS
    .filter(p => p.id !== currentId && (p.category === current.category || p.bucket === current.bucket))
    .slice(0, count);
}
