import { Cpu, Server, Layout, Database, ShieldCheck, Terminal, Wrench } from "lucide-react";

const SKILL_GROUPS = [
  {
    category: "Backend & Systems",
    icon: Server,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "Node.js & Express", level: "Strong" },
      { name: "Python & FastAPI", level: "Strong" },
      { name: "REST & GraphQL APIs", level: "Strong" },
      { name: "MongoDB & Mongoose", level: "Strong" },
      { name: "Redis & Caching", level: "Comfortable" },
      { name: "PostgreSQL & SQL", level: "Comfortable" },
      { name: "Distributed Architecture", level: "Comfortable" },
      { name: "Go (Golang)", level: "Learning" },
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: Cpu,
    color: "from-amber-400 to-orange-500",
    skills: [
      { name: "PyTorch & Transformers", level: "Strong" },
      { name: "RAG & Vector Databases", level: "Strong" },
      { name: "LangChain / LlamaIndex", level: "Comfortable" },
      { name: "Model Fine-Tuning", level: "Comfortable" },
      { name: "Scikit-Learn & Pandas", level: "Comfortable" },
      { name: "Computer Vision (OpenCV)", level: "Comfortable" },
      { name: "Reinforcement Learning", level: "Learning" },
    ]
  },
  {
    category: "Web3 & Decentralized",
    icon: ShieldCheck,
    color: "from-orange-600 to-rose-600",
    skills: [
      { name: "Solidity & Smart Contracts", level: "Comfortable" },
      { name: "Ethers.js / Viem", level: "Comfortable" },
      { name: "Hardhat & Foundry", level: "Comfortable" },
      { name: "ZK Proofs (Circom basics)", level: "Learning" },
    ]
  },
  {
    category: "Frontend & UI",
    icon: Layout,
    color: "from-amber-500 to-yellow-500",
    skills: [
      { name: "React.js & Next.js", level: "Strong" },
      { name: "Tailwind CSS & Shadcn", level: "Strong" },
      { name: "TypeScript / JavaScript", level: "Strong" },
      { name: "State Management (Zustand/Query)", level: "Comfortable" },
    ]
  },
  {
    category: "DevOps & Infrastructure",
    icon: Wrench,
    color: "from-zinc-400 to-zinc-600",
    skills: [
      { name: "Docker & Containerization", level: "Strong" },
      { name: "Git & GitHub Actions CI/CD", level: "Strong" },
      { name: "Firebase & Cloud Storage", level: "Strong" },
      { name: "Linux / Bash Scripting", level: "Comfortable" },
      { name: "Railway & Vercel Deployments", level: "Strong" },
    ]
  }
];

const LEVEL_COLORS = {
  Strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Comfortable: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Learning: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Terminal className="w-3.5 h-3.5" />
          Technical Proficiency
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tools, Languages & Specializations
        </h2>
        <p className="mt-3 text-zinc-400 text-sm">
          Honest skill classifications based on production experience, core engineering depth, and continuous exploration.
        </p>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Strong
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Comfortable
          </span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Learning
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="glass-panel rounded-3xl p-6 glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${group.color} text-zinc-950 shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs"
                    >
                      <span className="font-medium text-zinc-200">{skill.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                          LEVEL_COLORS[skill.level] || "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
