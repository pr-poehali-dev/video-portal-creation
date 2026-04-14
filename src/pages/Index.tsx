import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SCREENSHOTS = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/cd17ca47-bd44-44b1-8c11-7cd6e616512a/files/b4969bb4-be4b-440f-937f-2055e1a9b7a8.jpg",
    title: "Монтажный стол",
    category: "editing",
    desc: "Многодорожечный монтаж с таймлайном"
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/cd17ca47-bd44-44b1-8c11-7cd6e616512a/files/d9b4e32e-f4f0-4d18-a0fb-7117be3b4fd8.jpg",
    title: "Библиотека эффектов",
    category: "effects",
    desc: "500+ фильтров и эффектов"
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/cd17ca47-bd44-44b1-8c11-7cd6e616512a/files/b63d906e-7458-4850-85b2-3812f5093a3d.jpg",
    title: "Экспорт видео",
    category: "export",
    desc: "Быстрый рендер в любом формате"
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/cd17ca47-bd44-44b1-8c11-7cd6e616512a/files/6f6b672e-5aec-46b3-b3a2-0338a62bb01f.jpg",
    title: "ИИ-стабилизация",
    category: "ai",
    desc: "Умное отслеживание объектов"
  },
];

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "editing", label: "Монтаж" },
  { id: "effects", label: "Эффекты" },
  { id: "export", label: "Экспорт" },
  { id: "ai", label: "ИИ" },
];

const FEATURES = [
  { icon: "Zap", title: "Быстрый рендер", desc: "GPU-ускорение делает экспорт в 10× быстрее конкурентов", color: "from-purple-500 to-blue-500" },
  { icon: "Wand2", title: "500+ эффектов", desc: "Фильтры, переходы, оверлеи — всё для профессионального результата", color: "from-blue-500 to-cyan-500" },
  { icon: "Brain", title: "ИИ-обработка", desc: "Автостабилизация, шумоподавление и улучшение качества за один клик", color: "from-cyan-500 to-teal-500" },
  { icon: "Layers", title: "Многодорожечность", desc: "Неограниченное количество видео и аудио дорожек в проекте", color: "from-pink-500 to-purple-500" },
  { icon: "Globe", title: "Все форматы", desc: "MP4, AVI, MOV, MKV, WebM — импорт и экспорт без конвертации", color: "from-orange-500 to-pink-500" },
  { icon: "Shield", title: "Без подписок", desc: "Одна покупка — бессрочная лицензия, обновления включены", color: "from-green-500 to-cyan-500" },
];

