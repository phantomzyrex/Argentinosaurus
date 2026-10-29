export type EpistemicTag =
  | 'fossil record'
  | 'estimate'
  | 'debated'
  | 'inferred'
  | 'inferred from relatives'
  | 'hypothesis'
  | 'newly revised, based on one recent study'
  | 'uncertain identity';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  epistemicTag?: EpistemicTag;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  epistemicTag?: EpistemicTag;
  highlight?: string;
}

export interface AnatomyHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  preserved: boolean;
  epistemicTag: EpistemicTag;
  summary: string;
  details: string;
  dimensions?: string;
}

export interface SizeComparisonSubject {
  id: string;
  name: string;
  subtitle: string;
  lengthConservativeM: number;
  lengthHighEndM: number;
  massConservativeT: number;
  massHighEndT: number;
  shoulderHeightM: number;
  note: string;
  isFocal?: boolean;
  isReconstructedOutline?: boolean;
}

export interface GrowthStage {
  id: string;
  stageLabel: string;
  ageLabel: string;
  lengthM: number;
  massKg: number;
  massDisplay: string;
  lengthDisplay: string;
  milestone: string;
  description: string;
  epistemicTag: EpistemicTag;
}

export interface EcosystemZone {
  id: string;
  name: string;
  subtitle: string;
  epistemicTag?: EpistemicTag;
  geologyAndSoil: string;
  flora: string[];
  fauna: string[];
  description: string;
}

export interface PhylogeneticStudy {
  year: number;
  authors: string;
  placementTitle: string;
  cladePath: string[];
  summary: string;
  epistemicTag: EpistemicTag;
}

export interface RelativeTaxon {
  name: string;
  note: string;
}

export interface MythCard {
  id: string;
  number: string;
  myth: string;
  reality: string;
  epistemicNote: string;
}

export interface GalleryPlate {
  id: string;
  src: string;
  plateNumber: string;
  title: string;
  caption: string;
  floraNote: string;
}

export const HERO_IMAGE_PATH = '/assets/argentinosaurus-hero.png';
export const FALLBACK_UPLOADED_IMAGE_PATH = '/assets/aistudio/Argentinosaurus_with_Sweeping_Tail_7edd1b53.png';

export const MENU_SECTIONS = [
  { number: '01', id: 'hero', label: 'River Plain Horizon' },
  { number: '02', id: 'overview', label: 'Overview — The Argentine Lizard' },
  { number: '03', id: 'discovery', label: 'Discovery & History' },
  { number: '04', id: 'anatomy', label: 'Skeletal Anatomy' },
  { number: '05', id: 'size-comparison', label: 'Size Comparison' },
  { number: '06', id: 'diet-growth', label: 'Diet & Life History' },
  { number: '07', id: 'habitat', label: 'Habitat & Distribution' },
  { number: '08', id: 'classification', label: 'Classification & Species' },
  { number: '09', id: 'evolution', label: 'Evolution & Extinction' },
  { number: '10', id: 'myth-reality', label: 'Myth vs Reality' },
  { number: '11', id: 'gallery', label: 'Ecosystem Plates' },
  { number: '12', id: 'fast-facts', label: 'Fast Facts & Sources' },
  { number: '13', id: 'contact', label: 'Contact & Colophon' },
] as const;

export const OVERVIEW_STATS: StatItem[] = [
  {
    id: 'name-meaning',
    label: 'Name Meaning',
    value: '“Argentine lizard”',
    detail:
      'Derived from Argentina + Greek sauros (lizard). The species name huinculensis refers to the town of Plaza Huincul, Neuquén Province, near where the fossils were uncovered.',
    epistemicTag: 'fossil record',
  },
  {
    id: 'lived',
    label: 'Geological Age',
    value: 'Early Cretaceous (Albian, ~107 Ma)',
    detail:
      'Dated to about 107 million years ago according to a 2026 re-dating of its rock layer (the Huincul Formation). Earlier studies placed it in the Cenomanian–Turonian, about 97–94 million years ago.',
    epistemicTag: 'newly revised, based on one recent study',
  },
  {
    id: 'length',
    label: 'Total Length',
    value: '30 – 35 m (98 – 115 ft)',
    detail:
      'Published reconstructions range from about 30 m to nearly 40 m (39.7 m in a 2013 digital mount), scaled from related titanosaurs since the neck and tail are unknown.',
    epistemicTag: 'estimate',
  },
  {
    id: 'mass',
    label: 'Body Mass',
    value: '65 – 80 tonnes',
    detail:
      'Recent biomechanical and volumetric studies converge around 65–80 tonnes; published historical estimates range from about 50 to 100 tonnes.',
    epistemicTag: 'estimate',
  },
  {
    id: 'shoulder-height',
    label: 'Shoulder Height',
    value: '~7.3 m (24 ft)',
    detail:
      'Derived from a 2013 laser-scanned digital reconstruction of the mounted composite skeleton at Museo Carmen Funes.',
    epistemicTag: 'estimate',
  },
  {
    id: 'fossil-material',
    label: 'Known Fossil Material',
    value: 'Holotype MCF-PVPH-1 (Fragmentary)',
    detail:
      'Several back (dorsal) vertebrae, part of the sacrum, rib fragments, and one calf bone (fibula) from the type specimen. Two thigh bones (femora) have been referred to the genus, though their identity is uncertain. No skull, neck, tail, or forelimb is known.',
    epistemicTag: 'fossil record',
  },
  {
    id: 'diet',
    label: 'Dietary Ecology',
    value: 'High-volume Herbivore',
    detail:
      'Plant-eater, inferred from all known sauropod relatives since no skull or dentition has been recovered for Argentinosaurus.',
    epistemicTag: 'inferred from relatives',
  },
  {
    id: 'locomotion',
    label: 'Locomotion & Speed',
    value: 'Quadrupedal · Top Speed ~7 km/h',
    detail:
      'Four-legged gravestone-pillar stance; multibody computer simulation (Sellers et al., 2013) calculated a maximum walking speed of roughly 7 km/h (2 m/s).',
    epistemicTag: 'estimate',
  },
  {
    id: 'lifespan',
    label: 'Estimated Lifespan',
    value: 'Roughly 30 Years',
    detail:
      'Life-history modeling of giant sauropods indicates sexual maturity around 8–10 years, full adult size near 20 years, and a lifespan of roughly three decades.',
    epistemicTag: 'estimate',
  },
  {
    id: 'group',
    label: 'Clade & Status',
    value: 'Dinosauria · Sauropoda · Titanosauria',
    detail: 'Extinct giant titanosaurian sauropod endemic to the Neuquén Basin of Patagonia.',
    epistemicTag: 'fossil record',
  },
];

