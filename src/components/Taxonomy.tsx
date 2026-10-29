import React, { useState } from 'react';
import {
  PHYLOGENETIC_STUDIES,
  RELATIVE_TAXA,
} from '../data/argentinosaurusData';
import { getPhylogeneticStudyByIndex } from '../utils/scaleMath';

const TAXONOMIC_HIERARCHY = [
  { rank: 'Kingdom', taxon: 'Animalia' },
  { rank: 'Phylum', taxon: 'Chordata' },
  { rank: 'Clade', taxon: 'Dinosauria' },
  { rank: 'Clade', taxon: 'Saurischia' },
  { rank: 'Clade', taxon: 'Sauropodomorpha' },
  { rank: 'Clade', taxon: 'Sauropoda' },
  { rank: 'Clade', taxon: 'Macronaria' },
  { rank: 'Clade', taxon: 'Titanosauria' },
  { rank: 'Genus', taxon: 'Argentinosaurus (Bonaparte & Coria, 1993)' },
  { rank: 'Species', taxon: 'A. huinculensis (Type & only known species)' },
];

export const Taxonomy: React.FC = () => {
  const [studyIndex, setStudyIndex] = useState<number>(2); // Default 2017 Carballido et al.
  const activeStudy = getPhylogeneticStudyByIndex(studyIndex);

  return (
    <section
      id="classification"
      aria-labelledby="classification-heading"
      className="relative border-t border-[#D8C089]/15 bg-gradient-to-b from-[#07190E] via-[#0E3320] to-[#07190E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8C089]/20 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-5">
              <span
                className="section-number-outline text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                08
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  SYSTEMATICS &amp; PHYLOGENY
                </p>
                <h2
                  id="classification-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Classification &amp; Species
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/90">
              <em>Argentinosaurus huinculensis</em> is the only known species of its genus. Because
              its skeleton is so incomplete, its exact position on the titanosaur family tree
              remains <strong>debated</strong> across competing cladistic studies.
            </p>
          </div>
        </div>

        {/* Top Split: Taxonomy Hierarchy Card + Interactive Family Tree Study Slider */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Taxonomy Hierarchy Card (4 Cols) */}
          <div className="rounded-2xl border border-[#D8C089]/20 bg-[#07190E]/90 p-6 sm:p-8 lg:col-span-4">
            <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
              SYSTEMATIC HIERARCHY
            </p>
            <h3 className="font-display mt-2 text-xl tracking-[0.03em] text-[#FFF8E6] uppercase">
              Linnaean &amp; Clade Rank
            </h3>

            <dl className="mt-6 space-y-2.5 text-sm">
              {TAXONOMIC_HIERARCHY.map((item) => (
                <div
                  key={item.rank + item.taxon}
                  className="flex items-baseline justify-between gap-2 border-b border-[#D8C089]/12 pb-2"
                >
                  <dt className="text-xs tracking-[0.08em] text-[#D8C089] uppercase">
                    {item.rank}
                  </dt>
                  <dd className="text-right font-medium text-[#FFF8E6]">{item.taxon}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Interactive "Where does it sit in the family tree?" Slider (8 Cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8C089]/25 bg-[#07190E]/90 p-6 sm:p-8 lg:col-span-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8C089]/15 pb-4">
                <div>
                  <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
                    SHIFTING CLADISTIC TOPOLOGIES · 1993 TO 2019
                  </p>
                  <h3 className="font-display mt-1 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                    Where Does It Sit in the Family Tree? (Debated)
                  </h3>
                </div>
                <span className="text-xs italic text-[#F7C95F]">· status: debated</span>
              </div>

              {/* Study Year Stop Buttons */}
              <div
                role="group"
                aria-label="Select phylogenetic study year"
                className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5"
              >
                {PHYLOGENETIC_STUDIES.map((study, idx) => {
                  const isSelected = studyIndex === idx;
                  return (
                    <button
                      key={study.year}
                      type="button"
                      onClick={() => setStudyIndex(idx)}
                      aria-pressed={isSelected}
                      className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#F7C95F] bg-[#0E3320] text-[#FFF8E6]'
                          : 'border-[#D8C089]/20 bg-[#0E3320]/30 text-[#D8C089] hover:border-[#D8C089]/50'
                      }`}
                    >
                      <span className="font-display block text-lg text-[#FFE08F] tabular-nums">
                        {study.year}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-[#FFF8E6]/80">
                        {study.authors.split('(')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Study Detail & Cladogram Path */}
              <div
                data-testid="phylogeny-study-panel"
                className="mt-6 rounded-xl border border-[#D8C089]/20 bg-[#0E3320]/55 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#D8C089]">
                  <span className="font-display tracking-wider text-[#FFE08F] uppercase">
                    {activeStudy.authors}
                  </span>
                  <span className="italic">Placement: {activeStudy.epistemicTag}</span>
                </div>

                <h4 className="font-display mt-2 text-xl text-[#FFF8E6] uppercase sm:text-2xl">
                  {activeStudy.placementTitle}
                </h4>

                {/* Visual Clade Chain */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-y border-[#D8C089]/15 py-3 text-xs font-medium text-[#FFE08F]">
                  {activeStudy.cladePath.map((node, i) => (
                    <React.Fragment key={node}>
                      <span className="font-display tracking-wider uppercase">{node}</span>
                      {i < activeStudy.cladePath.length - 1 && (
                        <span className="text-[#D8C089]/60" aria-hidden="true">
                          ›
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-[1.75] text-[#FFF8E6]/85">
                  {activeStudy.summary}
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#D8C089]/80">
              Without cranial or caudal elements, character scoring relies heavily on dorsal
              vertebrae, the sacrum, and the fibula—explaining why different phylogenetic matrices
              recover <em>Argentinosaurus</em> either inside Lognkosauria or as a more basal
              titanosaur.
            </p>
          </div>
        </div>

        {/* Relatives Grid (9 Taxa) */}
        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#D8C089]/15 pb-3">
            <h3 className="font-display text-xl tracking-[0.04em] text-[#FFF8E6] uppercase">
              Key Titanosaur Relatives &amp; Comparative Taxa
            </h3>
            <span className="text-xs text-[#D8C089]">
              SOUTH AMERICAN TITANOSAURIA &amp; LOGNKOSAURIA
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RELATIVE_TAXA.map((rel) => (
              <div
                key={rel.name}
                className="rounded-xl border border-[#D8C089]/18 bg-[#07190E]/75 p-5 transition-colors hover:border-[#D8C089]/40"
              >
                <h4 className="font-display text-base tracking-[0.03em] text-[#FFE08F] italic">
                  {rel.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#FFF8E6]/80">{rel.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
