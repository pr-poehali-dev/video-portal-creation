import Icon from "@/components/ui/icon";

interface ContactsSectionProps {
  addRef: (el: HTMLElement | null) => void;
}

export default function ContactsSection({ addRef }: ContactsSectionProps) {
  return (
    <>
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
                Попробуй VideoCraft прямо сейчас. Без подписки, без ограничений по времени.
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

              <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center max-w-sm mx-auto w-full">
                {[
                  { icon: "Mail", label: "Email", value: "alexnovikov@gmail.com" },
                  { icon: "MessageCircle", label: "Telegram", value: "@Bodya_soul" },
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
              Кто создал <span className="gradient-text-warm">VideoCraft</span>
            </h2>
          </div>

          <div ref={addRef} className="reveal glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center glow-purple">
                <Icon name="User" size={48} className="text-white/80" />
              </div>
            </div>
            <div>
              <h3 className="font-montserrat font-black text-2xl mb-1">Алексей Новиков</h3>
              <p className="text-purple-400 font-semibold mb-4">Founder & Lead Developer</p>
              <p className="text-white/60 leading-relaxed mb-6">
                Разработчик с 10-летним опытом в области обработки видео и компьютерного зрения.
                VideoCraft создана из личной потребности — профессионального инструмента без лишних затрат.
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
            <span className="font-montserrat font-bold gradient-text">VideoCraft</span>
          </div>
          <p className="text-white/30 text-sm">© 2024 VideoCraft. Все права защищены.</p>
          <div className="flex gap-4 text-white/40 text-sm">
            <button className="hover:text-white transition-colors">Конфиденциальность</button>
            <button className="hover:text-white transition-colors">Лицензия</button>
          </div>
        </div>
      </footer>
    </>
  );
}