export const DISCOVERY_TIMELINE: TimelineEvent[] = [
  {
    year: '1987',
    title: 'The Petrified Log at Plaza Huincul',
    description:
      'Rancher Guillermo Heredia discovers an enormous bone protruding from sandstone near Plaza Huincul, Neuquén Province, initially mistaking it for a giant petrified log. He alerts staff at the local museum, Museo Carmen Funes. The element is now identified as a 1.55 m fibula (calf bone).',
    epistemicTag: 'fossil record',
    highlight: 'Initial discovery near Plaza Huincul',
  },
  {
    year: '1989',
    title: 'Bonaparte’s Pneumatic Excavation',
    description:
      'Paleontologist José Bonaparte leads a full expedition into the Huincul Formation, recovering gigantic back vertebrae, a partial sacrum, and rib fragments. Workers require pneumatic jackhammers to free the fossilized elements from extremely hard sandstone.',
    epistemicTag: 'fossil record',
    highlight: 'Holotype MCF-PVPH-1 excavated',
  },
  {
    year: '1993',
    title: 'Formal Description of Argentinosaurus huinculensis',
    description:
      'José Bonaparte and Rodolfo Coria formally name and describe Argentinosaurus huinculensis. The holotype specimen (MCF-PVPH-1) is housed at the Museo Carmen Funes in Plaza Huincul.',
    epistemicTag: 'fossil record',
    highlight: 'Bonaparte & Coria (1993)',
  },
  {
    year: '1996',
    title: 'The Referred 2.5 m Femur',
    description:
      'Bonaparte refers a complete, anteroposteriorly crushed 2.5 m thigh bone (femur, MLP-DP 46-VIII-21-3) from the same locality to Argentinosaurus, alongside an incomplete femur shaft. Because it was not found in articulation with the holotype, its assignment remains uncertain.',
    epistemicTag: 'uncertain identity',
    highlight: '2.5 m femur referred',
  },
  {
    year: '2004',
    title: 'Fibula Re-identification & 73-Tonne Estimate',
    description:
      'Gerardo Mazzetta and colleagues re-identify the 1987 bone—originally thought to be a tibia—as a right fibula, and calculate a body mass of approximately 73 tonnes (with a plausible range of 60–88 tonnes).',
    epistemicTag: 'estimate',
    highlight: 'Mazzetta et al. (2004)',
  },
  {
    year: '2006–2010',
    title: 'Debates Over Vertebral Serial Position',
    description:
      'Researchers disagree over the exact positions of the preserved dorsal vertebrae along the trunk column (Novas & Ezcurra, 2006; Salgado & Powell, 2010), illustrating how fragmentary remains complicate spinal reconstructions.',
    epistemicTag: 'debated',
    highlight: 'Spinal sequence debated',
  },
  {
    year: '2013',
    title: 'Multibody Computer Walking Simulation',
    description:
      'William Sellers and colleagues laser-scan the Museo Carmen Funes skeletal mount (39.7 m long, ~7.3 m shoulder height, ~83 tonnes) and simulate its musculoskeletal gait, finding a top walking speed of about 7 km/h.',
    epistemicTag: 'estimate',
    highlight: 'Sellers et al. (2013) digital gait model',
  },
  {
    year: '2017–2019',
    title: 'The Titanosaur Size Debate: Patagotitan vs Argentinosaurus',
    description:
      'Carballido et al. (2017) describe Patagotitan mayorum and judge it larger than Argentinosaurus. Gregory S. Paul (2019) disagrees, arguing that dorsal and sacral dimensions show Argentinosaurus was at least as massive (~65–75 tonnes). Which titanosaur was largest remains debated.',
    epistemicTag: 'debated',
    highlight: 'Rival giant comparisons',
  },
  {
    year: '2023',
    title: 'Volumetric Reassessment of the Holotype',
    description:
      'Paul and Larramendi (2023) re-evaluate titanosaur skeletal proportions and propose a mass of roughly 75–80 tonnes for the Argentinosaurus holotype individual.',
    epistemicTag: 'estimate',
    highlight: 'Paul & Larramendi (2023)',
  },
  {
    year: '2026',
    title: 'Radiometric Re-dating of the Huincul Formation',
    description:
      'Maniel and colleagues publish new ash-bed zircon U–Pb ages that re-date the Huincul Formation to the early Albian (~106–107 million years ago), roughly 10 million years older than earlier Cenomanian–Turonian estimates (~97–94 Ma).',
    epistemicTag: 'newly revised, based on one recent study',
    highlight: 'Maniel et al. (2026) ~107 Ma date',
  },
  {
    year: 'Today',
    title: 'An Incomplete Giant Awaiting New Finds',
    description:
      'No skull, neck, tail, or forelimb of Argentinosaurus has ever been discovered. More complete articulated skeletons from the Huincul Formation are needed to settle enduring questions about its exact proportions and classification.',
    epistemicTag: 'fossil record',
    highlight: 'Open paleontological frontier',
  },
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'back-vertebrae',
    label: 'Back Vertebrae (Dorsals)',
    xPercent: 52,
    yPercent: 25,
    preserved: true,
    epistemicTag: 'fossil record',
    dimensions: '~1.6 m tall × 1.3 m wide (reconstructed dorsal)',
    summary: 'Enormous trunk vertebrae that anchored massive back muscles.',
    details:
      'Several dorsal vertebrae are preserved in the holotype (MCF-PVPH-1). One reconstructed anterior dorsal vertebra measures approximately 1.6 m in total height and 1.3 m across the diapophyses—among the largest single dinosaur bones ever found.',
  },
  {
    id: 'air-filled-bones',
    label: 'Pneumatic Air Chambers',
    xPercent: 57,
    yPercent: 29,
    preserved: true,
    epistemicTag: 'inferred',
    dimensions: 'Internal camellate cavities ~4–6 cm across',
    summary: 'Honeycomb-like internal air chambers drastically reduced skeletal weight.',
    details:
      'The presacral vertebrae were lightened by an intricate network of internal camellate air chambers measuring about 4–6 cm across. From these structures, paleontologists infer a bird-like pulmonary air-sac system that invaded the spine.',
  },
  {
    id: 'spine-joints',
    label: 'Hyposphene–Hypantrum Spine Joints',
    xPercent: 47,
    yPercent: 28,
    preserved: true,
    epistemicTag: 'debated',
    summary: 'Extra bony articulations that may have stiffened the torso.',
    details:
      'Bonaparte (1996) described accessory hyposphene–hypantrum articulations between the dorsal vertebrae that could have locked and stiffened the immense trunk column. However, other researchers argue these structures are merely thickened bony ridges rather than true functional joints (debated).',
  },
  {
    id: 'hips-sacrum',
    label: 'Hips & Sacrum',
    xPercent: 42,
    yPercent: 33,
    preserved: true,
    epistemicTag: 'inferred',
    dimensions: 'Sacral vertebrae 1–5 preserved; 6th inferred',
    summary: 'Fused sacral block transferring tens of tonnes of mass to the hindlimbs.',
    details:
      'The holotype preserves the ventral portion of sacral vertebrae 1 through 5 fused together. Based on related titanosaurs, the complete sacrum probably comprised six fused vertebrae to bear the extraordinary body weight (the sixth is not preserved).',
  },
  {
    id: 'ribs',
    label: 'Thoracic Ribs',
    xPercent: 55,
    yPercent: 45,
    preserved: true,
    epistemicTag: 'debated',
    summary: 'Tubular, cylindrical ribs framing the deep ribcage.',
    details:
      'Preserved dorsal ribs are tubular and cylindrical in cross-section rather than flat planks. While internal hollowing was originally noted, researchers debate whether those cavities reflect genuine pneumaticity or post-burial taphonomic erosion.',
  },
  {
    id: 'legs-femur-fibula',
    label: 'Hindlimbs (Fibula & Referred Femur)',
    xPercent: 43,
    yPercent: 68,
    preserved: true,
    epistemicTag: 'uncertain identity',
    dimensions: 'Holotype fibula: 1.55 m · Referred femur: ~2.5 m',
    summary: 'Thick, gravimetric pillar-like limbs built for vertical weight support.',
    details:
      'The holotype includes a 1.55 m right fibula (originally mistaken for a tibia). Two femora—including a complete, crushed ~2.5 m specimen—were later referred to Argentinosaurus from the same area, though their referral is uncertain. Forelimbs are completely unpreserved and reconstructed from relatives.',
  },
  {
    id: 'neck-and-tail',
    label: 'Neck & Sweeping Tail',
    xPercent: 76,
    yPercent: 22,
    preserved: false,
    epistemicTag: 'inferred from relatives',
    summary: 'Not preserved in the fossil record; reconstructed from related titanosaurs.',
    details:
      'Zero cervical (neck) or caudal (tail) vertebrae of Argentinosaurus have been recovered. All skeletal mounts and artistic profiles borrow neck and tail proportions from more complete South American lognkosaurians and titanosaurs such as Futalognkosaurus and Patagotitan.',
  },
  {
    id: 'skull-and-teeth',
    label: 'Skull & Dentition',
    xPercent: 95,
    yPercent: 14,
    preserved: false,
    epistemicTag: 'inferred from relatives',
    summary: 'Completely unknown; inferred to have borne small, peg-like teeth.',
    details:
      'No cranial material has ever been found for Argentinosaurus. Based on related titanosaurs, the head was comparatively small and equipped with narrow, peg- or pencil-like teeth suited for stripping foliage without mastication.',
  },
  {
    id: 'skin-integument',
    label: 'Skin & Osteoderms',
    xPercent: 34,
    yPercent: 42,
    preserved: false,
    epistemicTag: 'inferred from relatives',
    summary: 'Skin colour and texture are unknown; some relatives carried bony osteoderms.',
    details:
      'No fossilized skin impressions or osteoderms belong to Argentinosaurus. Some related titanosaurs carried small bony plates (osteoderms) embedded in their hide. All colouration in this digital monograph—sunlit ochre, olive, and river-forest green—is purely artistic.',
  },
];

