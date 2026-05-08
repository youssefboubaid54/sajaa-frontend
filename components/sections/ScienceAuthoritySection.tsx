export default function ScienceAuthoritySection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-ivory border border-beige flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gold/5 rounded-3xl blur-2xl scale-110" />
              <div className="text-center z-10">
                <span className="text-6xl mb-4 block">🔬</span>
                <p className="text-navy/50 font-medium">صورة توضيحية للبحث العلمي</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <div className="inline-flex">
              <span className="bg-navy/5 text-navy text-xs font-semibold px-3 py-1.5 rounded-full border border-navy/10">
                علم النوم المتقدم
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight">
              مدعوم بالعلم، مصمم لراحتك
            </h2>
            <p className="text-lg text-navy/70 leading-relaxed">
              في سَجَى، نؤمن أن النوم العميق ليس رفاهية، بل ضرورة. لذلك، نعتمد على أحدث الدراسات العلمية في اختيار مكوناتنا، لنقدم لكِ طقوساً ليلية تساعدكِ على الاسترخاء والتخلص من الأرق، بدون أي وعود طبية مبالغ فيها.
            </p>
            
            <div className="flex flex-col gap-4 mt-4">
              {[
                { title: "مكونات مدروسة", desc: "كل مكون تم اختياره بناءً على فعاليته في دعم الاسترخاء." },
                { title: "تجارب سريرية", desc: "نعتمد على الأبحاث التي تثبت فعالية المكونات في تحسين جودة النوم." },
                { title: "شفافية تامة", desc: "نعرض جميع المكونات بوضوح، لتكوني على دراية كاملة بما تستخدمينه." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gold text-lg">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy text-lg">{item.title}</h4>
                    <p className="text-navy/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
