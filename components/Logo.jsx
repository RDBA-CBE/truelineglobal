import Image from 'next/image';

export default function Logo({ inverse = false }) {
  return (
    <div
      className={`brand ${inverse ? 'brand--inverse' : ''}`}
      aria-label="Trueline Global Trading"
    >
      <Image
        src="/images/trueline-logo-ftr.webp"
        alt="Trueline Global Trading"
        width={143}
        height={100}
        className="brand-logo"
        priority
      />
    </div>
  );
}