export const SIZE_COMPARISON_SUBJECTS: SizeComparisonSubject[] = [
  {
    id: 'human',
    name: 'Modern Human',
    subtitle: 'Homo sapiens',
    lengthConservativeM: 1.7,
    lengthHighEndM: 1.7,
    massConservativeT: 0.07,
    massHighEndT: 0.07,
    shoulderHeightM: 1.7,
    note: 'Standard adult reference height (1.7 m). Barely reaches past the ankle joint of Argentinosaurus.',
  },
  {
    id: 'elephant',
    name: 'African Bush Elephant',
    subtitle: 'Loxodonta africana',
    lengthConservativeM: 6.5,
    lengthHighEndM: 6.5,
    massConservativeT: 6.0,
    massHighEndT: 6.0,
    shoulderHeightM: 3.5,
    note: 'Largest living land animal (~3–4 m at the shoulder, up to ~6 tonnes). Less than one-tenth the mass of Argentinosaurus.',
  },
  {
    id: 'trex',
    name: 'Tyrannosaurus rex',
    subtitle: 'Late Cretaceous Theropod',
    lengthConservativeM: 12.3,
    lengthHighEndM: 12.3,
    massConservativeT: 8.5,
    massHighEndT: 8.5,
    shoulderHeightM: 3.8,
    note: 'About 12 m long and 8–9 tonnes (comparable in scale to the Huincul predator Mapusaurus).',
  },
  {
    id: 'city-bus',
    name: 'Standard City Bus',
    subtitle: 'Single-Deck Transit Coach',
    lengthConservativeM: 12.0,
    lengthHighEndM: 12.0,
    massConservativeT: 13.0,
    massHighEndT: 13.0,
    shoulderHeightM: 3.2,
    note: 'A 12 m transit bus; roughly three buses parked bumper-to-bumper match the estimated length of Argentinosaurus.',
  },
  {
    id: 'argentinosaurus',
    name: 'Argentinosaurus huinculensis',
    subtitle: 'Titanosaurian Sauropod (Estimate)',
    lengthConservativeM: 33.0,
    lengthHighEndM: 39.7,
    massConservativeT: 73.0,
    massHighEndT: 83.0,
    shoulderHeightM: 7.3,
    note: 'Conservative studies place it at ~30–35 m and 65–80 tonnes; the 2013 digital mount model measured 39.7 m and ~83 tonnes. Silhouette is a generic reconstruction as neck and tail are unknown.',
    isFocal: true,
    isReconstructedOutline: true,
  },
  {
    id: 'blue-whale',
    name: 'Antarctic Blue Whale',
    subtitle: 'Balaenoptera musculus',
    lengthConservativeM: 30.0,
    lengthHighEndM: 30.0,
    massConservativeT: 155.0,
    massHighEndT: 155.0,
    shoulderHeightM: 4.5,
    note: 'Up to ~30 m long and can exceed 150 tonnes. Supported by buoyancy in water, the blue whale remains heavier than any known sauropod.',
  },
];

