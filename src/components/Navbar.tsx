import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="top-0 left-0 right-0 z-50 bg-transparent px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="overflow-hidden" style={{ height: '82px' }}>
          <Image
            src="/images/logo.png"
            alt="Emeline Franque"
            width={240}
            height={240}
            style={{ marginTop: '-79px' }}
            priority
          />
        </div>
      </div>
    </nav>
  );
}