"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { SUBMIT_QUERY_URL } from "@/routes/routes";

gsap.registerPlugin(ScrollTrigger);

export default function QuerySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;
        gsap.fromTo(
            sectionRef.current.querySelectorAll(".fade-up"),
            { opacity: 0, y: 36 },
            {
                opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            }
        );
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Name, email, and message are required.");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(SUBMIT_QUERY_URL, { name, email, phone, message });
            setSubmitted(true);
            setName(""); setEmail(""); setPhone(""); setMessage("");
            toast.success("Message sent! We'll get back to you soon.");
        } catch (err) {
            const msg = axios.isAxiosError(err)
                ? err.response?.data?.message ?? err.message
                : "Something went wrong.";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ backgroundColor: "#0B1E0E" }}
        >
            {/* Subtle dot grid background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, #6DA165 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left — copy */}
                <div className="space-y-6">
                    <div className="fade-up inline-flex items-center gap-2 bg-[#6DA165]/20 text-[#A8D5A2] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
                        Get in Touch
                    </div>
                    <h2 className="fade-up text-5xl sm:text-6xl font-semibold text-white leading-tight tracking-tight">
                        We&apos;d love to{" "}
                        <span className="italic font-light text-[#6DA165]">hear</span>
                        {" "}from you
                    </h2>
                    <p className="fade-up text-white/50 text-lg leading-relaxed max-w-md">
                        Have a question about a product, a custom order, or just want to say hello? Drop us a message and we&apos;ll get back to you within 24 hours.
                    </p>

                    {/* Contact info */}
                    <div className="fade-up space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-white/60 text-sm">
                            <div className="w-9 h-9 rounded-full bg-[#6DA165]/15 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-4 h-4 text-[#6DA165]" />
                            </div>
                            wallpaperheaven2025@gmail.com
                        </div>
                        <div className="flex items-center gap-3 text-white/60 text-sm">
                            <div className="w-9 h-9 rounded-full bg-[#6DA165]/15 flex items-center justify-center flex-shrink-0">
                                <Phone className="w-4 h-4 text-[#6DA165]" />
                            </div>
                            Mon – Sat, 10 AM to 7 PM IST
                        </div>
                    </div>
                </div>

                {/* Right — form */}
                <div className="fade-up">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center text-center h-72 bg-white/5 rounded-3xl border border-white/10 px-8">
                            <div className="w-16 h-16 rounded-full bg-[#6DA165]/20 flex items-center justify-center mb-5">
                                <Send className="w-7 h-7 text-[#6DA165]" />
                            </div>
                            <p className="text-white text-xl font-semibold">Message received!</p>
                            <p className="text-white/40 mt-2 text-sm max-w-xs">
                                Thank you for reaching out. We&apos;ll reply within 24 hours.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-xs text-[#6DA165] underline underline-offset-2"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-5"
                        >
                            {/* Name + Email row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Your name *"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        className="w-full bg-white/8 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6DA165]/60 focus:bg-white/10 transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                                    <input
                                        type="email"
                                        placeholder="Email address *"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-white/8 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6DA165]/60 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                                <input
                                    type="tel"
                                    placeholder="Phone number (optional)"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="w-full bg-white/8 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6DA165]/60 focus:bg-white/10 transition-all"
                                />
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30 pointer-events-none" />
                                <textarea
                                    placeholder="Your message *"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    required
                                    rows={5}
                                    className="w-full bg-white/8 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6DA165]/60 focus:bg-white/10 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2.5 bg-[#6DA165] hover:bg-[#5c8f55] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 disabled:opacity-60"
                            >
                                {submitting ? (
                                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                {submitting ? "Sending…" : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