export const GROWTH_STAGES: GrowthStage[] = [
  {
    id: 'hatchling',
    stageLabel: 'Stage I · Hatchling',
    ageLabel: 'Year 0 (Emergence)',
    lengthM: 1.0,
    massKg: 5,
    massDisplay: '≤ 5 kg (~1 L egg volume)',
    lengthDisplay: '≤ 1.0 m',
    milestone: 'Precocial emergence from ~1-litre eggs',
    description:
      'Sauropods laid clutches of relatively small eggs. An Argentinosaurus egg was probably only about 1 litre in volume, producing a hatchling no longer than ~1 m and no heavier than ~5 kg—requiring an astonishing ~15,000-fold increase in mass to reach adulthood (estimates, Hallett & Wedel, 2016).',
    epistemicTag: 'estimate',
  },
  {
    id: 'juvenile-maturity',
    stageLabel: 'Stage II · Sexual Maturity',
    ageLabel: '8 – 10 Years',
    lengthM: 18.0,
    massKg: 22000,
    massDisplay: '~20 – 25 tonnes (rapid exponential growth)',
    lengthDisplay: '~16 – 20 m',
    milestone: 'Onset of reproduction before full skeletal size',
    description:
      'Life-history models (Hallett & Wedel, 2016) suggest giant sauropods reached sexual maturity around 8–10 years of age while still actively growing. Early reproduction and high fecundity helped populations recover quickly despite heavy juvenile predation.',
    epistemicTag: 'estimate',
  },
  {
    id: 'adult',
    stageLabel: 'Stage III · Full Somatic Size',
    ageLabel: '~20 Years',
    lengthM: 33.0,
    massKg: 73000,
    massDisplay: '65 – 80 tonnes (full size)',
    lengthDisplay: '30 – 35 m',
    milestone: 'Asymptotic adult dimensions achieved',
    description:
      'By roughly 20 years of age, Argentinosaurus attained full adult stature (~30–35 m length, 65–80 tonnes mass). At this scale, healthy adults were nearly invulnerable to solitary predators, though group hunting by giant theropods like Mapusaurus has been proposed as a hypothesis.',
    epistemicTag: 'estimate',
  },
  {
    id: 'senescence',
    stageLabel: 'Stage IV · Maximum Lifespan',
    ageLabel: '~30 Years',
    lengthM: 35.0,
    massKg: 76000,
    massDisplay: '65 – 80 tonnes',
    lengthDisplay: '30 – 35 m (up to ~39.7 m in high-end mount)',
    milestone: 'Estimated three-decade lifespan',
    description:
      'Hallett and Wedel (2016) estimate a typical lifespan of roughly 30 years for giant titanosaurs. Throughout adult life, its long neck and lack of chewing enabled high-intake, low-energy browsing across riverine conifer and fern canopies (Sander et al., 2011).',
    epistemicTag: 'estimate',
  },
];

