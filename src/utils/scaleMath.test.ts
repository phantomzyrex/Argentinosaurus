import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeScaleGaugeState,
  computeSizeComparison,
  getGrowthStageDetails,
  getPhylogeneticStudyByIndex,
  getAnatomyPreservationSummary,
  getTargetSectionForKey,
} from './scaleMath';
import {
  DISCOVERY_TIMELINE,
  MYTH_CARDS,
  FAST_FACTS,
  SCIENTIFIC_SOURCES,
} from '../data/argentinosaurusData';

test('getTargetSectionForKey navigates next and previous sections with Arrow keys and Space', () => {
  const nextFromHero = getTargetSectionForKey(0, 'ArrowDown');
  assert.ok(nextFromHero);
  assert.equal(nextFromHero.id, 'overview');
  assert.equal(nextFromHero.number, '02');

  const spaceFromOverview = getTargetSectionForKey(1, ' ');
  assert.ok(spaceFromOverview);
  assert.equal(spaceFromOverview.id, 'discovery');
  assert.equal(spaceFromOverview.number, '03');

  const shiftSpaceBack = getTargetSectionForKey(2, ' ', true);
  assert.ok(shiftSpaceBack);
  assert.equal(shiftSpaceBack.id, 'overview');

  const arrowUpFromHero = getTargetSectionForKey(0, 'ArrowUp');
  assert.ok(arrowUpFromHero);
  assert.equal(arrowUpFromHero.id, 'hero');

  const endJump = getTargetSectionForKey(0, 'End');
  assert.ok(endJump);
  assert.equal(endJump.id, 'contact');
  assert.equal(endJump.number, '13');
});

test('computeScaleGaugeState interpolates 0 m to 7.3 m accurately across scroll', () => {
  const start = computeScaleGaugeState(0);
  assert.equal(start.currentMeters, 0);
  assert.equal(start.formattedMeters, '0.0 m');

  const humanLevel = computeScaleGaugeState(1.7 / 7.3);
  assert.equal(humanLevel.currentMeters, 1.7);
  assert.ok(humanLevel.activeMilestoneLabel.includes('HUMAN'));

  const elephantLevel = computeScaleGaugeState(3.6 / 7.3);
  assert.ok(elephantLevel.activeMilestoneLabel.includes('ELEPHANT'));

  const top = computeScaleGaugeState(1);
  assert.equal(top.currentMeters, 7.3);
  assert.equal(top.formattedMeters, '7.3 m');
  assert.ok(top.activeMilestoneLabel.includes('ARGENTINOSAURUS SHOULDER'));
});

test('computeSizeComparison handles length vs mass and conservative vs high-end toggles', () => {
  const lengthConservative = computeSizeComparison('length', 'conservative');
  const argLenCons = lengthConservative.find((c) => c.subject.id === 'argentinosaurus');
  assert.ok(argLenCons);
  assert.equal(argLenCons.value, 33.0);
  assert.equal(argLenCons.barPercentage, 100);

  const lengthHighEnd = computeSizeComparison('length', 'high-end');
  const argLenHigh = lengthHighEnd.find((c) => c.subject.id === 'argentinosaurus');
  assert.ok(argLenHigh);
  assert.equal(argLenHigh.value, 39.7);

  const massHighEnd = computeSizeComparison('mass', 'high-end');
  const blueWhaleMass = massHighEnd.find((c) => c.subject.id === 'blue-whale');
  const argMassHigh = massHighEnd.find((c) => c.subject.id === 'argentinosaurus');
  assert.ok(blueWhaleMass && argMassHigh);
  assert.ok(blueWhaleMass.value > argMassHigh.value, 'Blue whale remains heavier than Argentinosaurus');
  assert.equal(argMassHigh.value, 83.0);
});

test('getGrowthStageDetails calculates fold growth from 1 m / 5 kg hatchling to adult', () => {
  const hatchling = getGrowthStageDetails(0);
  assert.equal(hatchling.stage.lengthM, 1.0);
  assert.equal(hatchling.stage.massKg, 5);
  assert.equal(hatchling.massFoldIncrease, 1);

  const adult = getGrowthStageDetails(2);
  assert.equal(adult.stage.lengthM, 33.0);
  assert.equal(adult.massFoldIncrease, 14600);
});

test('getAnatomyPreservationSummary distinguishes preserved bones from unpreserved skull, neck, tail, skin', () => {
  const summary = getAnatomyPreservationSummary();
  assert.equal(summary.preservedCount, 6);
  assert.equal(summary.reconstructedCount, 3);
  assert.ok(summary.reconstructedIds.includes('neck-and-tail'));
  assert.ok(summary.reconstructedIds.includes('skull-and-teeth'));
  assert.ok(summary.reconstructedIds.includes('skin-integument'));
});

test('scientific dataset contains all required timeline milestones, myth cards, fast facts, and sources', () => {
  assert.equal(DISCOVERY_TIMELINE.length, 11);
  assert.equal(DISCOVERY_TIMELINE[0].year, '1987');
  assert.equal(DISCOVERY_TIMELINE[9].year, '2026');
  assert.equal(MYTH_CARDS.length, 6);
  assert.equal(FAST_FACTS.length, 8);
  assert.ok(SCIENTIFIC_SOURCES.length >= 18);

  const study2017 = getPhylogeneticStudyByIndex(2);
  assert.equal(study2017.year, 2017);
  assert.ok(study2017.placementTitle.includes('Lognkosauria'));
});
