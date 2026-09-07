import { BookOpen, GraduationCap } from "lucide-react";

const courses = [
  {
    title: "Conversation Design: Practical Tips for AI Design",
    detail: "Elaine Anzaldo, Conversation Designer at Meta · July 2025",
    badge: "IxDF",
  },
  {
    title: "Service Design: How to Design Integrated Service Experiences",
    detail: "Interaction Design Foundation · March 2025",
    badge: "IxDF",
  },
  {
    title: "AI for Designers",
    detail: "Interaction Design Foundation · January 2025",
    badge: "IxDF",
  },
  {
    title: "Accessibility: How to Design for All",
    detail: "Interaction Design Foundation · December 2024",
    badge: "IxDF",
  },
  {
    title: "UX Design for Augmented Reality",
    detail: "Interaction Design Foundation · November 2024",
    badge: "IxDF",
  },
];

export default function Learning() {
  return (
    <section
      id="learning"
      aria-label="Online Courses and Education"
      className="py-14 lg:py-20"
      style={{ background: "#161616" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-crimson" aria-hidden="true" />
          <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">Learning</span>
        </div>
        <h2
          className="font-serif text-offwhite leading-none mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Never Stop Learning
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Online Courses */}
          <div>
            <h3 className="font-serif text-offwhite font-bold text-2xl mb-8 flex items-center gap-3">
              <BookOpen size={18} className="text-crimson" />
              Online Learning
            </h3>
            <div className="space-y-4">
              {courses.map(({ title, detail, badge }) => (
                <div key={title + detail} className="flex gap-3 items-start">
                  <span className="mt-0.5 flex-shrink-0 px-1.5 py-0.5 bg-crimson/20 text-crimson text-[10px] font-bold tracking-wider uppercase leading-none">
                    {badge}
                  </span>
                  <div>
                    <p className="text-offwhite text-xs font-semibold leading-snug">{title}</p>
                    <p className="text-offwhite/40 text-xs mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-serif text-offwhite font-bold text-2xl mb-8 flex items-center gap-3">
              <GraduationCap size={18} className="text-crimson" />
              Education
            </h3>
            <div className="space-y-6">
              <div className="border border-white/10 p-6">
                <p className="text-crimson text-xs tracking-widest uppercase font-semibold mb-2">Bachelor's Degree</p>
                <p className="text-offwhite font-semibold text-sm">Bachelor's Degree in Design</p>
                <p className="text-offwhite/50 text-xs mt-1">
                  Deca.UA — Departamento de Comunicação e Arte da Universidade de Aveiro, Aveiro · 2013–2016
                </p>
              </div>
              <div className="border border-white/10 p-6">
                <p className="text-crimson text-xs tracking-widest uppercase font-semibold mb-2">Postgraduate Degree</p>
                <p className="text-offwhite font-semibold text-sm">Postgraduate Degree in Advertising and Marketing</p>
                <p className="text-offwhite/50 text-xs mt-1">
                  Escola Superior de Comunicação Social (ESCS), Lisbon · 2016–2017
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