export const ECOSYSTEM_ZONES: EcosystemZone[] = [
  {
    id: 'braided-channels',
    name: '01 · Braided River Channels',
    subtitle: 'Yellowish & Greenish Fluvial Sandstones',
    epistemicTag: 'fossil record',
    geologyAndSoil:
      'Cross-bedded yellowish and greenish sandstones deposited by shifting, silt-laden braided river channels across the Neuquén Basin.',
    flora: [
      'Aquatic & riverbank hornworts and liverworts (Vallati, 2001)',
      'Horsetails and semi-aquatic club-moss relatives (lycophytes)',
    ],
    fauna: [
      'Freshwater lungfish (ceratodontids) and armored gars (lepisosteids)',
      'Bottom-dwelling chelid side-necked turtles',
      'Crocodyliforms patrolling shallow silt bars',
    ],
    description:
      'The Huincul Formation was laid down by an expansive braided river system. Shifting sandbars and silt channels cut across the plain, preserving isolated giant bones like the 1987 fibula of Argentinosaurus in hard fluvial sandstone.',
  },
  {
    id: 'floodplain',
    name: '02 · Seasonal Alluvial Floodplain',
    subtitle: 'Overbank Siltstones & Paleosols',
    epistemicTag: 'fossil record',
    geologyAndSoil:
      'Calcic and argillic paleosols indicating a warm, strongly seasonal climate transitioning from semi-arid to subhumid (Lizzoli et al., 2021).',
    flora: [
      'Ground-cover ferns (gleicheniaceous and schizaeaceous spores)',
      'Early angiosperms (flowering plants) colonizing disturbed silt banks',
      'Herbaceous lycopods and bryophytes in wet depressions',
    ],
    fauna: [
      'Rebbachisaurid sauropods (Cathartesaura, Limaysaurus, Astigmasaura)',
      'Iguanodontian ornithopods and fast-running noasaurids (Huinculsaurus)',
      'Paravian theropod Overoraptor and diverse lizards & sphenodonts',
    ],
    description:
      'Between main channels lay broad floodplains subject to seasonal wet-dry cycles. Note: not every animal recovered from the Huincul Formation necessarily lived at the exact same moment or micro-locality.',
  },
  {
    id: 'river-forest',
    name: '03 · River-Side Gallery Forest',
    subtitle: 'Conifer & Tree-Fern Canopy Corridor',
    epistemicTag: 'inferred',
    geologyAndSoil:
      'Moist riparian corridor buffered by shallow water tables along permanent braided river trunks.',
    flora: [
      'Tall conifers (Araucariaceae and Cheirolepidiaceae pollen)',
      'Understory tree ferns and lush filicopsid stands',
      'Cycads and shrubby gnetophytes along forest margins',
    ],
    fauna: [
      'Argentinosaurus huinculensis browsing upper and mid-level canopies',
      'Co-occurring titanosaurs (Choconsaurus, Bustingorrytitan, Chucarosaurus)',
      'Giant carcharodontosaurid Mapusaurus roseae and abelisaurids (Skorpiovenator, Ilokelesia, Tralkasaurus)',
    ],
    description:
      'Palynological spectra (Vallati, 2001) and paleosol data suggest denser gallery forests of conifers and tree ferns clustered along river courses (inferred), providing the massive plant biomass required to sustain multiple titanosaur taxa.',
  },
  {
    id: 'open-plain',
    name: '04 · Drier Interfluve Scrub Plain',
    subtitle: 'Sun-Baked Semi-Arid Boundary Belt',
    epistemicTag: 'inferred',
    geologyAndSoil:
      'Well-drained, sun-baked interfluve soils situated near the climatic boundary between a warm-humid belt and a hot-arid belt (Lizzoli et al., 2021).',
    flora: [
      'Drought-tolerant gnetophytes (ephedroid pollen)',
      'Xeric Cheirolepidiaceae conifers (Classopollis pollen)',
      'Low open scrub and seasonal dry-season ground cover',
    ],
    fauna: [
      'Migrating titanosaur herds crossing between river corridors',
      'Medium-sized theropods (Gualicho shinyae, Aoniraptor libertatem)',
      'Burrowing sphenodontians and terrestrial squamates',
    ],
    description:
      'Farther from the active river channels, moisture dropped sharply into sun-baked, seasonally arid scrub plains—explaining why the Huincul ecosystem combined lush riparian forest spores with arid-adapted gnetophyte and conifer pollen.',
  },
];

