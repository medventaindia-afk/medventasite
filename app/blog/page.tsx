'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllBlogPosts, type EnrichedBlogPost } from '@/data/seoBlogService';

const CATEGORIES = [
  'All Categories',
  'GCC Hospital Procurement',
  'African MOH & Tenders',
  'Global Logistics & Incoterms',
  'International Compliance & Standards',
  'Surgical Sutures & Wound Closure',
  'Vascular Access & Critical Care',
  'Diagnostics & Lab Consumables',
  'Hospital Finance, GST ITC & NABH'
];

export default function BlogIndexPage() {
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBucket, setSelectedBucket] = useState<'All' | 'Export' | 'Domestic'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchCat = selectedCategory === 'All Categories' || post.category === selectedCategory;
      const matchBucket = 
        selectedBucket === 'All' ||
        (selectedBucket === 'Export' && post.bucket.includes('International')) ||
        (selectedBucket === 'Domestic' && post.bucket.includes('Domestic'));
      
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.primaryKeyword.toLowerCase().includes(q) ||
        post.entities.some(e => e.toLowerCase().includes(q)) ||
        post.featuredQuestion.toLowerCase().includes(q);

      return matchCat && matchBucket && matchQuery;
    });
  }, [allPosts, selectedCategory, selectedBucket, searchQuery]);

  const featuredPost = allPosts[0]; // First flagship post

  return (
    <div className="site-wrapper min-h-screen bg-slate-50 text-slate-900">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Luxury Playfair Display 800 & Live Pulsing Badge */}
        <div className="mb-12 text-center">
          <div className="badge-pill mb-3">
            <span className="badge-dot"></span>
            Peer-Reviewed Clinical &amp; Export Intelligence
          </div>

          <h1 className="aesthetic-title max-w-4xl mx-auto">
            Medical Device Procurement &amp; <span className="text-gradient">Export Knowledge Base</span>
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Engineering specifications, Incoterms 2020 CIF/FOB pricing, SFDA/MoHAP/CDSCO regulatory dossiers, and GST ITC recovery protocols for hospital directors, surgical teams, and global tender authorities.
          </p>
        </div>

        {/* Featured Flagship Article Banner */}
        {selectedCategory === 'All Categories' && !searchQuery && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0F2D4E] to-[#0a1e35] text-white shadow-xl">
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-12 lg:p-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#046e82]/30 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/40">
                    Flagship Clinical Guide
                  </span>
                  <span className="text-xs text-slate-300">8 min read &bull; ISO 13485 Certified Facility</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl text-white font-serif leading-snug">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-cyan-300 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-300 sm:text-base line-clamp-2 leading-relaxed">
                  {featuredPost.directAnswer}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredPost.entities.slice(0, 5).map((e, idx) => (
                    <span key={idx} className="rounded bg-white/10 px-2.5 py-0.5 text-xs text-slate-200">
                      {e}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#046e82] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#015a6b] transition-colors shadow-sm"
                  >
                    Read Technical Dossier
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link
                    href="/in/b2b-quote"
                    className="inline-flex items-center gap-2 rounded-lg border border-amber-500 bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    Request Institutional Quote
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Featured Snippet Summary</p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-5">
                  {featuredPost.directAnswer}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Author: {featuredPost.author.name}</span>
                  <span className="text-emerald-400 font-semibold">100% Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Bucket Switcher */}
            <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedBucket('All')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedBucket === 'All' ? 'bg-[#0F2D4E] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Procurement (100)
              </button>
              <button
                type="button"
                onClick={() => setSelectedBucket('Export')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedBucket === 'Export' ? 'bg-[#0F2D4E] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Global Export &amp; Tenders (50)
              </button>
              <button
                type="button"
                onClick={() => setSelectedBucket('Domestic')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedBucket === 'Domestic' ? 'bg-[#0F2D4E] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Domestic India B2B (50)
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative flex-1 md:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, product, port, entity (e.g. SFDA, Vicryl, CIF)..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-[#046e82] focus:outline-none focus:ring-1 focus:ring-[#046e82]"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#046e82] text-white shadow-sm font-semibold'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredPosts.length}</strong> verified technical dossiers</span>
          <span>Quality Standard: 800+ Word Clinical Authority Articles</span>
        </div>

        {/* 100 Post Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#046e82] hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded bg-cyan-50 px-2 py-0.5 text-[11px] font-bold text-[#046e82] border border-cyan-100">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Verified Dossier
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold leading-snug text-[#0F2D4E] group-hover:text-[#046e82] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs font-medium text-[#046e82]">
                  <strong>Target Focus:</strong> {post.primaryKeyword}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                  <strong>Procurement Synopsis:</strong> {post.directAnswer}
                </p>

                {/* Entity Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.entities.slice(0, 4).map((entity, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#046e82] hover:text-[#015a6b]"
                  >
                    View Specifications &amp; Dossier
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link
                    href="/in/b2b-quote"
                    className="rounded bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="my-16 text-center">
            <h3 className="text-lg font-bold text-[#0F2D4E]">No matching technical dossiers found</h3>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your keyword search or category filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
