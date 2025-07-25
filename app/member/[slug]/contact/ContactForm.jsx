"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setResult({ success: false, message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setResult({ success: false, message: "An error occurred. Please try again." });
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Your Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg bg-[#18192a] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Your Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg bg-[#18192a] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00cec9]"
          placeholder="your.email@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-white">Your Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg bg-[#18192a] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd79a8]"
          rows={4}
          placeholder="Hello! I'd love to discuss a project with you..."
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] text-white font-bold py-2 rounded-full shadow-md hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00cec9] disabled:opacity-60"
      >
        {loading ? "Sending..." : <>Send Message <FaPaperPlane className="ml-1" /></>}
      </button>
      {result && (
        <div className={`text-center mt-2 font-semibold ${result.success ? "text-green-400" : "text-red-400"}`}>
          {result.message}
        </div>
      )}
    </form>
  );
} 