export const PHYLOGENETIC_STUDIES: PhylogeneticStudy[] = [
  {
    year: 1993,
    authors: 'Bonaparte & Coria (1993)',
    placementTitle: '“Andesauridae” (Basal Titanosaur Grouping)',
    cladePath: ['Sauropoda', 'Titanosauria', '“Andesauridae”', 'Argentinosaurus'],
    summary:
      'In the original description, Bonaparte and Coria grouped Argentinosaurus alongside Andesaurus and Epachthosaurus in “Andesauridae” on the basis of retained hyposphene–hypantrum articulations. That family is now disused as paraphyletic.',
    epistemicTag: 'debated',
  },
  {
    year: 2004,
    authors: 'Upchurch, Barrett & Dodson (2004)',
    placementTitle: 'Basal Titanosaur Outside Lithostrotia',
    cladePath: ['Sauropoda', 'Macronaria', 'Titanosauria (Basal)', 'Argentinosaurus'],
    summary:
      'Comprehensive cladistic analysis recovered Argentinosaurus as a non-lithostrotian basal titanosaur—more derived than brachiosaurids, but outside the derived clade containing Saltasaurus.',
    epistemicTag: 'debated',
  },
  {
    year: 2017,
    authors: 'Carballido et al. (2017)',
    placementTitle: 'Lognkosauria · Sister Taxon to Patagotitan',
    cladePath: ['Titanosauria', 'Lognkosauria', 'Patagotitan + Argentinosaurus'],
    summary:
      'With the description of the more complete Patagotitan mayorum, Carballido et al. recovered Argentinosaurus nested inside the giant clade Lognkosauria as the direct sister taxon of Patagotitan.',
    epistemicTag: 'debated',
  },
  {
    year: 2018,
    authors: 'Sallam et al. (2018)',
    placementTitle: 'Dual Topologies: Basal Titanosaur or Epachthosaurus Relative',
    cladePath: ['Titanosauria', 'Basal Grade / Epachthosaurus Clade', 'Argentinosaurus'],
    summary:
      'Testing different character weightings produced two competing placements: either as a basal titanosaur outside Lithostrotia, or nested in a lineage alongside Epachthosaurus—highlighting sensitivity to missing cranial and caudal data.',
    epistemicTag: 'debated',
  },
  {
    year: 2019,
    authors: 'González Riga et al. (2019) & Silva Junior et al. (2019)',
    placementTitle: 'Colossosauria > Lognkosauria vs Non-Titanosaurian Somphospondylan',
    cladePath: ['Somphospondyli', 'Colossosauria / Lognkosauria', 'Argentinosaurus'],
    summary:
      'González Riga et al. placed Argentinosaurus within Lognkosauria inside the clade Colossosauria; the same year, Silva Junior et al. recovered Lognkosauria just outside Titanosauria altogether.',
    epistemicTag: 'debated',
  },
];

export const RELATIVE_TAXA: RelativeTaxon[] = [
  {
    name: 'Patagotitan mayorum',
    note: 'A rival for largest known land animal; known from multiple individuals with a 2.38 m femur.',
  },
  {
    name: 'Puertasaurus reuili',
    note: 'Patagonian giant possessing the widest known anterior dorsal vertebra (168 cm wide).',
  },
  {
    name: 'Futalognkosaurus dukei',
    note: 'More complete Patagonian lognkosaurian frequently used as a template to scale Argentinosaurus.',
  },
  {
    name: 'Dreadnoughtus schrani',
    note: 'Exceptionally complete Late Cretaceous titanosaur; its initial high mass estimate was later revised downward.',
  },
  {
    name: 'Saltasaurus loricatus',
    note: 'Smaller, derived armoured titanosaur preserving osteoderms and more complete skeletal anatomy.',
  },
  {
    name: 'Epachthosaurus sciuttoi',
    note: 'Articulated Patagonian titanosaur sharing dorsal vertebral traits with Argentinosaurus in several studies.',
  },
  {
    name: 'Andesaurus delgadoi',
    note: 'Basal titanosaur from the underlying Candeleros Formation, historically grouped with Argentinosaurus.',
  },
  {
    name: 'Mendozasaurus neguyelap',
    note: 'Early lognkosaurian from Mendoza Province that clarified neck and limb proportions of the clade.',
  },
  {
    name: 'Choconsaurus baileywillisi',
    note: 'Contemporaneous basal titanosaur discovered within the same Huincul Formation.',
  },
];

