export interface Product {
  id: string;
  handle: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  specs: string;
  technicalSpecs: { label: string; value: string }[];
  badge?: string;
  certifications: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  inStock: boolean;
  lowStock?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '3pp-bunion-p5007',
    handle: '3-point-products-splint-3pp-bunion-aider-p5007',
    name: '3-Point Products Splint 3Pp Bunion-Aider Hlx Vlgs Foam Beige Sz One Size Fits All Universal Each - P5007',
    category: 'Orthopedic & Splints',
    categorySlug: 'orthopedic-splints',
    brand: '3-Point Products',
    sku: 'P5007',
    price: 2831.06,
    compareAtPrice: 3200.00,
    specs: 'Universal Size, Soft Foam Beige Splint with Metatarsal Strap',
    technicalSpecs: [
      { label: 'Manufacturer', value: '3-Point Products Inc.' },
      { label: 'Item Number', value: 'P5007' },
      { label: 'Size', value: 'One Size Fits All (Universal Left or Right)' },
      { label: 'Target Condition', value: 'Hallux Valgus (Bunions), Great Toe Realignment' },
      { label: 'Material Composition', value: 'Breathable foam, non-elastic hook-and-loop stabilization straps' },
      { label: 'Cleaning Care', value: 'Hand wash in warm water with mild detergent, air dry' }
    ],
    certifications: 'CE / US FDA Registered Class I Medical Device',
    description: `The 3Pp Bunion-Aider provides dynamic 3-point corrective alignment for hallux valgus (bunions). Designed by orthopedic specialists, it gently pulls the great toe into neutral alignment while relieving pressure over the first metatarsal head. Thin, breathable foam fits comfortably inside most footwear.`,
    features: [
      'Gentle 3-point leverage straightens the big toe and stabilizes the first metatarsophalangeal (MTP) joint',
      'Soft foam lining conforms to foot contours without chafing or pressure points',
      'Can be worn day and night, barefoot or inside casual and athletic shoes',
      'Universal reversible design fits both left and right feet'
    ],
    image: '/cdn/shop/products/3pp-bunion-aider-splint.jpg',
    gallery: [
      '/cdn/shop/products/3pp-bunion-aider-splint.jpg'
    ],
    inStock: true
  },
  {
    id: '3pp-oval8-p1008-cb1',
    handle: '3-point-products-splint-combo-oval-8-finger-size-2-6-p1008-cb1',
    name: '3-Point Products Splint Combo Oval-8 Finger Size 2-6 Ea - P1008-CB1',
    category: 'Orthopedic & Splints',
    categorySlug: 'orthopedic-splints',
    brand: '3-Point Products',
    sku: 'P1008-CB1',
    price: 7551.06,
    compareAtPrice: 8400.00,
    specs: 'Kit of Oval-8 Splints, Sizes 2 through 6 (1 Each)',
    technicalSpecs: [
      { label: 'Manufacturer', value: '3-Point Products Inc.' },
      { label: 'Product Code', value: 'P1008-CB1' },
      { label: 'Sizes Included', value: 'Sizes 2, 3, 4, 5, and 6 (5 Splints Total)' },
      { label: 'Clinical Application', value: 'Mallet finger, Swan neck, Boutonniere deformity, Trigger finger' },
      { label: 'Material', value: 'Molded high-strength seamless polypropylene, latex-free' },
      { label: 'Waterproof', value: '100% waterproof for showering and hand-washing' }
    ],
    certifications: 'CE / US FDA Medical Device',
    description: `Oval-8 finger splints treat 6 distinct finger conditions with one versatile, low-profile design. Seamless molded plastic with smooth rounded edges provides rigid joint stabilization without bulky straps or tape. Waterproof and lightweight.`,
    features: [
      'Includes sizes 2 through 6 for comprehensive clinical sizing and treatment',
      'Open design keeps skin dry and allows full functional hand use',
      '100% waterproof—patients can wash hands and shower without removing',
      'Simple rotation adjusts angle of leverage from firm to gentle support'
    ],
    image: '/cdn/shop/products/oval-8-finger-splint.jpg',
    gallery: [
      '/cdn/shop/products/oval-8-finger-splint.jpg'
    ],
    inStock: true
  },
  {
    id: '3pp-oval8-p1008-cb2',
    handle: '3-point-products-splint-combo-oval-8-finger-size-5-9-p1008-cb2',
    name: '3-Point Products Splint Combo Oval-8 Finger Size 5-9 Ea - P1008-CB2',
    category: 'Orthopedic & Splints',
    categorySlug: 'orthopedic-splints',
    brand: '3-Point Products',
    sku: 'P1008-CB2',
    price: 3869.46,
    compareAtPrice: 4300.00,
    specs: 'Kit of Oval-8 Splints, Sizes 5 through 9 (1 Each)',
    technicalSpecs: [
      { label: 'Manufacturer', value: '3-Point Products Inc.' },
      { label: 'Product Code', value: 'P1008-CB2' },
      { label: 'Sizes Included', value: 'Sizes 5, 6, 7, 8, and 9 (5 Splints Total)' },
      { label: 'Clinical Application', value: 'Mallet finger, Swan neck, Boutonniere, Arthritis hypermobility' },
      { label: 'Material', value: 'Molded medical polypropylene, latex-free' },
      { label: 'Waterproof', value: '100% waterproof, impervious to moisture and skin oils' }
    ],
    certifications: 'CE / US FDA Medical Device',
    description: `Oval-8 finger splints in larger sizes (5 to 9) designed for thumbs and larger fingers. Treats trigger finger, arthritis joint deviation, and extensor tendon injuries with comfortable, all-day support.`,
    features: [
      'Features sizes 5, 6, 7, 8, and 9 for larger digits and thumb stabilization',
      'Ultra-thin molded profile fits under gloves and clothing without catching',
      'No messy tape or hook-and-loop straps to replace',
      'Molded from durable, medical-grade, hypoallergenic plastic'
    ],
    image: '/cdn/shop/products/oval-8-finger-splint.jpg',
    gallery: [
      '/cdn/shop/products/oval-8-finger-splint.jpg'
    ],
    inStock: true
  },
  {
    id: '3pp-sling-553221',
    handle: '3-point-products-sling-finger-25-pk-553221',
    name: '3-Point Products Sling Finger 25/Pk - 553221',
    category: 'Orthopedic & Splints',
    categorySlug: 'orthopedic-splints',
    brand: '3-Point Products',
    sku: '553221',
    price: 8306.26,
    compareAtPrice: 9150.00,
    specs: 'Finger Sling 25 Per Pack, Clinical Grade Beige Strap',
    technicalSpecs: [
      { label: 'Manufacturer', value: '3-Point Products Inc.' },
      { label: 'SKU / Model Number', value: '553221' },
      { label: 'Packaging', value: '25 per Pack' },
      { label: 'Application', value: 'Dynamic finger extension and PIP joint flexion splinting' },
      { label: 'Material', value: 'Breathable foam-lined hook and loop strapping' },
      { label: 'Regulatory', value: 'FDA Registered Medical Device / CE Marked' }
    ],
    certifications: 'CE / US FDA Registered',
    description: `3-Point Products Sling Finger allows dynamic traction and joint positioning for PIP and DIP finger rehabilitation. Soft foam lining prevents skin irritation and pressure sores during recovery from sprains, fractures, or tendon repairs.`,
    features: [
      'Pack of 25 soft, breathable finger slings for clinic and hospital physical therapy use',
      'Washable and reusable foam strap with secure hook-and-loop closure',
      'Provides uniform traction without pinching or restricting collateral circulation',
      'Fits comfortably on all fingers and accommodates mild to severe edema'
    ],
    image: '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_10_35_46_AM_1_1019x304.png',
    gallery: [
      '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_10_35_46_AM_1_1019x304.png'
    ],
    inStock: true
  },
  {
    id: 'med-sut-01',
    handle: 'medtronic-covidien-polysorb-suture',
    name: 'Medtronic Covidien Polysorb™ Braided Absorbable Suture (Box of 36)',
    category: 'Sutures',
    categorySlug: 'sutures',
    brand: 'Medtronic',
    sku: 'MED-SL-5688G',
    price: 3850,
    compareAtPrice: 4200,
    specs: 'Size 2-0, 75cm Violet, GS-21 Needle 37mm',
    technicalSpecs: [
      { label: 'Suture Size & Type', value: 'USP 2-0 Braided Synthetic Absorbable' },
      { label: 'Strand Length & Color', value: '75 cm (30 inches), Violet pigmented' },
      { label: 'Needle Type & Length', value: 'GS-21 Reverse Cutting 37mm, 3/8 Circle' },
      { label: 'Material Composition', value: 'Lactomer™ glycolide/lactide copolymer' },
      { label: 'Coating Compound', value: 'Caprolactone/glycolide copolymer & calcium stearoyl lactylate' },
      { label: 'Absorption Profile', value: 'Hydrolytic degradation, essentially complete in 56–70 days' },
      { label: 'Tensile Strength Retention', value: '80% at 2 weeks, 30% at 3 weeks' },
      { label: 'Sterility & Packaging', value: 'Sterile EO Gas, 36 individual sterile peel-packs per box' },
      { label: 'Regulatory Compliance', value: 'CDSCO Class C / CE 0123 / US FDA 510(k) cleared' },
      { label: 'Country of Origin', value: 'United States (Covidien LP)' }
    ],
    badge: 'Fast Mover',
    certifications: 'CE 0123 / US FDA / ISO 13485',
    description: `Polysorb™ braided synthetic absorbable surgical sutures are coated with a proprietary blend of caprolactone/glycolide copolymer and calcium stearoyl lactylate. They provide predictable, reliable wound support through critical healing phases with exceptional tensile strength retention and minimal tissue drag.`,
    features: [
      'Engineered from Lactomer™ glycolide/lactide copolymer for maximum knot security',
      'Proprietary coating significantly reduces drag and tissue trauma during passage',
      'Maintains 80% tensile strength at 2 weeks, 30% at 3 weeks post-implantation',
      'Virtually complete mass absorption between 56 to 70 days by sterile hydrolysis',
      'Indicated for soft tissue approximation, ophthalmic, and general gastrointestinal surgery'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_03_04_PM_1024x1024.png?v=1755122584',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_03_04_PM_1024x1024.png?v=1755122584',
      '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_02_02_46_PM_1536x564.png',
      '/cdn/shop/files/Medtronic_logo_svg_320x56.png?v=1755123472'
    ],
    inStock: true
  },
  {
    id: 'bd-vac-01',
    handle: 'bd-vacutainer-sst-blood-collection-tubes',
    name: 'BD Vacutainer® SST™ Blood Collection Tubes with Gel & Clot Activator (100/Pack)',
    category: 'Laboratory Supplies',
    categorySlug: 'laboratory-equipment',
    brand: 'BD',
    sku: 'BD-367986',
    price: 1850,
    compareAtPrice: 2100,
    specs: '5.0 mL, 13x100mm, Gold Hemogard™ Closure',
    technicalSpecs: [
      { label: 'Draw Volume & Tube Size', value: '5.0 mL, 13 x 100 mm' },
      { label: 'Closure Mechanism', value: 'BD Hemogard™ Gold Safety Shield' },
      { label: 'Additive & Barrier', value: 'Silica clot activator with polymer barrier gel' },
      { label: 'Centrifugation Parameters', value: '1100–1300 RCF (g) for 10 minutes at 20–25°C' },
      { label: 'Tube Material', value: 'Medical grade Polyethylene Terephthalate (PET)' },
      { label: 'Sterility & Shelf Life', value: 'Gamma radiation sterile, 16 months shelf life' },
      { label: 'Packaging Unit', value: '100 tubes per rack-pack / 1000 per master case' },
      { label: 'Diagnostic Applications', value: 'Clinical chemistry, immunoassay, therapeutic drug monitoring' },
      { label: 'Regulatory Compliance', value: 'IVD Directive 98/79/EC / US FDA / CDSCO registered' },
      { label: 'Country of Origin', value: 'United States (Becton, Dickinson and Company)' }
    ],
    badge: 'Hospital Grade',
    certifications: 'US FDA / CE Marked / IVD',
    description: `BD Vacutainer® SST™ (Serum Separator Tubes) contain spray-coated silica to aid in clotting and an inert polymer gel barrier that forms a physical separator between serum and the cellular clot during centrifugation. This barrier prevents analyte contamination over extended storage periods.`,
    features: [
      'Inert acrylic polymer gel produces clean serum separation within 10 minutes of centrifugation',
      'Patented BD Hemogard™ safety shield closure protects healthcare personnel from blood splashes',
      'Provides stable serum samples for chemistry, serology, and immunoassay determinations',
      'Sterile interior with precision draw volume for consistent diagnostic results',
      'Validated for automated clinical chemistry analyzers and standard centrifuge rotors'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_43_20_PM_1024x1024.png?v=1755121426',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_43_20_PM_1024x1024.png?v=1755121426',
      '/cdn/shop/files/Becton_Dickinson_logo_svg_320x128.png?v=1755123405'
    ],
    inStock: true
  },
  {
    id: 'wa-oto-01',
    handle: 'welch-allyn-macroview-plus-led-otoscope',
    name: 'Welch Allyn MacroView™ Plus Diagnostic LED Otoscope Head',
    category: 'Diagnostics',
    categorySlug: 'diagnostics',
    brand: 'Welch Allyn',
    sku: 'WA-238-2',
    price: 19500,
    compareAtPrice: 22000,
    specs: 'SureColor™ LED, 3X Magnification, Fiber Optics',
    technicalSpecs: [
      { label: 'Optical Field of View', value: '3X larger viewing area than standard diagnostic otoscopes' },
      { label: 'Illumination Technology', value: 'SureColor™ proprietary LED, 60+ lumens output' },
      { label: 'Focus System', value: 'Focus-free wide-angle optical lens system' },
      { label: 'Specula Compatibility', value: 'Welch Allyn LumiView™ clear and standard reusable/disposable' },
      { label: 'Power Source Compatibility', value: 'All Welch Allyn 3.5V power handles and wall transformers' },
      { label: 'Digital Imaging Port', value: 'iExaminer SmartBracket smartphone docking compatible' },
      { label: 'Light Transmission', value: 'High-density fiber optic ring, cool transmission, no glare' },
      { label: 'Pneumatic Otoscopy Port', value: 'Insufflator bulb attachment port included for tympanic mobility' },
      { label: 'Certifications & Warranty', value: 'US FDA 510(k) Class I, CE Marked, 5-Year LED Warranty' },
      { label: 'Country of Origin', value: 'United States (Baxter / Welch Allyn Inc.)' }
    ],
    badge: 'Flagship Device',
    certifications: 'US FDA 510(k) / CE Marked',
    description: `The Welch Allyn MacroView™ Plus LED Otoscope offers three times larger viewing area for ear canal examinations compared to standard diagnostic otoscopes, with nearly the full tympanic membrane visible in one view. Compatible with the iExaminer SmartBracket for capturing and sharing digital ear images.`,
    features: [
      '3X wider viewing field than traditional otoscopes reduces need to maneuver the speculum',
      'SureColor™ LED illumination delivers true tissue color rendering without heat generation',
      'Focus-free design allows sharp viewing across varying canal depths',
      'Pairable with Welch Allyn iExaminer bracket for digital tele-health documentation',
      'Fiber optic cool light transmission with zero reflections or obstructions'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_04_13_PM_1024x1024.png?v=1755122653',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_04_13_PM_1024x1024.png?v=1755122653',
      '/cdn/shop/files/welch-allyn-logo-png-transparent_320x320.png?v=1755123367'
    ],
    inStock: true
  },
  {
    id: 'cook-cvc-01',
    handle: 'cook-medical-spectrum-triple-lumen-cvc',
    name: 'Cook Medical Spectrum® Triple-Lumen Central Venous Catheter Set',
    category: 'Catheters',
    categorySlug: 'catheters',
    brand: 'Cook Medical',
    sku: 'COOK-C-TDC-701-UM',
    price: 4600,
    compareAtPrice: 5100,
    specs: '7 Fr x 20 cm, Minocycline & Rifampin Impregnated',
    technicalSpecs: [
      { label: 'Catheter Gauge & Length', value: '7 French (2.3 mm OD) x 20 cm usable length' },
      { label: 'Lumen Configuration', value: 'Triple: Distal 16G, Medial 18G, Proximal 18G' },
      { label: 'Antimicrobial Impregnation', value: 'Minocycline hydrochloride & Rifampin bonding' },
      { label: 'Material Construction', value: 'Radiopaque polyether-based polyurethane with soft tip' },
      { label: 'Guidewire Included', value: '0.032 inch (0.81 mm) J-tip nitinol wire with depth marks' },
      { label: 'Introducer Needle', value: '18G EchoTip® echogenic vascular access needle' },
      { label: 'Sterility & Unit Pack', value: 'Sterile EO barrier tray with dilator and fixation wings' },
      { label: 'Flow Rates', value: 'Distal 3200 mL/hr, Medial 1500 mL/hr, Proximal 1600 mL/hr' },
      { label: 'Regulatory Approvals', value: 'US FDA PMA approved / CE Marked / ISO 13485' },
      { label: 'Country of Origin', value: 'United States (Cook Incorporated)' }
    ],
    badge: 'Antimicrobial',
    certifications: 'US FDA Approved / ISO 13485',
    description: `Cook Spectrum® central venous catheters are impregnated with a combination of minocycline and rifampin. They provide synergistic antimicrobial protection across both internal and external catheter surfaces, clinically proven to lower catheter-related bloodstream infections (CRBSI).`,
    features: [
      'Dual-agent antibiotic impregnation provides broad-spectrum gram-positive and gram-negative coverage',
      'Polyurethane construction offers optimal column strength for insertion and softens in vivo',
      'Three distinct lumens (16G, 18G, 18G) allow simultaneous medication, fluid, and blood administration',
      'Full kit includes EchoTip® echogenic needle, guidewire, vessel dilator, and suture wing',
      'Validated reduction in CRBSI incidence in intensive care and surgical settings'
    ],
    image: '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_03_12_53_PM_1024x1024.png?v=1755123173',
    gallery: [
      '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_03_12_53_PM_1024x1024.png?v=1755123173',
      '/cdn/shop/files/cookmedical-logo_320x166.png?v=1755123447'
    ],
    inStock: true
  },
  {
    id: 'vita-ultra-01',
    handle: 'vitastem-ultra-wound-care-antibiotic-gel',
    name: 'VitaStem Ultra Clinical Topical Antibiotic Gel (1 oz / 28.4g)',
    category: 'Wound Care',
    categorySlug: 'wound-care',
    brand: 'VitaStem USA',
    sku: 'VITA-ULT-001',
    price: 2950,
    compareAtPrice: 3400,
    specs: 'Transdermal Delivery, Broad Spectrum Antimicrobial',
    technicalSpecs: [
      { label: 'Dosage Form & Weight', value: 'Topical hydro-active antimicrobial gel, 1.0 oz (28.4 g)' },
      { label: 'Active Pharmaceutical Ingredients', value: 'Bacitracin Zinc USP, Polymyxin B Sulfate, Neomycin' },
      { label: 'Drug Delivery Mechanism', value: 'Proprietary transdermal carrier for deep dermal penetration' },
      { label: 'Antimicrobial Spectrum', value: 'MRSA, Staph aureus, Pseudomonas, E. coli, Gram +/- bacteria' },
      { label: 'Indications for Use', value: 'Diabetic foot ulcers, post-op surgical wounds, 1st–3rd degree burns' },
      { label: 'Tissue Biocompatibility', value: 'Non-cytotoxic to healthy fibroblasts and epithelial cells' },
      { label: 'Application Frequency', value: 'Apply thin layer 1–3 times daily with sterile dressing' },
      { label: 'Packaging & Seal', value: 'Tamper-evident pharmaceutical aluminum tube with precision nozzle' },
      { label: 'Certifications & Origin', value: 'US cGMP Manufactured / NDC registered / Clinical trial backed' },
      { label: 'Country of Origin', value: 'United States of America' }
    ],
    badge: 'Global Innovation',
    certifications: 'Made in USA / Clinically Tested',
    description: `VitaStem Ultra represents a breakthrough topical antibiotic formulation from the USA designed to rapidly eradicate MRSA, staphylococcus, pseudomonas, and other antibiotic-resistant strains associated with complex surgical wounds, diabetic foot ulcers, and severe burns.`,
    features: [
      'Advanced transdermal penetration delivers high-potency antimicrobials directly to infection sites',
      'Demonstrated 99.9% kill rate against MRSA, gram-positive and gram-negative pathogens',
      'Accelerates healing across 1st to 3rd-degree burns, post-op incisions, and chronic ulcers',
      'Non-cytotoxic to healthy granulating tissue, promoting rapid re-epithelialization',
      'Sterile formulation prepared for clinical in-patient and outpatient wound clinics'
    ],
    image: '/cdn/shop/files/Vitastem-Ultra-A-New-Innovative-Wound-Care-Treatment-for-Antibiotic-Resistant-Bacterial-Infections_956x484.webp?v=1755121703',
    gallery: [
      '/cdn/shop/files/Vitastem-Ultra-A-New-Innovative-Wound-Care-Treatment-for-Antibiotic-Resistant-Bacterial-Infections_956x484.webp?v=1755121703',
      '/cdn/shop/files/DHL_plac_5ba61406-db81-4ba8-89a9-e78a5ee84552_1536x700.png'
    ],
    inStock: true
  },
  {
    id: 'sar-micro-01',
    handle: 'sarstedt-microvette-500-capillary-blood-tubes',
    name: 'Sarstedt Microvette® 500 Capillary Blood Collection Tube K3E (100/Box)',
    category: 'Laboratory Supplies',
    categorySlug: 'laboratory-equipment',
    brand: 'Sarstedt',
    sku: 'SAR-20.1341',
    price: 2200,
    compareAtPrice: 2500,
    specs: '500 µL, Potassium EDTA (K3E), Violet Cap',
    technicalSpecs: [
      { label: 'Sample Volume Capacity', value: '500 µL (0.5 mL) blood volume' },
      { label: 'Anticoagulant Additive', value: 'Potassium EDTA (K3E) liquid formulation' },
      { label: 'Collection Design', value: 'Dual collection: end-to-end capillary & gravity collection rim' },
      { label: 'Cap Color & Standard', value: 'Violet push cap complying with ISO 6710 color coding' },
      { label: 'Tube Material', value: 'Ultra-transparent medical polypropylene, shatterproof' },
      { label: 'Centrifugation Limit', value: 'Up to 10,000 x g for blood plasma separation' },
      { label: 'Target Patient Group', value: 'Pediatric, neonatal, oncology, and difficult venous access' },
      { label: 'Packaging Unit', value: '100 tubes per inner box / 1000 per shipping carton' },
      { label: 'Compliance Standards', value: 'CE Marked / IVD Directive / ISO 13485 certified' },
      { label: 'Country of Origin', value: 'Germany (Sarstedt AG & Co. KG)' }
    ],
    badge: 'Precision Lab',
    certifications: 'CE / IVD Compliant / ISO 13485',
    description: `The Sarstedt Microvette® 500 is engineered for pediatric, geriatric, and difficult capillary blood collection. Designed with a dual-collection geometry allowing blood collection using either the pre-assembled end-to-end capillary or the gravity-drip collection rim.`,
    features: [
      'Versatile dual collection: integrated capillary for precise volume or scoop rim for free flow',
      'Specially coated with Potassium EDTA K3E for automated hematology cell counting',
      'Color-coded violet push cap conforms to international ISO 6710 standards',
      'Unbreakable polypropylene tube body ensures centrifugal and transport safety',
      'Inner cylindrical tube guarantees optimal mixing and cell suspension'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_43_20_PM_1024x1024.png?v=1755121426',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_43_20_PM_1024x1024.png?v=1755121426',
      '/cdn/shop/files/Sarstedt_Logo_svg_320x64.png?v=1755123424'
    ],
    inStock: true
  },
  {
    id: 'med-surg-01',
    handle: 'medtronic-valleylab-electrosurgical-pencil',
    name: 'Medtronic Valleylab™ Monopolar Electrosurgical Pencil with Holster (Box of 40)',
    category: 'Surgical Supplies',
    categorySlug: 'surgical-supplies',
    brand: 'Medtronic',
    sku: 'MED-E2515H',
    price: 6400,
    compareAtPrice: 7200,
    specs: 'Push-Button Cut/Coag, 3m Cable, Stainless Blade',
    technicalSpecs: [
      { label: 'Activation Controls', value: 'Dual push-button activation (Yellow Cut / Blue Coag)' },
      { label: 'Cable Length & Connector', value: '3.0 meter (10 ft) silicone insulated, 3-prong standard plug' },
      { label: 'Electrode Tip Type', value: 'Removable stainless steel hex-lock blade electrode' },
      { label: 'Safety Accessories', value: 'Edge holster included for sterile field electrode parking' },
      { label: 'Voltage Rating', value: 'Monopolar high frequency up to 9000 V peak-to-peak' },
      { label: 'Sterility & Single Use', value: 'Sterile EO Gas, individually sealed in medical blister packs' },
      { label: 'Generator Compatibility', value: 'Compatible with Valleylab™, Force FX™, Covidien, and major ESUs' },
      { label: 'Box Quantity', value: '40 sterile pencils with holsters per box' },
      { label: 'Certifications', value: 'US FDA 510(k), CE Marked, IEC 60601-2-2 compliant' },
      { label: 'Country of Origin', value: 'United States (Medtronic Covidien)' }
    ],
    badge: 'Operating Room',
    certifications: 'CE Marked / US FDA',
    description: `The Valleylab™ electrosurgical pencil is the global industry benchmark for monopolar surgical cut and coagulation. Features sealed tactile push-buttons, a non-slip ribbed barrel for ergonomics, and an included safety holster for sterile field containment.`,
    features: [
      'Dual push-button design with tactile and audible click feedback for Cut and Coagulation',
      'Streamlined ribbed pencil casing ensures comfortable grip during lengthy surgical cases',
      'Includes 3.0-meter flexible siliconized cable with standard 3-prong generator connector',
      'Pre-packaged with non-conductive edge holster for active electrode safety between passes',
      'High-grade stainless steel blade electrode compatible with all standard ESUs'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_37_44_PM_1024x1024.png?v=1755121103',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_37_44_PM_1024x1024.png?v=1755121103',
      '/cdn/shop/files/Medtronic_logo_svg_320x56.png?v=1755123472'
    ],
    inStock: true
  },
  {
    id: 'bd-insyte-01',
    handle: 'bd-insyte-autoguard-bc-shielded-catheter',
    name: 'BD Insyte™ Autoguard™ BC Shielded IV Catheter (Box of 50)',
    category: 'Catheters',
    categorySlug: 'catheters',
    brand: 'BD',
    sku: 'BD-381023',
    price: 3200,
    compareAtPrice: 3600,
    specs: '20 G x 1.00 in (1.1 x 25 mm), Pink, Blood Control',
    technicalSpecs: [
      { label: 'Gauge & Usable Length', value: '20 Gauge (1.1 mm OD) x 1.00 inch (25 mm)' },
      { label: 'Catheter Biomaterial', value: 'BD Vialon™ polyurethane (softens up to 70% in vein)' },
      { label: 'Blood Control Feature', value: 'Internal septum stops blood leakage during cannulation' },
      { label: 'Needle Safety Mechanism', value: 'Push-button instant needle retraction into protective chamber' },
      { label: 'Needle Tip Technology', value: 'BD Instaflash™ notched needle for instant blood flashback' },
      { label: 'Flow Rate Capacity', value: '65 mL/min (gravity flow rate with water)' },
      { label: 'Color Coding & Standard', value: 'Pink hub, ISO 10555-1 and ISO 10555-5 compliant' },
      { label: 'Packaging Unit', value: '50 sterile units per box / 200 units per case' },
      { label: 'Regulatory Status', value: 'US FDA 510(k), CE Marked, CDSCO Class B registered' },
      { label: 'Country of Origin', value: 'United States (Becton Dickinson)' }
    ],
    badge: 'Sharps Safety',
    certifications: 'US FDA / CE Marked / ISO 13485',
    description: `BD Insyte™ Autoguard™ BC shielded IV catheters feature patented Blood Control technology that reduces blood exposure by 95% during insertion, combined with push-button needle retraction that protects clinicians from occupational sharps injuries.`,
    features: [
      'Septum blood-control valve stops blood leakage from catheter hub until line is attached',
      'Push-button instant needle shielding safely encloses the sharp within the barrel',
      'BD Vialon™ biomaterial catheter softens up to 70% in vein, reducing phlebitis risk',
      'BD Instaflash™ needle technology provides immediate confirmation of vessel entry',
      'Color-coded pink hub indicates 20-gauge specification for clear clinical sizing'
    ],
    image: '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_03_12_53_PM_1024x1024.png?v=1755123173',
    gallery: [
      '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_03_12_53_PM_1024x1024.png?v=1755123173',
      '/cdn/shop/files/Becton_Dickinson_logo_svg_320x128.png?v=1755123405'
    ],
    inStock: true
  },
  {
    id: 'eth-pro-01',
    handle: 'ethicon-prolene-polypropylene-suture',
    name: 'Ethicon Prolene® Polypropylene Monofilament Suture 3-0 (Box of 36)',
    category: 'Sutures',
    categorySlug: 'sutures',
    brand: 'Ethicon',
    sku: 'ETH-8684G',
    price: 4900,
    compareAtPrice: 5500,
    specs: '3-0 Blue, 45cm, SH-1 Needle 22mm 1/2 Circle',
    technicalSpecs: [
      { label: 'Suture Gauge & Length', value: 'USP 3-0 (Metric 2.0), 45 cm (18 inches)' },
      { label: 'Suture Structure', value: 'Non-absorbable monofilament isotactic polypropylene' },
      { label: 'Suture Pigmentation', value: 'Vibrant blue pigment for elevated operative contrast' },
      { label: 'Needle Geometry', value: 'SH-1 Taper Point, 22 mm, 1/2 Circle curvature' },
      { label: 'Needle Alloy', value: 'Ethalloy™ high-tensile stainless steel, bend-resistant' },
      { label: 'Tissue Reactivity', value: 'Minimal acute inflammatory response in vascular tissue' },
      { label: 'Tensile Strength Loss', value: 'Non-absorbable, indefinite holding strength' },
      { label: 'Sterilization & Pack', value: 'Sterile EO Gas, 36 individual foil packets per box' },
      { label: 'Regulatory Approvals', value: 'US FDA PMA, CE 0086, CDSCO Import Registered' },
      { label: 'Country of Origin', value: 'United States (Johnson & Johnson / Ethicon)' }
    ],
    badge: 'Cardiovascular',
    certifications: 'US FDA / CE 0086 / ISO 13485',
    description: `Ethicon Prolene® is an isotactic crystalline stereoisomer of polypropylene non-absorbable surgical suture. Known worldwide for superior cardiovascular holding strength, minimal tissue reaction, and easy, snag-free knot tying.`,
    features: [
      'Non-absorbable monofilament delivers indefinite tensile strength support in cardiovascular sites',
      'Extremely smooth monofilament surface glides through vessel walls without tearing',
      'SH-1 taper point needle manufactured from Ethalloy™ stainless steel for high bend resistance',
      'Pigmented vibrant blue for high contrast and visibility against bloody surgical fields',
      'Recommended for vascular anastomoses, cardiac valve replacement, and ophthalmic procedures'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_03_04_PM_1024x1024.png?v=1755122584',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_03_04_PM_1024x1024.png?v=1755122584',
      '/cdn/shop/files/ChatGPT_Image_Aug_13_2025_02_02_46_PM_1536x564.png'
    ],
    inStock: true
  },
  {
    id: 'wa-oph-01',
    handle: 'welch-allyn-coaxial-diagnostic-ophthalmoscope',
    name: 'Welch Allyn 3.5 V Diagnostic Ophthalmoscope with Coaxial Optical System',
    category: 'Diagnostics',
    categorySlug: 'diagnostics',
    brand: 'Welch Allyn',
    sku: 'WA-11720',
    price: 24500,
    compareAtPrice: 27500,
    specs: '68 Lenses (-30 to +38), Halogen HPX™ Lamp',
    technicalSpecs: [
      { label: 'Optical Alignment', value: 'Coaxial optical system for shadow-free retinal view' },
      { label: 'Diopter Range', value: '68 lenses in single-diopter steps (-30 to +38 diopters)' },
      { label: 'Light Source', value: '3.5 V Halogen HPX™ lamp (high pressure xenon gas)' },
      { label: 'Aperture Selection', value: 'Micro-spot, small, large, slit, fixation target, cobalt blue' },
      { label: 'Filters Included', value: 'Red-free filter and cross-linear polarizing anti-glare filter' },
      { label: 'Pupil Examination', value: 'Facilitates easy fundus visualization through undilated pupils' },
      { label: 'Handle Compatibility', value: 'Fits all Welch Allyn 3.5 V rechargeable handles & transformers' },
      { label: 'Housing Construction', value: 'Impact-resistant polycarbonate chassis with rubber brow rest' },
      { label: 'Quality Assurance', value: 'US FDA 510(k), CE Marked, ISO 13485 compliant' },
      { label: 'Country of Origin', value: 'United States (Baxter / Welch Allyn)' }
    ],
    badge: 'Clinical Grade',
    certifications: 'US FDA / CE Marked',
    description: `The Welch Allyn 3.5 V Coaxial Ophthalmoscope utilizes patented optical technology that produces a shadow-free spot and easier entry into undilated pupils. Provides 68 focusing lenses and multiple apertures for comprehensive retinal pathology assessment.`,
    features: [
      'Coaxial optical alignment produces shadow-free illumination and easier entry into small pupils',
      'Halogen HPX™ lamp delivers 30% brighter, whiter light for true tissue color rendering',
      '68 focusing lenses spanning -30 to +38 diopters in single-diopter steps for sharp focusing',
      'Polarizing filter virtually eliminates corneal glare and reflex artifacts',
      '18 unique aperture and filter combinations including micro-spot, slit, and red-free filter'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_04_13_PM_1024x1024.png?v=1755122653',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_03_04_13_PM_1024x1024.png?v=1755122653',
      '/cdn/shop/files/welch-allyn-logo-png-transparent_320x320.png?v=1755123367'
    ],
    inStock: true
  },
  {
    id: 'neph-dial-01',
    handle: 'high-flux-polysulfone-dialyzer-membrane',
    name: 'High-Flux Polysulfone Dialyzer Membrane 1.8 m² (Box of 24)',
    category: 'Nephrology',
    categorySlug: 'nephrology',
    brand: 'Nephrology Care',
    sku: 'NEPH-HF-180',
    price: 18500,
    compareAtPrice: 21000,
    specs: 'Effective Area: 1.8 m², Ultrafiltration Coeff: 65 mL/h/mmHg',
    technicalSpecs: [
      { label: 'Effective Surface Area', value: '1.8 square meters (1.8 m²)' },
      { label: 'Membrane Biomaterial', value: 'High-biocompatibility Polysulfone hollow fiber capillaries' },
      { label: 'Ultrafiltration Coefficient (Kuf)', value: '65 mL/h/mmHg (High Flux rating)' },
      { label: 'Clearance Rates (Qb 300 mL/min)', value: 'Urea: 280 mL/min, Creatinine: 260 mL/min, Phosphate: 240 mL/min' },
      { label: 'Middle Molecule Clearance', value: 'Beta-2-microglobulin clearance > 70 mL/min' },
      { label: 'Albumin Sieving Coefficient', value: '< 0.001 (complete essential protein retention)' },
      { label: 'Sterilization Method', value: 'In-line sterile Steam / Gamma Radiation (Pyrogen-free)' },
      { label: 'Housing & Potting', value: 'Polypropylene casing with medical polyurethane potting' },
      { label: 'Packaging Unit', value: '24 individually sealed dialyzers per sterile box' },
      { label: 'Regulatory Compliance', value: 'CE 0123 / ISO 13485 / CDSCO Class C registered' }
    ],
    badge: 'Renal Care',
    certifications: 'ISO 13485 / CE Marked',
    description: `Engineered with high-biocompatibility polysulfone capillary hollow fibers, this high-flux dialyzer delivers exceptional clearance of small molecular toxins while facilitating removal of middle molecules such as beta-2-microglobulin during hemodialysis.`,
    features: [
      'Asymmetric membrane pore distribution provides high solute flux and sharp sieving curve',
      'Superior retention of essential proteins like albumin with minimal complement activation',
      'Sterilized via in-line steam/gamma radiation ensuring non-pyrogenic and residue-free safety',
      'Polypropylene outer housing with polyurethane potting compound withstands high TMP',
      'Directly compatible with all clinical hemodialysis blood tubing lines and machines'
    ],
    image: '/cdn/shop/collections/85cc9ee6-1127-4768-95a2-ddc4465d9562_1024x1024.png?v=1755123285',
    gallery: [
      '/cdn/shop/collections/85cc9ee6-1127-4768-95a2-ddc4465d9562_1024x1024.png?v=1755123285',
      '/cdn/shop/files/DHL_plac_5ba61406-db81-4ba8-89a9-e78a5ee84552_1536x700.png'
    ],
    inStock: true
  },
  {
    id: 'med-clip-01',
    handle: 'medtronic-surgiclip-titanium-clip-applier',
    name: 'Medtronic Surgiclip™ Premium Titanium Hemostatic Clip Applier (Box of 18)',
    category: 'Surgical Supplies',
    categorySlug: 'surgical-supplies',
    brand: 'Medtronic',
    sku: 'MED-134015',
    price: 14200,
    compareAtPrice: 16000,
    specs: 'Medium/Large, 20 Titanium Clips per Applier',
    technicalSpecs: [
      { label: 'Clip Size & Count', value: 'Medium / Large (M/L), 20 pre-loaded clips per device' },
      { label: 'Clip Material', value: 'Pure surgical-grade Titanium (Grade 1 ASTM F67)' },
      { label: 'Closure Mechanism', value: 'Distal-to-proximal chevron closure with tactile click' },
      { label: 'Shaft Angle & Length', value: '20° ergonomic angled shaft, 28 cm overall reach' },
      { label: 'Grip Texture', value: 'Pyramidal cross-serrated inner clip face prevents tissue slip' },
      { label: 'MRI Compatibility', value: 'MR Conditional up to 3.0 Tesla static magnetic field' },
      { label: 'Sterility & Single Patient', value: 'Sterile EO Gas, single-patient use (no re-sterilization needed)' },
      { label: 'Box Quantity', value: '18 pre-loaded appliers per box' },
      { label: 'Certifications', value: 'US FDA 510(k), CE Marked, ISO 13485 compliant' },
      { label: 'Country of Origin', value: 'United States (Medtronic Covidien)' }
    ],
    badge: 'Surgery',
    certifications: 'US FDA / CE Marked',
    description: `The Surgiclip™ automatic clip applier contains 20 pre-loaded medical-grade titanium clips for rapid, dependable vessel occlusion during open surgical procedures. Designed with automatic feeding and tactile closure feedback.`,
    features: [
      'Pre-loaded with 20 chevron-shaped titanium clips for continuous vessel ligation without reload',
      'Distal-to-proximal clip closure provides secure vessel hold and avoids slippage',
      'Textured clip surface pattern grips tissue firmly to eliminate post-operative dislodgement',
      'Ergonomic angled applier shaft provides optimal surgical line of sight into deep cavities',
      'Single-patient use guarantees sharpness, mechanical sterility, and zero cross-contamination'
    ],
    image: '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_37_44_PM_1024x1024.png?v=1755121103',
    gallery: [
      '/cdn/shop/collections/ChatGPT_Image_Aug_13_2025_02_37_44_PM_1024x1024.png?v=1755121103',
      '/cdn/shop/files/Medtronic_logo_svg_320x56.png?v=1755123472'
    ],
    inStock: true
  }
];

export function getProductByHandle(handleOrId?: string): Product | undefined {
  if (!handleOrId || typeof handleOrId !== 'string') return undefined;
  try {
    const normalized = decodeURIComponent(handleOrId).toLowerCase().trim();
    return PRODUCTS.find(p => {
      const pHandle = p.handle.toLowerCase();
      const pId = p.id.toLowerCase();
      const pSku = p.sku.toLowerCase();
      return (
        pHandle === normalized ||
        pId === normalized ||
        pSku === normalized ||
        pHandle.replace(/-/g, '') === normalized.replace(/-/g, '') ||
        normalized.includes(pHandle) ||
        pHandle.includes(normalized)
      );
    });
  } catch (e) {
    return undefined;
  }
}
