import { LocationData } from '@/data/locations';
import { MedicalCategoryData } from '@/data/categories';
import { getAllBlogPosts, EnrichedBlogPost } from '@/data/seoBlogService';

export const TIER_1_LOCATION_SLUGS = new Set([
  // Domestic Healthcare Capitals (12 Tier-1 Metros)
  'delhi-ncr',
  'mumbai',
  'bengaluru',
  'chennai',
  'hyderabad',
  'ahmedabad',
  'kolkata',
  'pune',
  'chandigarh',
  'lucknow',
  'jaipur',
  'kochi',
  // Export Gateways (10 Tier-1 International Centers)
  'dubai',
  'abu-dhabi',
  'riyadh',
  'jeddah',
  'doha',
  'kuwait-city',
  'nairobi',
  'accra',
  'johannesburg',
  'lagos',
]);

export function isTier1Location(slug: string): boolean {
  return TIER_1_LOCATION_SLUGS.has(slug);
}

export function shouldIndexCategoryPage(locationSlug: string, categorySlug: string): boolean {
    return isTier1Location(locationSlug);
}

// Clean text helpers
function cleanPortName(port: string): string {
  return port.split('&')[0].split(';')[0].replace(/\(.*?\)/g, '').trim();
}

function cleanLeadTime(leadTime: string): string {
  return leadTime.split(';')[0].trim();
}

function cleanTaxScheme(tax: string): string {
  if (tax.includes('GST')) return '100% GST ITC reconciliation';
  if (tax.includes('Zero-rated') || tax.includes('duty exemption') || tax.includes('Duty')) return 'Zero-rated export documentation';
  return 'Full institutional invoice compliance';
}

function getDeterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// --- DIVERSE METADATA GENERATOR FOR CATEGORY DOSSIERS ---
export interface GeneratedCategoryMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
}