const STEPS = [
  { num: "01", title: "Скачайте программу", desc: "Установка занимает менее 2 минут" },
  { num: "02", title: "Импортируйте видео", desc: "Перетащите файлы или выберите с диска" },
  { num: "03", title: "Обработайте", desc: "Монтаж, эффекты, цветокоррекция" },
  { num: "04", title: "Экспортируйте", desc: "Готово! Сохраните в нужном формате" },
];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const filtered = activeFilter === "all"
    ? SCREENSHOTS
    : SCREENSHOTS.filter(s => s.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const lightboxItem = lightbox !== null ? SCREENSHOTS.find(s => s.id === lightbox) : null;

  return (
    <div className="min-h-screen gradient-bg grid-overlay text-white font-golos">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg shimmer-btn flex items-center justify-center">
              <Icon name="Play" size={16} className="text-white" />
            </div>
            <span className="font-montserrat text-lg gradient-text font-black">VidarPro</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "about", label: "О программе" },
              { id: "how", label: "Инструкция" },
              { id: "gallery", label: "Скриншоты" },
              { id: "contacts", label: "Контакты" },
              { id: "developer", label: "Разработчик" },
            ].map(item => (
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
            {[
              { id: "about", label: "О программе" },
              { id: "how", label: "Инструкция" },
              { id: "gallery", label: "Скриншоты" },
              { id: "contacts", label: "Контакты" },
              { id: "developer", label: "Разработчик" },
            ].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-white/70 hover:text-white py-1">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse pointer-events-none" style={{animationDelay: '1s'}} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-purple-500/10 animate-rotate-slow" />
          <div className="absolute w-[800px] h-[800px] rounded-full border border-blue-500/5" style={{animation: 'rotate-slow 30s linear infinite reverse'}} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-cyan-400 mb-8 border border-cyan-400/20 animate-fade-in-scale">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Версия 3.0 — Теперь с ИИ-обработкой
          </div>

          <h1 className="font-montserrat font-black text-5xl md:text-7xl leading-tight mb-6 animate-slide-up">
            Обрабатывай видео
            <br />
            <span className="gradient-text">как профессионал</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            Мощный видеоредактор с ИИ-функциями, 500+ эффектами и молниеносным рендером.
            Создавай контент, который запоминается.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <button className="shimmer-btn text-white font-montserrat font-bold px-8 py-4 rounded-2xl text-lg animate-pulse-glow hover:scale-105 transition-transform w-full sm:w-auto">
              Скачать бесплатно
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="flex items-center gap-2 glass px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
            >
              <Icon name="Play" size={20} className="text-cyan-400" />
              Смотреть скриншоты
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/5">
            {[
              { val: "500+", label: "Эффектов" },
              { val: "10×", label: "Быстрее рендер" },
              { val: "50K+", label: "Пользователей" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-montserrat font-black text-3xl md:text-4xl gradient-text">{stat.val}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs">Листайте вниз</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* О ПРОГРАММЕ */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={addRef} className="reveal text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">О программе</span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3 mb-4">
              Всё что нужно для <span className="gradient-text">создания видео</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">VidarPro объединяет профессиональные инструменты в интуитивно понятном интерфейсе</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={addRef}
                className="reveal glass glass-hover rounded-2xl p-6"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <Icon name={f.icon} size={22} className="text-white" fallback="Star" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ИНСТРУКЦИЯ */}
      <section id="how" className="py-24 relative">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div ref={addRef} className="reveal text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Инструкция</span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3">
              Начни за <span className="gradient-text-warm">4 шага</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} ref={addRef} className="reveal glass glass-hover rounded-2xl p-8 flex gap-6" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="shrink-0">
                  <span className="font-montserrat font-black text-5xl gradient-text opacity-40">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={addRef} className="reveal mt-12 glass rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                <Icon name="Lightbulb" size={20} className="text-purple-400" />
              </div>
              <div className="w-full">
                <h4 className="font-montserrat font-bold mb-4">Горячие клавиши</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/60">
                  {[
                    ["Space", "Пауза/воспроизведение"],
                    ["Ctrl+Z", "Отмена"],
                    ["Ctrl+E", "Экспорт"],
                    ["Ctrl+D", "Дублировать клип"],
                    ["S", "Разрезать клип"],
                    ["Delete", "Удалить клип"],
                  ].map(([key, desc], j) => (
                    <div key={j} className="flex items-center gap-2">
                      <kbd className="glass px-2 py-1 rounded text-xs text-cyan-400 border border-cyan-400/20 font-mono whitespace-nowrap">{key}</kbd>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={addRef} className="reveal text-center mb-10">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Скриншоты</span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3 mb-4">
              Интерфейс <span className="gradient-text">в деталях</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">Нажмите на скриншот для увеличения</p>
          </div>

          <div ref={addRef} className="reveal flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`filter-btn px-5 py-2 rounded-full text-sm font-semibold border ${
                  activeFilter === cat.id
                    ? "active border-transparent"
                    : "glass border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((shot, i) => (
              <div
                key={shot.id}
                ref={addRef}
                className="reveal group cursor-pointer glass rounded-2xl overflow-hidden glass-hover"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setLightbox(shot.id)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white font-semibold">{shot.title}</span>
                    <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
                      <Icon name="ZoomIn" size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat font-bold mb-1">{shot.title}</h3>
                  <p className="text-white/50 text-sm">{shot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={addRef} className="reveal glass rounded-3xl p-10 md:p-16 text-center border border-purple-500/20 glow-purple relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 pointer-events-none" />
            <div className="relative">
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Контакты</span>
              <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3 mb-4">
                Скачай <span className="gradient-text">бесплатно</span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-10 text-lg">
                Попробуй VidarPro прямо сейчас. Без подписки, без ограничений по времени.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="shimmer-btn text-white font-montserrat font-bold px-8 py-4 rounded-2xl text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                  <Icon name="Monitor" size={20} />
                  Скачать для Windows
                </button>
                <button className="glass px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-white border border-white/10">
                  <Icon name="Apple" size={20} className="text-white/70" />
                  Для macOS
                </button>
              </div>

              <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  { icon: "Mail", label: "Email", value: "support@vidarpro.ru" },
                  { icon: "MessageCircle", label: "Telegram", value: "@vidarpro" },
                  { icon: "Globe", label: "Сайт", value: "vidarpro.ru" },
                ].map((contact, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                      <Icon name={contact.icon} size={18} className="text-cyan-400" fallback="Circle" />
                    </div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">{contact.label}</span>
                    <span className="text-white/80 text-sm font-medium">{contact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* О РАЗРАБОТЧИКЕ */}
      <section id="developer" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={addRef} className="reveal text-center mb-12">
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest">О разработчике</span>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl mt-3">
              Кто создал <span className="gradient-text-warm">VidarPro</span>
            </h2>
          </div>

          <div ref={addRef} className="reveal glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center glow-purple">
                <Icon name="User" size={48} className="text-white/80" />
              </div>
            </div>
            <div>
              <h3 className="font-montserrat font-black text-2xl mb-1">Алексей Ковалёв</h3>
              <p className="text-purple-400 font-semibold mb-4">Founder & Lead Developer</p>
              <p className="text-white/60 leading-relaxed mb-6">
                Разработчик с 10-летним опытом в области обработки видео и компьютерного зрения.
                VidarPro создана из личной потребности — профессионального инструмента без лишних затрат.
                Сегодня программой пользуются более 50 000 человек по всему миру.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "Github", label: "GitHub" },
                  { icon: "Linkedin", label: "LinkedIn" },
                  { icon: "Twitter", label: "Twitter" },
                ].map((social, i) => (
                  <button key={i} className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/10 transition-all hover:border-purple-500/40">
                    <Icon name={social.icon} size={16} fallback="Circle" />
                    {social.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { val: "2014", label: "Год основания" },
              { val: "50K+", label: "Пользователей" },
              { val: "4.9★", label: "Средний рейтинг" },
            ].map((stat, i) => (
              <div key={i} ref={addRef} className="reveal glass rounded-2xl p-6 text-center glass-hover" style={{transitionDelay: `${i * 0.1}s`}}>
                <div className="font-montserrat font-black text-2xl gradient-text">{stat.val}</div>
                <div className="text-white/40 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded shimmer-btn flex items-center justify-center">
              <Icon name="Play" size={12} className="text-white" />
            </div>
            <span className="font-montserrat font-bold gradient-text">VidarPro</span>
          </div>
          <p className="text-white/30 text-sm">© 2024 VidarPro. Все права защищены.</p>
          <div className="flex gap-4 text-white/40 text-sm">
            <button className="hover:text-white transition-colors">Конфиденциальность</button>
            <button className="hover:text-white transition-colors">Лицензия</button>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxItem && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              onClick={() => {
                const idx = SCREENSHOTS.findIndex(s => s.id === lightbox);
                const prev = SCREENSHOTS[(idx - 1 + SCREENSHOTS.length) % SCREENSHOTS.length];
                setLightbox(prev.id);
              }}
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              onClick={() => {
                const idx = SCREENSHOTS.findIndex(s => s.id === lightbox);
                const next = SCREENSHOTS[(idx + 1) % SCREENSHOTS.length];
                setLightbox(next.id);
              }}
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            <img
              src={lightboxItem.src}
              alt={lightboxItem.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-montserrat font-bold text-xl">{lightboxItem.title}</h3>
              <p className="text-white/50 mt-1">{lightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}