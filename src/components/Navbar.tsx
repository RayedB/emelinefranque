import content from '../data/content.json';

export default function Navbar() {
  return (
    <nav className="top-0 left-0 right-0 z-50 bg-transparent px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="text-white text-xl font-semibold tracking-[0.2em] letter-spacing-wide">
          {content.brand.name}
        </div>
      </div>
    </nav>
  );
} 