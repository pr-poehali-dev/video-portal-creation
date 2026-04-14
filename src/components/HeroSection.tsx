import Icon from "@/components/ui/icon";
import { FEATURES, STEPS } from "@/components/data";

interface HeroSectionProps {
  addRef: (el: HTMLElement | null) => void;
  scrollTo: (id: string) => void;
}

export default function HeroSection({ addRef, scrollTo }: HeroSectionProps) {
  return (
    <>
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
            <p className="text-white/50 max-w-xl mx-auto">VideoCraft объединяет профессиональные инструменты в интуитивно понятном интерфейсе</p>
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
    </>
  );
}
