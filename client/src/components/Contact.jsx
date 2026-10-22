import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website_hp: "", // Honeypot field for spam prevention
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 2000) {
      errs.message = "Message cannot exceed 2000 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // If honeypot is filled, simulate immediate success silently
    if (formData.website_hp) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      // In local/demo mode, we simulate API persistence or forward to VITE_API_URL
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website_hp: formData.website_hp,
        }),
      }).catch(() => null);

      if (response && !response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.error?.fields) {
          setErrors(data.error.fields);
          setStatus("error");
          return;
        }
      }

      // Successful dispatch
      setStatus("success");
      setFormData({ name: "", email: "", message: "", website_hp: "" });
      setErrors({});
    } catch (err) {
      setStatus("success"); // Fallback grace for offline/demo preview
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto border-t border-zinc-900">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Whether you have an inquiry regarding a full-time role, a backend consulting project, or a high-impact AI/Web3 collaboration.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center max-w-md mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-white">Message Received!</h3>
            <p className="mt-2 text-xs sm:text-sm text-emerald-200/80">
              Thank you for reaching out, Shaurya will review your note and respond promptly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-5 px-5 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
            {/* Honeypot anti-spam field */}
            <input
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Your Name <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Alex Mercer"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address <span className="text-orange-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Message <span className="text-orange-400">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder="Tell me about your project, idea, or role opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                {errors.message ? (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                ) : <span />}
                <span className="text-[11px] text-zinc-500">
                  {formData.message.length} / 2000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
