export default function Footer() {
  return (
    <footer className="w-full border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Unified Connector</p>
        <p className="hidden sm:block">Foundational platform for the Kavia ecosystem</p>
      </div>
    </footer>
  );
}
