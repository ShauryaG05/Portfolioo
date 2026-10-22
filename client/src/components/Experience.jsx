import { Briefcase, GraduationCap, Calendar, MapPin, Award } from "lucide-react";

const TIMELINE = [
  {
    type: "experience",
    role: "Backend & ML Systems Engineer (Project Lead)",
    org: "AI & Distributed Systems Lab",
    dates: "2024 — Present",
    location: "Campus / Remote",
    highlights: [
      "Engineered microservices and RAG pipelines serving vector similarity search over 500k+ documents.",
      "Optimized query response times by 40% through Redis caching layers and asynchronous task dispatching.",
      "Authored custom ZK verification smart contracts for decentralized asset handling."
    ]
  },
  {
    type: "experience",
    role: "Full-Stack Developer Intern",
    org: "Tech Innovations & Cloud Solutions",
    dates: "2023 — 2024",
    location: "Hybrid",
    highlights: [
      "Developed high-conversion React and Express web applications with real-time WebSocket feeds.",
      "Integrated Firebase Storage and Google OAuth authentication flows for admin dashboard.",
      "Containerized core services with Docker and set up GitHub Actions automated testing pipelines."
    ]
  },
  {
    type: "education",
    role: "Bachelor of Technology in Computer Science",
    org: "University School of Information Technology",
    dates: "2022 — 2026",
    location: "New Delhi, India",
    highlights: [
      "Focus Areas: Distributed Computing, Deep Learning, Cryptography, Database Management Systems.",
      "Hackathon Winner & Open-Source Contributor across Web3 and AI developer ecosystems.",
      "Active member of Developer Student Clubs and Competitive Programming Team."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-zinc-900">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          Journey & Background
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience & Education
        </h2>
        <p className="mt-3 text-zinc-400 text-sm">
          A track record of engineering leadership, academic rigor, and hands-on system building.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-800 space-y-12">
        {TIMELINE.map((item, idx) => {
          const isExp = item.type === "experience";
          const Icon = isExp ? Briefcase : GraduationCap;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Marker Node */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-8 h-8 rounded-2xl bg-zinc-950 border-2 border-orange-500 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-zinc-950 transition-all shadow-lg shadow-orange-500/20">
                <Icon className="w-4 h-4" />
              </div>

              <div className="glass-panel p-6 sm:p-8 rounded-3xl glass-panel-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                      {item.org}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      {item.dates}
                    </span>
                    <span className="hidden md:flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-300">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
