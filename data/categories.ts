import { PRODUCTS, type Product } from './products';

export interface MedicalCategoryData {
  slug: string;
  name: string;
  hsnCode: string;
  clinicalApplication: string;
  standards: string[];
  productHandles: string[];
  specsSummary: { label: string; value: string }[];
  overview: string;
}

export const MEDICAL_CATEGORIES: MedicalCategoryData[] = [
  {
    slug: 'sutures-wound-closure',
    name: 'Sutures & Wound Closure',
    hsnCode: '9018.90.99 / 3006.10.10',
    clinicalApplication: 'General surgery, cardiovascular anastomosis, orthopedic fascia closure, sub-cuticular skin approximation',
    standards: ['USP Gauge Sizing Standard', 'ISO 13485:2016', 'CE 0123 Notified Body', 'CDSCO Class C License'],
    productHandles: ['medtronic-covidien-polysorb-suture', 'ethicon-prolene-polypropylene-suture'],
    specsSummary: [
      { label: 'Tensile Retention', value: '75% at 14d, 50% at 21d (Absorbable) / Indefinite (Prolene)' },
      { label: 'Sterility Assurance', value: '100% Ethylene Oxide (EO) Cycle (SAL 10^-6)' },
      { label: 'Needle Geometry', value: 'AISI 300-series stainless steel, 3/8 circle reverse cutting / taper' },
      { label: 'Packaging', value: '36 individual sterile peel-packs per box, moisture barrier foil' }
    ],
    overview: 'High-tensile synthetic absorbable (Polyglactin 910/Lactomer) and non-absorbable monofilament (Polypropylene) surgical sutures engineered for smooth tissue passage and knot security.'
  },
  {
    slug: 'vascular-access-infusion',
    name: 'Vascular Access & Infusion',
    hsnCode: '9018.39.00',
    clinicalApplication: 'Critical care central venous monitoring, total parenteral nutrition (TPN), emergency volume resuscitation, peripheral IV access',
    standards: ['CDC CLABSI Prevention Guidelines', 'ISO 10555-1 Intravascular Catheters', 'CDSCO Class C', 'FDA 510(k) Cleared'],
    productHandles: ['cook-medical-spectrum-triple-lumen-cvc', 'bd-insyte-autoguard-bc-shielded-catheter'],
    specsSummary: [
      { label: 'Catheter Caliber', value: '7.0 French (Fr) Triple Lumen / 18G–24G Peripheral Cannula' },
      { label: 'Flow Rates', value: 'Distal 16G (45 mL/min), Medial 18G (26 mL/min), Proximal 18G (28 mL/min)' },
      { label: 'Biocompatibility', value: 'Thermosensitive polyurethane that softens at 37°C body temperature' },
      { label: 'Infection Barrier', value: 'Maximal sterile barrier insertion kit with blood-control push-button needle retraction' }
    ],
    overview: 'Advanced vascular access devices featuring thermosensitive central venous catheters and blood-control shielded IV cannulas to eliminate needle-stick injuries and prevent CRBSI in intensive care units.'
  },
  {
    slug: 'laboratory-diagnostics',
    name: 'Laboratory Diagnostics',
    hsnCode: '9018.90.99 / 3822.00.90',
    clinicalApplication: 'Clinical biochemistry, hematology, immuno-assay testing, capillary blood sampling in neonatal/pediatric wards',
    standards: ['ISO 6710 Blood Collection Tubes', 'CE 0123 / IVD Directive', 'CLSI Order of Draw Protocol'],
    productHandles: ['bd-vacutainer-sst-blood-collection-tubes', 'sarstedt-microvette-500-capillary-blood-tubes'],
    specsSummary: [
      { label: 'Additive Formulations', value: 'Silica clot activator with inert polymer barrier gel / K3-EDTA' },
      { label: 'Volume Options', value: '5.0 mL adult vacuum draw / 200–500 µL capillary micro-collection' },
      { label: 'Centrifugation Window', value: '1100–1300 RCF for 10 minutes (Yields pure, stable serum barrier)' },
      { label: 'Color Coding', value: 'Gold / Yellow SST Hemogard™ closure & Lavender EDTA caps' }
    ],
    overview: 'Precision evacuated and capillary blood collection systems ensuring sample integrity, zero cellular hemolysis, and interference-free diagnostic analyzer testing.'
  },
  {
    slug: 'electrosurgery-hemostasis',
    name: 'Electrosurgery & Hemostasis',
    hsnCode: '9018.90.99',
    clinicalApplication: 'Monopolar cutting and coagulation, endoscopic surgical vessel occlusion, general laparoscopic hemostasis',
    standards: ['IEC 60601-2-2 High Frequency Surgical Equipment', 'CE 0123', 'CDSCO Class B'],
    productHandles: ['medtronic-valleylab-electrosurgical-pencil', 'medtronic-surgiclip-titanium-clip-applier'],
    specsSummary: [
      { label: 'Electrode Blade', value: 'Hex-locking stainless steel with Edge™ anti-adherent coating' },
      { label: 'Clip Material', value: 'Implantable medical-grade pure titanium with chevron cross-serrations' },
      { label: 'Switch Mechanism', value: 'Dual sealed push-button cut/coag with gold-plated contacts' },
      { label: 'Cable Length', value: '3.0 meter flexible silicone cable with standard 3-prong generator connector' }
    ],
    overview: 'High-frequency electrosurgical pencils and automatic titanium ligating clip appliers for precise intraoperative surgical hemostasis and minimal thermal tissue injury.'
  },
  {
    slug: 'diagnostic-instrumentation',
    name: 'Diagnostic Instrumentation',
    hsnCode: '9018.90.19',
    clinicalApplication: 'ENT otoscopy, tympanic membrane pathology assessment, dilated/undilated ophthalmoscopic fundus examination',
    standards: ['ISO 10942 Direct Ophthalmoscopes', 'ISO 10943 Otoscopes', 'CE Mark / FDA Cleared'],
    productHandles: ['welch-allyn-macroview-plus-led-otoscope', 'welch-allyn-coaxial-diagnostic-ophthalmoscope'],
    specsSummary: [
      { label: 'Illumination Tech', value: 'SureColor™ LED (3x larger field of view, true tissue color rendering)' },
      { label: 'Magnification', value: 'Focus-free optical lens design with 3x higher magnification' },
      { label: 'Optical Filters', value: 'Polarizing filter, red-free filter, micro-spot, small, large apertures' },
      { label: 'Power Interface', value: '3.5V rechargeable lithium-ion universal handle compatibility' }
    ],
    overview: 'Gold-standard diagnostic physical exam sets engineered by Welch Allyn with advanced optical alignment and long-life LED illumination for clinical examination suites.'
  },
  {
    slug: 'nephrology-dialysis',
    name: 'Nephrology & Dialysis',
    hsnCode: '9018.90.31',
    clinicalApplication: 'Hemodialysis for acute renal failure (ARF) and end-stage renal disease (ESRD) in dialysis centers and ICUs',
    standards: ['ISO 8637 Hemodialysers and Hemofilters', 'CE 0123', 'CDSCO Class D High-Risk Medical Device'],
    productHandles: ['high-flux-polysulfone-dialyzer-membrane'],
    specsSummary: [
      { label: 'Membrane Polymer', value: 'Synthetic high-flux polysulfone / polyethersulfone hollow fibers' },
      { label: 'Effective Area', value: '1.8 to 2.0 m² surface area with 200 µm internal capillary diameter' },
      { label: 'Urea Clearance (KoA)', value: '> 800 mL/min; Ultrafiltration coefficient > 40 mL/h/mmHg' },
      { label: 'Sterilization Cycle', value: 'Gamma radiation / In-line steam sterilized (pyrogen-free)' }
    ],
    overview: 'High-performance hollow-fiber dialyzers offering exceptional beta-2 microglobulin clearance, excellent biocompatibility, and consistent hydraulic permeability across dialysis sessions.'
  },
  {
    slug: 'advanced-wound-care',
    name: 'Advanced Wound Care',
    hsnCode: '3005.90.90 / 3004.90.99',
    clinicalApplication: 'Diabetic foot ulcers, venous stasis ulcers, surgical incision infections, second-degree burns, MRSA wound prophylaxis',
    standards: ['US FDA 510(k) Cleared', 'ISO 13485', 'USP Antimicrobial Effectiveness Test <51>'],
    productHandles: ['vitastem-ultra-wound-care-antibiotic-gel'],
    specsSummary: [
      { label: 'Active Delivery', value: 'Proprietary transdermal carrier targeting bacterial cell walls in <60 seconds' },
      { label: 'Antimicrobial Spectrum', value: 'Efficacy against Gram-positive, Gram-negative, and drug-resistant MRSA/MSSA' },
      { label: 'Storage Temperature', value: '+15°C to +30°C (Stable thermal envelope, non-toxic formulation)' },
      { label: 'Packaging', value: 'Sterile 1.0 oz / 30 mL multi-dose tube with precision dispensing nozzle' }
    ],
    overview: 'FDA-cleared topical therapeutic agents utilizing patented delivery technology to achieve rapid bacterial eradication and accelerate granulation in non-healing wounds.'
  }
];

export function getAllCategories(): MedicalCategoryData[] {
  return MEDICAL_CATEGORIES;
}

export function getCategoryBySlug(slug: string): MedicalCategoryData | undefined {
  return MEDICAL_CATEGORIES.find(c => c.slug === slug);
}

export function getProductsForCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return PRODUCTS.filter(p => category.productHandles.includes(p.handle));
}
