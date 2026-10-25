import {
  PiArrowUpRight,
  PiArrowRight,
  PiArrowLeft,
  PiCheck,
  PiPhone,
  PiWhatsappLogo,
  PiMapPin,
  PiClock,
  PiSparkle,
  PiShieldCheck,
  PiCalendarBlank,
  PiCar,
  PiDrop,
  PiArmchair,
  PiDisc,
  PiShield,
  PiWrench,
  PiHouse,
  PiSquaresFour,
  PiStack,
  PiList,
  PiX,
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiPause,
  PiPlay,
  PiQuotes,
} from 'react-icons/pi';

const icons = {
  arrow: PiArrowUpRight,
  right: PiArrowRight,
  left: PiArrowLeft,
  check: PiCheck,
  phone: PiPhone,
  whatsapp: PiWhatsappLogo,
  map: PiMapPin,
  clock: PiClock,
  sparkle: PiSparkle,
  shield: PiShieldCheck,
  calendar: PiCalendarBlank,
  car: PiCar,
  wash: PiDrop,
  interior: PiArmchair,
  polish: PiDisc,
  ceramic: PiShield,
  care: PiWrench,
  home: PiHouse,
  services: PiSquaresFour,
  packages: PiStack,
  book: PiCalendarBlank,
  menu: PiList,
  close: PiX,
  down: PiCaretDown,
  previous: PiCaretLeft,
  next: PiCaretRight,
  pause: PiPause,
  play: PiPlay,
  quote: PiQuotes,
};

export type IconName = keyof typeof icons;

export default function Icon({
  name,
  className = '',
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name];
  return (
    <Component aria-hidden="true" focusable="false" className={className} />
  );
}
