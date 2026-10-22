import { useState } from "react";
import { ExternalLink, Github, Layers, Sparkles, Code2, ArrowUpRight } from "lucide-react";

const SAMPLE_PROJECTS = [
  {
    id: "neural-rag-engine",
    title: "Neural RAG Knowledge Engine",
    summary: "High-throughput retrieval-augmented generation engine with vector hybrid search and local LLM reranking.",
    category: "AI/ML",
    tags: ["Python", "FastAPI", "Qdrant", "LangChain", "PyTorch"],
    liveUrl: "https://demo.shauryagupta.dev/rag",
    repoUrl: "https://github.com/shauryagupta/neural-rag-engine",
    featured: true,
    highlights: "Sub-50ms vector query latency, hybrid dense-sparse scoring, streaming token response."
  },
  {
    id: "distributed-task-broker",
    title: "High-Scale Task Orchestrator",
    summary: "Fault-tolerant distributed job queue engine built with Node.js, Redis Streams, and MongoDB replication.",
    category: "Backend",
    tags: ["Node.js", "TypeScript", "Redis", "MongoDB", "Docker"],
    liveUrl: "https://demo.shauryagupta.dev/broker",
    repoUrl: "https://github.com/shauryagupta/task-orchestrator",
    featured: true,
    highlights: "Processed 10,000+ jobs/sec with at-least-once delivery guarantees and automatic backpressure."
  },
  {
    id: "decentralized-escrow",
    title: "Web3 Cross-Chain Escrow Protocol",
    summary: "Trustless smart contract escrow protocol with zero-knowledge identity proofs and automated oracle dispute resolution.",
    category: "Web3",
    tags: ["Solidity", "Hardhat", "Ethers.js", "React", "Zero Knowledge"],
    liveUrl: "https://demo.shauryagupta.dev/escrow",
    repoUrl: "https://github.com/shauryagupta/zk-escrow-protocol",
    featured: false,
    highlights: "Audited smart contracts deployed on Ethereum Sepolia & Arbitrum."
  },
  {
    id: "ai-vision-classifier",
    title: "Edge Vision Defect Detection",
    summary: "Convolutional neural network fine-tuned for real-time edge anomaly detection with ONNX runtime acceleration.",
    category: "AI/ML",
    tags: ["PyTorch", "OpenCV", "ONNX", "Docker", "Python"],
    liveUrl: "https://demo.shauryagupta.dev/vision",
    repoUrl: "https://github.com/shauryagupta/edge-vision-defect",
    featured: false,
    highlights: "99.2% F1-score on industrial inspection benchmarks with 15ms inference latency."
  },
  {
    id: "cloud-portfolio-api",
    title: "Enterprise Portfolio Architecture",
    summary: "Production-grade portfolio backend with OAuth 2.0, rate-limiting, Firebase Storage, and MongoDB.",
    category: "Backend",
    tags: ["Express", "MongoDB", "Firebase", "OAuth 2.0", "Railway"],
    liveUrl: "https://shauryagupta.dev",
    repoUrl: "https://github.com/shauryagupta/portfolio",
    featured: true,
    highlights: "Strict CSP headers, sub-100ms API response time, automated CI/CD pipeline."
  }
];

const CATEGORIES = ["All", "AI/ML", "Backend", "Web3"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? SAMPLE_PROJECTS
    : SAMPLE_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Featured Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crafted with Precision & Scale
          </h2>
          <p className="mt-2 text-zinc-400 text-sm max-w-xl">
            A selection of backend systems, machine learning architectures, and decentralized protocols built for real-world impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group glass-panel rounded-3xl p-6 flex flex-col justify-between glass-panel-hover relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-orange-400 border border-zinc-700">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-zinc-950 text-orange-400 transition"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {project.summary}
              </p>

              <div className="mt-4 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-mono">
                <span className="text-orange-400 font-semibold">Key: </span>
                {project.highlights}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