export const MYTH_CARDS: MythCard[] = [
  {
    id: 'myth-01',
    number: '01',
    myth: '“Argentinosaurus is the biggest dinosaur ever, no question.”',
    reality:
      'It is among the largest known land animals, but rivals like Patagotitan and Puertasaurus are actively debated, and the modern blue whale (over 150 tonnes) is still heavier than any known sauropod.',
    epistemicNote: 'Status: Debated among titanosaurs',
  },
  {
    id: 'myth-02',
    number: '02',
    myth: '“We know exactly how big it was.”',
    reality:
      'No. Its size is scaled up from only a handful of back vertebrae, a partial sacrum, ribs, and a fibula. Consequently, published estimates range from about 30 to nearly 40 m in length and about 50 to 100 tonnes in mass.',
    epistemicNote: 'Status: All dimensions are estimates',
  },
  {
    id: 'myth-03',
    number: '03',
    myth: '“Scientists have its skull.”',
    reality:
      'No. The skull, neck, tail, and forelimbs of Argentinosaurus have never been found. Every full-body mount or illustration reconstructs those regions from related titanosaurs.',
    epistemicNote: 'Status: Unpreserved anatomy inferred from relatives',
  },
  {
    id: 'myth-04',
    number: '04',
    myth: '“It lived in a steamy jungle swamp.”',
    reality:
      'Geological and paleosol evidence from the Huincul Formation points to a braided-river plain with a strongly seasonal, semi-arid to subhumid climate, where denser gallery forest grew mainly along the river courses.',
    epistemicNote: 'Status: Sedimentological & palynological evidence',
  },
  {
    id: 'myth-05',
    number: '05',
    myth: '“It lived at the very end of the dinosaur age.”',
    reality:
      'No. It lived about 107 million years ago according to a 2026 ash-bed re-dating (or ~97–94 Ma in older studies)—roughly 30 to 40 million years before the end-Cretaceous asteroid impact at 66 Ma.',
    epistemicNote: 'Status: Early Cretaceous (Albian, 2026 study)',
  },
  {
    id: 'myth-06',
    number: '06',
    myth: '“It could outrun predators.”',
    reality:
      'A 2013 multibody computer simulation calculated a top walking speed of only about 7 km/h (~4.3 mph). Enormous adult body size and herd presence were probably its primary defences.',
    epistemicNote: 'Status: Biomechanical estimate & inferred defence',
  },
];

export const GALLERY_PLATES: GalleryPlate[] = [
  {
    id: 'plate-01',
    src: '/assets/gallery-01.jpg',
    plateNumber: 'PLATE I',
    title: 'Crossing the Braided Silt Channels',
    caption:
      'Artistic reconstruction of an adult Argentinosaurus wading across shallow, anastomosing silt bars of the Huincul river plain at dawn. Colours are artistic; real skin colour is unknown.',
    floraNote: 'Foreground: Equisetites & river-margin hornworts · Horizon: Araucariaceae gallery forest',
  },
  {
    id: 'plate-02',
    src: '/assets/gallery-02.jpg',
    plateNumber: 'PLATE II',
    title: 'High-Canopy Browsing Along the Riparian Margin',
    caption:
      'Reconstructed ~7.3 m shoulder elevation allowing effortless cropping of conifer foliage without chewing (Sander et al., 2011). Neck and skull proportions are inferred from relatives.',
    floraNote: 'Canopy: Araucarian conifers & tree ferns (inferred riparian corridor)',
  },
  {
    id: 'plate-03',
    src: '/assets/gallery-03.jpg',
    plateNumber: 'PLATE III',
    title: 'Holotype Dorsal Vertebra (MCF-PVPH-1) Scale Study',
    caption:
      'Comparative scale plate showing a ~1.6 m tall reconstructed anterior dorsal vertebra beside an adult human observer (1.7 m), highlighting internal camellate air chambers (4–6 cm).',
    floraNote: 'Locality: Plaza Huincul sandstone outcrop · Museo Carmen Funes collection',
  },
  {
    id: 'plate-04',
    src: '/assets/gallery-04.jpg',
    plateNumber: 'PLATE IV',
    title: 'Dry-Season Dust Haze on the Interfluve Plain',
    caption:
      'Leaving the subhumid river corridor for the seasonally arid scrub plain (Lizzoli et al., 2021). Pillar-like hindlimbs (1.55 m holotype fibula) kick up warm ochre silt.',
    floraNote: 'Scrub: Ephedroid gnetophytes & drought-adapted Cheirolepidiaceae conifers',
  },
  {
    id: 'plate-05',
    src: '/assets/gallery-05.jpg',
    plateNumber: 'PLATE V',
    title: 'Shadow of Mapusaurus (Hypothetical Encounter)',
    caption:
      'The giant carcharodontosaurid Mapusaurus coexisted in the Huincul Formation; finding at least seven individuals together raised the hypothesis of group hunting, though direct evidence is lacking.',
    floraNote: 'Setting: Alluvial floodplain margin · Status: Hypothesis only',
  },
  {
    id: 'plate-06',
    src: '/assets/gallery-06.jpg',
    plateNumber: 'PLATE VI',
    title: 'Composite Skeletal Mount & Missing Elements',
    caption:
      'Diagrammatic study contrasting the preserved dorsal, sacral, rib, and fibular fossils against the reconstructed neck, skull, forelimbs, and tail borrowed from related titanosaurs.',
    floraNote: 'Reference: 2013 laser-scanned digital mount (Sellers et al., 2013)',
  },
];

