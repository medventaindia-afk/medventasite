'use client';

import React from 'react';

interface TechnicalDiagramProps {
  type: 'tensile' | 'cvc' | 'incoterms' | 'coldchain' | 'regulatory';
  title?: string;
}

export default function TechnicalDiagram({ type, title }: TechnicalDiagramProps) {
  if (type === 'tensile') {
    return (
      <figure className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Technical Schematic: Suture Tensile Strength Decay Curves (28 Days)
            </h4>
            <p className="text-xs text-slate-500">
              Comparative in-vivo residual breaking strength vs. critical tissue healing threshold (USP standard)
            </p>
          </div>
          <span className="rounded bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
            Biomedical Spec
          </span>
        </div>

        <div className="relative w-full overflow-x-auto">
          <svg viewBox="0 0 680 320" className="w-full min-w-[550px] font-sans" aria-label="Suture Tensile Strength Decay Curves Graph">
            <defs>
              <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>

            {/* Background & Grid */}
            <rect x="60" y="20" width="580" height="230" fill="url(#grid-fade)" rx="6" />
            <line x1="60" y1="20" x2="640" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="60" y1="77.5" x2="640" y2="77.5" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="60" y1="135" x2="640" y2="135" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="60" y1="192.5" x2="640" y2="192.5" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="60" y1="250" x2="640" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="250" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Y-Axis Labels */}
            <text x="50" y="24" textAnchor="end" fontSize="11" fill="#64748b">100%</text>
            <text x="50" y="81" textAnchor="end" fontSize="11" fill="#64748b">75%</text>
            <text x="50" y="139" textAnchor="end" fontSize="11" fill="#64748b">50%</text>
            <text x="50" y="196" textAnchor="end" fontSize="11" fill="#64748b">25%</text>
            <text x="50" y="254" textAnchor="end" fontSize="11" fill="#64748b">0%</text>

            {/* X-Axis Labels */}
            <text x="60" y="275" textAnchor="middle" fontSize="11" fill="#64748b">Day 0</text>
            <text x="205" y="275" textAnchor="middle" fontSize="11" fill="#64748b">Day 7</text>
            <text x="350" y="275" textAnchor="middle" fontSize="11" fill="#64748b">Day 14</text>
            <text x="495" y="275" textAnchor="middle" fontSize="11" fill="#64748b">Day 21</text>
            <text x="640" y="275" textAnchor="middle" fontSize="11" fill="#64748b">Day 28</text>

            {/* Critical 50% Retention Band */}
            <rect x="60" y="130" width="580" height="10" fill="#fef3c7" opacity="0.4" />
            <text x="630" y="125" textAnchor="end" fontSize="10" fontWeight="600" fill="#d97706">
              Critical Fascial Support Threshold (50%)
            </text>

            {/* Curve 1: Prolene (Non-absorbable - flat) */}
            <path d="M 60,28 Q 350,30 640,32" fill="none" stroke="#2563eb" strokeWidth="3" />
            <circle cx="640" cy="32" r="4" fill="#2563eb" />

            {/* Curve 2: Vicryl / Polysorb (Synthetic Absorbable) */}
            <path d="M 60,25 C 205,35 320,80 350,85 C 430,95 480,180 495,190 C 570,225 610,240 640,245" 
                  fill="none" stroke="#046e82" strokeWidth="3" />
            <circle cx="350" cy="85" r="4" fill="#046e82" />
            <circle cx="495" cy="190" r="4" fill="#046e82" />

            {/* Curve 3: Rapid Absorbable (Vicryl Rapide) */}
            <path d="M 60,25 C 130,45 180,135 205,140 C 270,195 320,240 350,246 L 640,250" 
                  fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 4" />

            {/* Legend */}
            <g transform="translate(90, 298)">
              <line x1="0" y1="6" x2="24" y2="6" stroke="#2563eb" strokeWidth="3" />
              <text x="32" y="10" fontSize="11" fill="#334155" fontWeight="500">Ethicon Prolene (Monofilament Non-Absorbable)</text>

              <line x1="280" y1="6" x2="304" y2="6" stroke="#046e82" strokeWidth="3" />
              <text x="312" y="10" fontSize="11" fill="#334155" fontWeight="500">Vicryl / Polysorb (Braided Absorbable)</text>

              <line x1="520" y1="6" x2="544" y2="6" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 4" />
              <text x="552" y="10" fontSize="11" fill="#334155" fontWeight="500">Vicryl Rapide</text>
            </g>
          </svg>
        </div>
        <figcaption className="mt-3 text-center text-xs text-slate-500 border-t border-slate-100 pt-2 font-medium">
          Figure 1: Suture in-vivo tensile loss curve over 28 days post-implantation compared with critical fascial wound stability threshold (ISO 10993).
        </figcaption>
      </figure>
    );
  }

  if (type === 'cvc') {
    return (
      <figure className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Technical Schematic: 7.0 Fr Triple Lumen CVC Internal Anatomy & Flow
            </h4>
            <p className="text-xs text-slate-500">
              Cross-sectional lumen arrangement, gauge sizing, and gravity flow rates (mL/min)
            </p>
          </div>
          <span className="rounded bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800">
            Critical Care Standard
          </span>
        </div>

        <div className="relative w-full overflow-x-auto">
          <svg viewBox="0 0 680 260" className="w-full min-w-[550px] font-sans" aria-label="7.0 French Triple Lumen Catheter Cross Section Diagram">
            {/* Outer Catheter Wall */}
            <circle cx="150" cy="130" r="90" fill="#f8fafc" stroke="#046e82" strokeWidth="6" />
            <circle cx="150" cy="130" r="84" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Distal Lumen (16 Gauge - Brown) */}
            <path d="M 150,56 C 185,56 210,80 210,110 C 180,115 150,115 90,110 C 90,80 115,56 150,56 Z" 
                  fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
            <text x="150" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">16G Distal</text>
            <text x="150" y="104" textAnchor="middle" fontSize="10" fill="#92400e">Blood / CVP (45 mL/min)</text>

            {/* Medial Lumen (18 Gauge - Blue) */}
            <circle cx="112" cy="165" r="28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <text x="112" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">18G Med</text>
            <text x="112" y="176" textAnchor="middle" fontSize="9" fill="#0284c7">TPN (26 mL/min)</text>

            {/* Proximal Lumen (18 Gauge - White) */}
            <circle cx="188" cy="165" r="28" fill="#f1f5f9" stroke="#64748b" strokeWidth="2.5" />
            <text x="188" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">18G Prox</text>
            <text x="188" y="176" textAnchor="middle" fontSize="9" fill="#64748b">Meds (28 mL/min)</text>

            {/* Specifications Card on Right */}
            <g transform="translate(280, 40)">
              <rect x="0" y="0" width="370" height="180" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
              <text x="16" y="26" fontSize="13" fontWeight="bold" fill="#0f172a">Clinical Infection Barrier Features</text>

              <circle cx="24" cy="54" r="3" fill="#046e82" />
              <text x="36" y="58" fontSize="11" fill="#334155">
                <tspan fontWeight="bold">Thermosensitive Polyurethane:</tspan> Stiff for insertion, softens at 37°C
              </text>

              <circle cx="24" cy="84" r="3" fill="#046e82" />
              <text x="36" y="88" fontSize="11" fill="#334155">
                <tspan fontWeight="bold">Laser-Cut Smooth Ports:</tspan> Mitigates shear stress and platelet aggregation
              </text>

              <circle cx="24" cy="114" r="3" fill="#046e82" />
              <text x="36" y="118" fontSize="11" fill="#334155">
                <tspan fontWeight="bold">CRBSI / CLABSI Prevention:</tspan> Chlorhexidine impregnated surface options
              </text>

              <circle cx="24" cy="144" r="3" fill="#046e82" />
              <text x="36" y="148" fontSize="11" fill="#334155">
                <tspan fontWeight="bold">Full Radiopaque Body:</tspan> Clear fluoroscopic visualization under X-ray
              </text>
            </g>
          </svg>
        </div>
        <figcaption className="mt-3 text-center text-xs text-slate-500 border-t border-slate-100 pt-2 font-medium">
          Figure 2: 7.0 Fr Triple Lumen vascular catheter lumen calibers, flow volume capacities, and CLABSI infection barrier zones.
        </figcaption>
      </figure>
    );
  }

  if (type === 'incoterms') {
    return (
      <figure className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Technical Schematic: Incoterms® 2020 Cost & Risk Transfer Timeline
            </h4>
            <p className="text-xs text-slate-500">
              Division of freight costs, marine cargo insurance, and customs risk (India to GCC / Africa)
            </p>
          </div>
          <span className="rounded bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800">
            Export Finance
          </span>
        </div>

        <div className="relative w-full overflow-x-auto">
          <svg viewBox="0 0 680 240" className="w-full min-w-[550px] font-sans" aria-label="Incoterms 2020 Risk Transfer Timeline Schematic">
            {/* Timeline Stages */}
            <rect x="40" y="30" width="130" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="105" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">1. Factory Packaging</text>
            <text x="105" y="68" textAnchor="middle" fontSize="9" fill="#64748b">Mundra / JNPT Warehouse</text>

            <rect x="195" y="30" width="130" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="260" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">2. Port of Loading</text>
            <text x="260" y="68" textAnchor="middle" fontSize="9" fill="#64748b">Customs Cleared on Vessel</text>

            <rect x="350" y="30" width="130" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="415" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">3. International Transit</text>
            <text x="415" y="68" textAnchor="middle" fontSize="9" fill="#64748b">Sea Freight / Air Cargo</text>

            <rect x="505" y="30" width="135" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <text x="572" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">4. Destination Port</text>
            <text x="572" y="68" textAnchor="middle" fontSize="9" fill="#64748b">Jebel Ali / Lagos / Mombasa</text>

            {/* Connector Arrow */}
            <line x1="170" y1="55" x2="195" y2="55" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="325" y1="55" x2="350" y2="55" stroke="#94a3b8" strokeWidth="2" />
            <line x1="480" y1="55" x2="505" y2="55" stroke="#94a3b8" strokeWidth="2" />

            {/* Incoterm Bars */}
            {/* EXW */}
            <text x="40" y="115" fontSize="11" fontWeight="bold" fill="#e11d48">EXW (Ex-Works)</text>
            <rect x="150" y="105" width="40" height="14" rx="3" fill="#e11d48" />
            <rect x="190" y="105" width="450" height="14" rx="3" fill="#fee2e2" />
            <text x="415" y="116" textAnchor="middle" fontSize="9" fill="#991b1b">Buyer bears all transit, freight, insurance & import risk</text>

            {/* FOB */}
            <text x="40" y="150" fontSize="11" fontWeight="bold" fill="#d97706">FOB (Free on Board)</text>
            <rect x="150" y="140" width="175" height="14" rx="3" fill="#d97706" />
            <rect x="325" y="140" width="315" height="14" rx="3" fill="#fef3c7" />
            <text x="480" y="151" textAnchor="middle" fontSize="9" fill="#92400e">Seller covers loading; Buyer books ocean freight & insurance</text>

            {/* CIF (Recommended) */}
            <text x="40" y="185" fontSize="11" fontWeight="bold" fill="#046e82">CIF (Recommended)</text>
            <rect x="150" y="175" width="490" height="14" rx="3" fill="#046e82" />
            <text x="395" y="186" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="bold">
              MedVenta pays freight + marine insurance to your destination port (Full Protection)
            </text>

            {/* Legend */}
            <g transform="translate(180, 215)">
              <rect x="0" y="0" width="12" height="12" fill="#046e82" rx="2" />
              <text x="18" y="10" fontSize="10" fill="#334155">Seller Cost & Responsibility</text>
              <rect x="200" y="0" width="12" height="12" fill="#fee2e2" rx="2" />
              <text x="218" y="10" fontSize="10" fill="#334155">Buyer Responsibility & Risk</text>
            </g>
          </svg>
        </div>
        <figcaption className="mt-3 text-center text-xs text-slate-500 border-t border-slate-100 pt-2 font-medium">
          Figure 3: International Chamber of Commerce Incoterms® 2020 risk transfer points, marine insurance thresholds, and freight liability breakdown.
        </figcaption>
      </figure>
    );
  }

  // Default: Cold chain / Regulatory
  return (
    <figure className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Technical Schematic: Cold-Chain Validation Envelope (+2°C to +8°C)
          </h4>
          <p className="text-xs text-slate-500">
            GDP-compliant passive thermal shipper stability vs. +48°C desert transit simulation
          </p>
        </div>
        <span className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          GDP Validated
        </span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 680 220" className="w-full min-w-[550px] font-sans" aria-label="Cold-Chain Temperature Stability Curve">
          <rect x="60" y="20" width="580" height="150" fill="#f8fafc" rx="6" />
          
          {/* Optimal Cold Zone +2°C to +8°C */}
          <rect x="60" y="70" width="580" height="60" fill="#dcfce7" opacity="0.6" />
          <text x="630" y="105" textAnchor="end" fontSize="10" fontWeight="bold" fill="#15803d">
            Validated Refrigerator Range (+2°C to +8°C)
          </text>

          {/* Internal Payload Temperature Curve */}
          <path d="M 60,110 C 180,105 320,95 450,100 C 550,102 600,106 640,108" 
                fill="none" stroke="#046e82" strokeWidth="3" />
          <circle cx="60" cy="110" r="4" fill="#046e82" />
          <circle cx="350" cy="98" r="4" fill="#046e82" />
          <circle cx="640" cy="108" r="4" fill="#046e82" />

          {/* External Harsh Ambient Curve (+48°C) */}
          <path d="M 60,40 C 200,30 380,25 640,32" 
                fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />
          <text x="630" y="26" textAnchor="end" fontSize="10" fill="#dc2626" fontWeight="bold">
            External Tarmac Ambient (+48°C DXB/RUH)
          </text>

          {/* Y-Axis Labels */}
          <text x="50" y="32" textAnchor="end" fontSize="10" fill="#64748b">+50°C</text>
          <text x="50" y="75" textAnchor="end" fontSize="10" fill="#15803d">+8°C</text>
          <text x="50" y="132" textAnchor="end" fontSize="10" fill="#15803d">+2°C</text>
          <text x="50" y="172" textAnchor="end" fontSize="10" fill="#64748b">0°C</text>

          {/* X-Axis Labels */}
          <text x="60" y="195" textAnchor="middle" fontSize="10" fill="#64748b">0h (DEL Cargo)</text>
          <text x="253" y="195" textAnchor="middle" fontSize="10" fill="#64748b">24h (Mid-flight)</text>
          <text x="446" y="195" textAnchor="middle" fontSize="10" fill="#64748b">72h (Port Clearance)</text>
          <text x="640" y="195" textAnchor="middle" fontSize="10" fill="#64748b">120h (Guaranteed Hold)</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-xs text-slate-500 border-t border-slate-100 pt-2 font-medium">
        Figure 4: WHO Good Distribution Practices (GDP) thermal shipper validation curve demonstrating continuous +2°C to +8°C interior payload retention over a 120-hour window.
      </figcaption>
    </figure>
  );
}
