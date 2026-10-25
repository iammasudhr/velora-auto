export type ServiceIcon =
  | 'wash'
  | 'interior'
  | 'polish'
  | 'ceramic'
  | 'shield'
  | 'care';

export const services = [
  {
    slug: 'signature-wash',
    name: 'Signature wash',
    short: 'A better kind of clean.',
    category: 'Refresh',
    icon: 'wash' as ServiceIcon,
    image: '/images/wash.webp',
    from: 1499,
    time: '1–2 hours',
    description:
      'A deliberate exterior refresh, from the first rinse to the final wipe. For daily drivers that deserve more than a quick wash.',
    includes: [
      'Pre-rinse and foam pre-wash',
      'Contact wash with dedicated wash media',
      'Wheel-face and tyre cleaning',
      'Careful microfibre drying',
      'Exterior glass cleaning and tyre dressing',
    ],
    benefit: 'Refresh the finish without skipping the small details.',
    suitable: 'Routine upkeep on maintained paintwork.',
    excludes:
      'Engine bay, underbody, tar removal and paint correction are not included.',
    aftercare:
      'Avoid dry wiping dusty paint. Ask for the right wash interval for your driving conditions.',
  },
  {
    slug: 'interior-detailing',
    name: 'Interior detailing',
    short: 'A fresh perspective inside.',
    category: 'Restore',
    icon: 'interior' as ServiceIcon,
    image: '/images/interior.webp',
    from: 6999,
    time: '4–6 hours',
    description:
      'Focused cleaning for the surfaces you touch every day, with a material-aware approach to fabric, leather, trim and glass.',
    includes: [
      'Interior inspection and surface assessment',
      'Vacuum seats, carpets and accessible crevices',
      'Fabric or leather cleaning suited to material',
      'Dashboard, door panels and console detailing',
      'Interior glass cleaning and final inspection',
    ],
    benefit: 'Make every journey feel a little fresher.',
    suitable: 'Daily-use cabins, seasonal refreshes and used-car handovers.',
    excludes:
      'Permanent stain removal, mould remediation and disassembly are not guaranteed or included.',
    aftercare:
      'Allow any damp fabric to dry fully. Discuss ventilation and drying time before collection.',
  },
  {
    slug: 'paint-correction',
    name: 'Paint correction',
    short: 'Let the finish speak.',
    category: 'Restore',
    icon: 'polish' as ServiceIcon,
    image: '/images/hero-poster.webp',
    from: 11999,
    time: '1–2 days',
    description:
      'An inspection-led polishing process to refine suitable paintwork and reduce the appearance of light swirls and dullness.',
    includes: [
      'Paint-condition assessment',
      'Wash and surface decontamination',
      'Test spot to agree a suitable approach',
      'Machine polishing within the agreed scope',
      'Finish inspection under directional lighting',
    ],
    benefit: 'Bring depth and clarity back to your paint.',
    suitable:
      'Paintwork with light-to-moderate cosmetic defects, subject to inspection.',
    excludes:
      'Deep scratches, chips, repainting and complete defect removal are outside the standard scope.',
    aftercare:
      'Use careful wash techniques and discuss a suitable protection layer after correction.',
  },
  {
    slug: 'ceramic-coating',
    name: 'Ceramic coating',
    short: 'Gloss, with a purpose.',
    category: 'Protect',
    icon: 'ceramic' as ServiceIcon,
    image: '/images/ceramic.webp',
    from: 24999,
    time: '2–3 days',
    description:
      'A prepared surface and a carefully applied coating, chosen around your car, its condition and how you use it.',
    includes: [
      'Paint assessment and preparation plan',
      'Wash and chemical decontamination',
      'Agreed paint refinement before application',
      'Coating application to agreed painted surfaces',
      'Cure guidance and maintenance handover',
    ],
    benefit: 'Support easier maintenance and a refined finish.',
    suitable:
      'Owners looking for a prepared finish and a structured care routine.',
    excludes:
      'Coatings are not scratch-proof or a substitute for impact protection. Durability varies by product and upkeep.',
    aftercare:
      'Follow the selected product’s cure schedule. Confirm the first-wash date with the studio.',
  },
  {
    slug: 'paint-protection-film',
    name: 'Paint protection film',
    short: 'Protection you barely see.',
    category: 'Protect',
    icon: 'shield' as ServiceIcon,
    image: '/images/ppf.webp',
    from: 69999,
    time: '3–5 days',
    description:
      'Transparent protective film for selected panels or an agreed full-body scope, with attention to fitment, edges and finish.',
    includes: [
      'Vehicle and panel inspection',
      'Coverage and film selection discussion',
      'Surface preparation',
      'Film installation on agreed panels',
      'Edge inspection and care handover',
    ],
    benefit: 'Add a sacrificial barrier to the finish you love.',
    suitable:
      'New-car owners and drivers seeking additional protection on exposed panels.',
    excludes:
      'Pricing varies with film, coverage and vehicle. Film does not prevent every chip, scratch or impact.',
    aftercare:
      'Follow the installer’s wash and settling guidance. Product-specific warranty terms must be provided in writing.',
  },
  {
    slug: 'maintenance-care',
    name: 'Maintenance care',
    short: 'Keep the good feeling going.',
    category: 'Maintain',
    icon: 'care' as ServiceIcon,
    image: '/images/wash.webp',
    from: 2499,
    time: '2–3 hours',
    description:
      'A considered upkeep visit for coated, filmed or well-maintained cars, with products selected for the existing surface treatment.',
    includes: [
      'Existing coating or film check',
      'Surface-appropriate exterior wash',
      'Light cabin vacuum and wipe-down',
      'Glass and wheel-face refresh',
      'Care recommendations for the next visit',
    ],
    benefit: 'A simple rhythm for a consistently cared-for car.',
    suitable:
      'Vehicles with existing protection or a regular detailing routine.',
    excludes:
      'Coating repairs, film replacement and corrective polishing require a separate assessment.',
    aftercare:
      'Book visits around how and where you drive, rather than a one-size-fits-all schedule.',
  },
];

export const serviceCategories = [
  'All',
  'Refresh',
  'Restore',
  'Protect',
  'Maintain',
];

export const servicePage = {
  eyebrow: 'THE CARE COLLECTION',
  title: 'A service for every surface.',
  description:
    'Refresh, restore, protect. Choose a starting point and we’ll shape the scope around your car.',
  checklistTitle: 'Every detail, accounted for.',
  notesTitle: 'Before you book',
  requestLabel: 'Discuss this service',
  relatedTitle: 'Complete the care plan.',
};
