import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "about", label: "О программе" },
  { id: "how", label: "Инструкция" },
  { id: "gallery", label: "Скриншоты" },
  { id: "contacts", label: "Контакты" },
  { id: "developer", label: "Разработчик" },
];

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg shimmer-btn flex items-center justify-center">
            <Icon name="Play" size={16} className="text-white" />
          </div>
          <span className="font-montserrat text-lg gradient-text font-black">VideoCraft</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="nav-link text-sm text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="hidden md:flex shimmer-btn text-white text-sm font-semibold px-5 py-2 rounded-full font-montserrat"
          onClick={() => scrollTo("contacts")}
        >
          Скачать бесплатно
        </button>

        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-white/70 hover:text-white py-1">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
