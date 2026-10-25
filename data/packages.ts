export const vehicleClasses = [
  { id: 'hatchback', name: 'Hatchback', factor: 1 },
  { id: 'sedan', name: 'Sedan', factor: 1.15 },
  { id: 'suv', name: 'SUV / crossover', factor: 1.3 },
] as const;

export type VehicleClass = (typeof vehicleClasses)[number]['id'];

export const packages = [
  {
    id: 'refresh',
    name: 'The refresh',
    tag: 'EVERYDAY CARE',
    service: 'signature-wash',
    base: 1499,
    featured: false,
    description: 'A thoughtful reset for the everyday drive.',
    items: [
      'Foam pre-wash & contact wash',
      'Wheel-face and tyre clean',
      'Glass finish & careful drying',
    ],
    time: '1–2 hours',
  },
  {
    id: 'reset',
    name: 'The complete reset',
    tag: 'INSIDE + OUT',
    service: 'interior-detailing',
    base: 7999,
    featured: true,
    description: 'Give your cabin and exterior a fresh start.',
    items: [
      'Signature exterior wash',
      'Material-aware cabin detailing',
      'Seats, carpets, trim & glass',
    ],
    time: 'One studio day',
  },
  {
    id: 'protect',
    name: 'The gloss ritual',
    tag: 'CERAMIC CARE',
    service: 'ceramic-coating',
    base: 24999,
    featured: false,
    description: 'A prepared finish, with protection to follow.',
    items: [
      'Wash & decontamination',
      'Agreed paint refinement',
      'Ceramic application & care guide',
    ],
    time: '2–3 days',
  },
];

export const packagePrice = (base: number, vehicle: VehicleClass): number =>
  Math.round(
    base * (vehicleClasses.find((c) => c.id === vehicle)?.factor ?? 1),
  );

export const money = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const pricing = {
  eyebrow: 'CLEAR STARTING POINTS',
  title: 'Good care. No guesswork.',
  description:
    'Choose your vehicle size to explore starting prices. Your final scope and quote are confirmed after studio inspection.',
  note: 'Starting prices shown by vehicle category. Final price, applicable taxes, materials and slot availability are confirmed after inspection. No online payment is collected.',
  ppfTitle: 'Considering paint protection film?',
  ppfText:
    'Choose your coverage, film and finish with the studio. PPF is tailored with a vehicle-specific quotation.',
  ppfCta: 'Explore PPF',
  addons: [
    'Wheel deep cleaning',
    'Glass treatment',
    'Trim care',
    'Additional paint correction',
  ],
};
