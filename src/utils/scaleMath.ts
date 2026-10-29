import {
  SIZE_COMPARISON_SUBJECTS,
  GROWTH_STAGES,
  PHYLOGENETIC_STUDIES,
  ANATOMY_HOTSPOTS,
  MENU_SECTIONS,
  type SizeComparisonSubject,
  type GrowthStage,
  type PhylogeneticStudy,
} from '../data/argentinosaurusData';

export interface ScaleGaugeState {
  currentMeters: number;
  formattedMeters: string;
  activeMilestoneLabel: string;
  progressPercent: number;
}

export const SCALE_GAUGE_MAX_METERS = 7.3;

export const SCALE_GAUGE_TICKS = [
  { meters: 0, label: '0.0 m · GROUND LEVEL', shortLabel: '0 m' },
  { meters: 1.7, label: '1.7 m · HUMAN', shortLabel: '1.7 m HUMAN' },
  { meters: 3.5, label: '3.5 m · AFRICAN ELEPHANT (SHOULDER)', shortLabel: '3.5 m ELEPHANT' },
  {
    meters: 7.3,
    label: '7.3 m · ARGENTINOSAURUS (SHOULDER, ESTIMATE)',
    shortLabel: '7.3 m SHOULDER (EST.)',
  },
] as const;

/**
 * Resolves the target section index and ID when the user presses Arrow keys or Spacebar
 * for deep-dive section-by-section keyboard navigation.
 */
export function getTargetSectionForKey(
  currentIndex: number,
  key: string,
  shiftKey = false
): { index: number; id: string; number: string; label: string } | null {
  const total = MENU_SECTIONS.length;
  const safeCurrent = Math.max(0, Math.min(total - 1, Math.floor(currentIndex)));

  let nextIndex: number | null = null;

  if (key === 'ArrowDown' || key === 'ArrowRight' || (key === ' ' && !shiftKey)) {
    nextIndex = Math.min(total - 1, safeCurrent + 1);
  } else if (key === 'ArrowUp' || key === 'ArrowLeft' || (key === ' ' && shiftKey)) {
    nextIndex = Math.max(0, safeCurrent - 1);
  } else if (key === 'Home') {
    nextIndex = 0;
  } else if (key === 'End') {
    nextIndex = total - 1;
  }

  if (nextIndex === null) return null;
  const target = MENU_SECTIONS[nextIndex];
  return {
    index: nextIndex,
    id: target.id,
    number: target.number,
    label: target.label,
  };
}

/**
 * Converts normalized scroll progress [0..1] into the vertical scale gauge reading [0..7.3 m].
 */
export function computeScaleGaugeState(scrollProgress: number): ScaleGaugeState {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(scrollProgress) ? scrollProgress : 0));
  const currentMeters = Number((clamped * SCALE_GAUGE_MAX_METERS).toFixed(1));
  const formattedMeters = `${currentMeters.toFixed(1)} m`;

  let activeMilestoneLabel = 'GROUND PLAIN · 0.0 m';
  if (currentMeters >= 7.0) {
    activeMilestoneLabel = 'ARGENTINOSAURUS SHOULDER · 7.3 m (ESTIMATE, 2013 MODEL)';
  } else if (currentMeters >= 3.4) {
    activeMilestoneLabel = 'AFRICAN ELEPHANT SHOULDER · ~3–4 m';
  } else if (currentMeters >= 1.65) {
    activeMilestoneLabel = 'ADULT HUMAN HEIGHT · 1.7 m';
  }

  return {
    currentMeters,
    formattedMeters,
    activeMilestoneLabel,
    progressPercent: Number((clamped * 100).toFixed(2)),
  };
}

export type ComparisonMetricMode = 'length' | 'mass';
export type ComparisonEstimateMode = 'conservative' | 'high-end';

export interface ComputedSubjectComparison {
  subject: SizeComparisonSubject;
  value: number;
  unit: string;
  formattedValue: string;
  barPercentage: number;
  ratioToHuman: number;
}

/**
 * Computes normalized bar lengths and display values for the Size Comparison chart.
 */
export function computeSizeComparison(
  metricMode: ComparisonMetricMode,
  estimateMode: ComparisonEstimateMode
): ComputedSubjectComparison[] {
  const values = SIZE_COMPARISON_SUBJECTS.map((s) => {
    if (metricMode === 'length') {
      return estimateMode === 'conservative' ? s.lengthConservativeM : s.lengthHighEndM;
    }
    return estimateMode === 'conservative' ? s.massConservativeT : s.massHighEndT;
  });

  const maxVal = Math.max(...values, 1);
  const humanVal = values[0] || 1;

  return SIZE_COMPARISON_SUBJECTS.map((subject, idx) => {
    const value = values[idx];
    const unit = metricMode === 'length' ? 'm' : 'tonnes';
    const formattedValue =
      metricMode === 'length'
        ? `${value.toFixed(1)} m`
        : value < 1
          ? `${(value * 1000).toFixed(0)} kg`
          : `${value.toFixed(1)} t`;
    const barPercentage = Math.max(2.5, Number(((value / maxVal) * 100).toFixed(2)));
    const ratioToHuman = Number((value / humanVal).toFixed(1));

    return {
      subject,
      value,
      unit,
      formattedValue,
      barPercentage,
      ratioToHuman,
    };
  });
}

/**
 * Retrieves the growth stage for a given index [0..3] and computes its fold-change over hatchling size.
 */
export function getGrowthStageDetails(stageIndex: number): {
  stage: GrowthStage;
  lengthFoldIncrease: number;
  massFoldIncrease: number;
  scaleRatioPercent: number;
} {
  const safeIndex = Math.max(0, Math.min(GROWTH_STAGES.length - 1, Math.floor(stageIndex)));
  const stage = GROWTH_STAGES[safeIndex];
  const hatchling = GROWTH_STAGES[0];
  const maxStage = GROWTH_STAGES[GROWTH_STAGES.length - 1];

  return {
    stage,
    lengthFoldIncrease: Number((stage.lengthM / hatchling.lengthM).toFixed(1)),
    massFoldIncrease: Math.round(stage.massKg / hatchling.massKg),
    scaleRatioPercent: Number(((stage.lengthM / maxStage.lengthM) * 100).toFixed(1)),
  };
}

/**
 * Retrieves the phylogenetic study by index [0..4].
 */
export function getPhylogeneticStudyByIndex(index: number): PhylogeneticStudy {
  const safeIdx = Math.max(0, Math.min(PHYLOGENETIC_STUDIES.length - 1, Math.floor(index)));
  return PHYLOGENETIC_STUDIES[safeIdx];
}

/**
 * Verifies which anatomy elements are preserved vs reconstructed from relatives.
 */
export function getAnatomyPreservationSummary() {
  const preserved = ANATOMY_HOTSPOTS.filter((h) => h.preserved);
  const reconstructed = ANATOMY_HOTSPOTS.filter((h) => !h.preserved);
  return {
    preservedCount: preserved.length,
    reconstructedCount: reconstructed.length,
    preservedIds: preserved.map((p) => p.id),
    reconstructedIds: reconstructed.map((r) => r.id),
  };
}