export const FAST_FACTS: string[] = [
  'A rancher named Guillermo Heredia first mistook its giant fossilized bone for a petrified log in 1987 near Plaza Huincul.',
  'It is known from only a handful of bones—back vertebrae, a partial sacrum, rib pieces, and a fibula—with no skull, neck, tail, or forelimbs ever found.',
  'One reconstructed anterior back vertebra measured about 1.6 metres tall and 1.3 metres wide.',
  'Despite their immense strength, its vertebrae were riddled with 4–6 cm air-filled chambers connected to an inferred bird-like air-sac system.',
  'Hatchlings emerging from ~1-litre eggs were probably no longer than about 1 metre and weighed no more than about 5 kg (estimate).',
  'Published adult body mass estimates span from roughly 50 to 100 tonnes, with recent studies converging around 65–80 tonnes (estimate).',
  'A 2013 multibody computer simulation calculated its top walking speed at only about 7 km/h (~4.3 mph) (estimate).',
  'In 2026, radiometric zircon dating of volcanic ash beds re-dated its rock layer (the Huincul Formation) to ~107 million years ago—about 10 million years older than previously thought.',
];

export const SCIENTIFIC_SOURCES: string[] = [
  'Bonaparte & Coria (1993) — Un nuevo y gigantesco saurópodo titanosaurio de la Formación Río Limay (Albiano–Cenomaniano) de la Provincia del Neuquén, Argentina. Ameghiniana.',
  'Vallati (2001) — Bioestratigrafía (palinología) del Cretácico temprano y medio en Patagonia septentrional.',
  'Mazzetta, Christiansen & Fariña (2004) — Giants and bizarres: body size of some southern South American Cretaceous dinosaurs. Historical Biology.',
  'Novas & Ezcurra (2006) — Reinterpretation of the dorsal vertebral series of Argentinosaurus huinculensis.',
  'Coria & Currie (2006) — A new carcharodontosaurid (Dinosauria, Theropoda) from the Upper Cretaceous of Argentina [Mapusaurus roseae]. Geodiversitas.',
  'Calvo et al. (2008) — A new giganticigh-browsing titanosaurian sauropod [Futalognkosaurus] and ecosystem reconstruction.',
  'Salgado & Powell (2010) — Osteology and vertebral homologies of South American titanosaurian sauropods.',
  'Sander et al. (2011) — Biology of the sauropod dinosaurs: the evolution of gigantism. Biological Reviews.',
  'Sellers et al. (2013) — March of the Titans: The Locomotor Capabilities of Sauropod Dinosaurs. PLOS ONE.',
  'Rainoldi et al. (2015) — Mineralogical and sedimentological characterization of the Huincul Formation, Neuquén Basin.',
  'Hallett & Wedel (2016) — The Sauropod Dinosaurs: Life in the Age of Giants. Johns Hopkins University Press.',
  'Carballido et al. (2017) — A new giant titanosaur sheds light on body mass evolution among sauropod dinosaurs [Patagotitan]. Proceedings of the Royal Society B.',
  'Paul (2019) — Determining the largest known land animal: A critical comparison of differing methods for restoring the volume and mass of extinct animals. Annals of the Carnegie Museum.',
  'Campione & Evans (2020) — The accuracy and precision of body mass estimation in non-avian dinosaurs. Biological Reviews.',
  'Lizzoli, Raigemborn & Varela (2021) — Paleosols and paleoclimate of the Huincul Formation (Neuquén Basin, Patagonia): seasonal semi-arid to subhumid transition.',
  'Paul & Larramendi (2023) — Body mass estimate revisions of giant titanosaurian sauropods.',
  'Maniel et al. (2026) — Detrital and ash-bed zircon U–Pb geochronology re-dating the Huincul Formation to the early Albian (~106–107 Ma).',
  'Museo Municipal Carmen Funes (Plaza Huincul, Neuquén, Argentina) — Repository of holotype MCF-PVPH-1.',
  'Museo de La Plata (La Plata, Argentina) — Repository of referred femur MLP-DP 46-VIII-21-3.',
];
