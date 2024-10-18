import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/codeberry-logo.png"
      alt="Codeberry Logo"
      width={40}
      height={40}
    />
  );
}