export function getCategoryPageMetadata(
  location: LocationData,
  category: MedicalCategoryData
): GeneratedCategoryMetadata {
  const canonicalUrl = `https://www.medventa.in/supply/${location.slug}/${category.slug}`;
  const shouldIndex = shouldIndexCategoryPage(location.slug, category.slug);
  const hash = getDeterministicHash(`${location.slug}-${category.slug}`);
  const variant = hash % 5;

  const port = cleanPortName(location.customsPort);
  const leadTime = cleanLeadTime(location.deliveryLeadTime);
  const taxScheme = cleanTaxScheme(location.taxOrDuty);
  const topHospital = location.keyHospitals.length > 0 ? location.keyHospitals[0] : null;
  const standard = category.standards.length > 0 ? category.standards[0] : 'ISO 13485';
  const hsn = category.hsnCode.split(' ')[0];

  let title = '';
  let description = '';

  switch (variant) {
    case 0:
      // Institutional Procurement Focus
      title = `${category.name} Hospital Procurement in ${location.name} | MedVenta B2B`;
      description = `Institutional procurement of ${category.name.toLowerCase()} for hospital networks in ${location.name}${topHospital ? ` including ${topHospital}` : ''}. Verified ${location.regulatoryBody} compliance, lot test certification, and volume rate contracts.`;
      break;

    case 1:
      // Logistics, Transit & Port Focus
      title = `${category.name} Bulk Supply & ${port} Transit | ${location.name}`;
      description = `Direct bulk dispatch of ${category.name.toLowerCase()} in ${location.name}. Fast-track freight clearance via ${port} with ${leadTime}. Serialized authentic stock under ${standard} quality standards.`;
      break;

    case 2:
      // OT & ICU Clinical Consumables Focus
      title = `${category.name} Surgical & ICU Supply Hub: ${location.name} | MedVenta`;
      description = `Equipping surgical suites and intensive care units across ${location.name} with certified ${category.name.toLowerCase()}. Direct manufacturer warranty, temperature-monitored courier transit, and institutional RFQ pricing.`;
      break;

    case 3:
      // Compliance, HSN & Direct Supplier Focus
      title = `${category.name} Direct Medical Device Supplier in ${location.name} — MedVenta`;
      description = `Direct B2B hospital supplier for ${category.name.toLowerCase()} in ${location.name}, ${location.country}. Compliant billing under HSN ${hsn} with ${taxScheme}. Fast dispatch across ${location.name}.`;
      break;

    case 4:
    default:
      // Rate Contracts & Volume Distribution Focus
      title = `${category.name} Volume Distribution & Tender Supply | ${location.name}, ${location.country}`;
      description = `Annual rate contracts and volume bulk supply of ${category.name.toLowerCase()} for private hospital chains and medical centers in ${location.name}. Verified ${location.regulatoryBody} documentation and prompt dispatch.`;
      break;
  }

  return {
    title,
    description,
    canonicalUrl,
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

// --- DIVERSE METADATA GENERATOR FOR CITY MASTER HUBS ---
export interface GeneratedLocationHubMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
}

export function getLocationHubMetadata(location: LocationData): GeneratedLocationHubMetadata {
  const canonicalUrl = `https://www.medventa.in/supply/${location.slug}`;
  const hash = getDeterministicHash(location.slug);
  const variant = hash % 3;
  const port = cleanPortName(location.customsPort);

  let title = '';
  let description = '';

  if (location.type === 'Export') {
    switch (variant) {
      case 0:
        title = `Medical Device & Surgical Consumable Export to ${location.name}, ${location.country} | MedVenta`;
        description = `Certified medical device exporter to ${location.name}. Direct container & air freight of surgical sutures, vascular access, and diagnostic consumables via ${port} under ${location.regulatoryBody} compliance.`;
        break;
      case 1:
        title = `Hospital Procurement & Bulk Medical Supply in ${location.name} | MedVenta Global`;
        description = `Institutional B2B supply of CE/FDA cleared surgical equipment and diagnostic instrumentation for hospitals in ${location.name}. Verified Free Sale Certificates (FSC) and expedited customs clearance.`;
        break;
      case 2:
      default:
        title = `${location.name} Medical Supply Hub: Surgical Consumables & Devices | MedVenta`;
        description = `Global medical distributor supplying private surgical centers and ministry hospitals in ${location.name}, ${location.country}. Direct-from-manufacturer pricing with ${port} delivery.`;
        break;
    }
  } else {
    // Domestic India Hub
    switch (variant) {
      case 0:
        title = `Hospital Medical Supply & Surgical Device Hub: ${location.name} | MedVenta`;
        description = `Institutional healthcare supply serving tertiary networks across ${location.name} (${location.keyHospitals.slice(0, 2).join(' & ')}). ${cleanLeadTime(location.deliveryLeadTime)} with 100% GST ITC reconciliation.`;
        break;
      case 1:
        title = `Direct Medical Device & Hospital Consumables Supplier in ${location.name} | MedVenta`;
        description = `Comprehensive hospital procurement hub in ${location.name}. Fast delivery via ${location.logisticsCorridor.split(';')[0]}, CDSCO compliance, and manufacturer annual rate contracts.`;
        break;
      case 2:
      default:
        title = `${location.name} Hospital Supply Hub: Consumables & Diagnostic Systems | MedVenta`;
        description = `Dedicated supply partner for clinical laboratories, trauma centers, and surgical suites in ${location.name}. Rapid dispatch on core inventory with verified ${location.regulatoryBody} documentation.`;
        break;
    }
  }

  return {
    title,
    description,
    canonicalUrl,
  };
}

// --- DYNAMIC INTRODUCTORY BODY COPY (Avoids single static paragraph) ---
export function getCategoryPageIntroCopy(
  location: LocationData,
  category: MedicalCategoryData
): string {
  const hash = getDeterministicHash(`${category.slug}-${location.slug}`);
  const variant = hash % 3;
  const hospitalSample = location.keyHospitals.length > 0 ? location.keyHospitals.slice(0, 2).join(' and ') : 'regional healthcare networks';

  if (location.type === 'Export') {
    switch (variant) {
      case 0:
        return `MedVenta manages institutional export shipments of genuine ${category.name.toLowerCase()} directly to hospital stores and private surgical networks throughout ${location.name}. Every consignment is inspected with factory serialization, verified for ${location.regulatoryBody} import protocols, and expedited through ${location.customsPort} under standard Incoterms.`;
      case 1:
        return `Supporting specialized clinical departments in ${location.name}, MedVenta provides direct-from-manufacturer supplies of ${category.name.toLowerCase()} designed for ${category.clinicalApplication.toLowerCase()}. Consignments include full regulatory dossiers, batch-specific Certificates of Analysis (CoA), and temperature-controlled air or sea cargo logistics.`;
      case 2:
      default:
        return `For healthcare facilities and procurement consortia in ${location.name}, MedVenta offers volume-contracted supply of ${category.name.toLowerCase()}. Shipments are compliant with ${location.regulatoryBody} statutory requirements, packed in tamper-evident sterile barrier packaging, and cleared rapidly via ${location.customsPort}.`;
    }
  } else {
    // Domestic India Hub
    switch (variant) {
      case 0:
        return `MedVenta coordinates centralized B2B medical supply of ${category.name.toLowerCase()} for major surgical centers and ICU units across ${location.name}, including facilities like ${hospitalSample}. Orders feature same-day warehouse dispatch, 100% GST Input Tax Credit (ITC) reconciliation, and complete CDSCO batch documentation.`;
      case 1:
        return `Designed for high-throughput operating theatres and diagnostic units in ${location.name}, our ${category.name.toLowerCase()} portfolio satisfies ${category.standards[0] || 'ISO 13485'} clinical benchmarks. Consignments are dispatched directly through ${location.logisticsCorridor.split(';')[0]} to guarantee delivery within ${cleanLeadTime(location.deliveryLeadTime)}.`;
      case 2:
      default:
        return `Hospitals, trust institutions, and multi-specialty surgical suites throughout ${location.name} rely on MedVenta for authentic, traceable ${category.name.toLowerCase()}. All inventory is backed by verified manufacturer warranties, lot-specific sterilisation certificates, and institutional contract pricing.`;
    }
  }
}

// --- SEMANTIC BLOG MATCHER: CROSS-LINK TO HIGH-AUTHORITY RESEARCH BLOGS ---
export function getRelatedBlogPostsForSupply(
  location: LocationData,
  category?: MedicalCategoryData,
  limit: number = 3
): EnrichedBlogPost[] {
  const allPosts = getAllBlogPosts();

  // Keyword maps based on category
  const categoryKeywords: Record<string, string[]> = {
    'sutures-wound-closure': ['suture', 'vicryl', 'prolene', 'closure', 'wound', 'polyglactin'],
    'vascular-access-infusion': ['cvc', 'catheter', 'vascular', 'infusion', 'cannula', 'lumen'],
    'laboratory-diagnostics': ['diagnostics', 'lab', 'blood', 'analyzer', 'collection', 'reagent'],
    'electrosurgery-hemostasis': ['electrosurgery', 'pencil', 'hemostasis', 'cautery', 'monopolar', 'coagulation'],
    'diagnostic-instrumentation': ['diagnostic', 'ophthalmoscope', 'otoscope', 'instrumentation', 'welch'],
    'nephrology-dialysis': ['dialysis', 'nephrology', 'dialyzer', 'fistula', 'hemodialysis'],
    'advanced-wound-care': ['wound', 'dressing', 'hydrocolloid', 'alginate', 'foam'],
  };

  const targetKeywords = category ? categoryKeywords[category.slug] || [] : [];

  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    const postTitleLower = post.title.toLowerCase();
    const postSlugLower = post.slug.toLowerCase();
    const postCatLower = post.category.toLowerCase();

    // 1. Category relevance match (highest weight)
    for (const kw of targetKeywords) {
      if (postTitleLower.includes(kw) || postSlugLower.includes(kw)) score += 5;
      if (postCatLower.includes(kw)) score += 4;
    }

    // 2. Geographic / Bucket relevance
    if (location.type === 'Export') {
      if (location.region === 'GCC & Middle East') {
        if (postCatLower.includes('gcc') || postTitleLower.includes('dubai') || postTitleLower.includes('uae') || postTitleLower.includes('saudi') || postTitleLower.includes('riyadh')) {
          score += 6;
        }
      } else if (location.region === 'Africa') {
        if (postCatLower.includes('african') || postTitleLower.includes('kenya') || postTitleLower.includes('ghana') || postTitleLower.includes('nairobi')) {
          score += 6;
        }
      }
      if (postCatLower.includes('logistics') || postCatLower.includes('incoterms')) score += 3;
    } else {
      // Domestic India
      if (post.bucket.includes('Domestic India') || postCatLower.includes('gst') || postCatLower.includes('nabh')) {
        score += 4;
      }
    }

    // 3. Exact city name match in blog title
    if (postTitleLower.includes(location.name.toLowerCase())) {
      score += 8;
    }

    return { post, score };
  });

  scoredPosts.sort((a, b) => b.score - a.score);

  // Return top unique posts
  return scoredPosts
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.post);
}

