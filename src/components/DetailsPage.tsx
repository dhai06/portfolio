'use client';

import { motion } from 'framer-motion';
import { X, Github, Globe, Mail, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { CardData } from '@/data/portfolioData';

interface DetailsPageProps {
    profile: CardData;
    onClose: () => void;
}

export default function DetailsPage({ profile, onClose }: DetailsPageProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[70] bg-[var(--background)] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
            <div className="min-h-screen p-6 pb-24">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="fixed top-6 right-6 p-3 rounded-full bg-white shadow-lg border border-[var(--border)] hover:scale-105 transition-transform z-10"
                    aria-label="Close"
                >
                    <X className="w-6 h-6 text-[var(--foreground)]" />
                </button>

                {/* Conditional Rendering based on Profile Type */}
                {profile.type === 'about' && <AboutDetails profile={profile} />}
                {profile.type === 'project' && <ProjectDetails profile={profile} />}
                {profile.type === 'contact' && <ContactDetails profile={profile} />}
            </div>
        </motion.div>
    );
}

// About Profile Details
function AboutDetails({ profile }: { profile: CardData }) {
    return (
        <div className="max-w-2xl mx-auto pt-16">
            <div className="flex items-center gap-4 mb-6">
                {profile.images[0] && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--border)]">
                        <Image src={profile.images[0]} alt={profile.name} width={96} height={96} className="object-cover" />
                    </div>
                )}
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[var(--foreground)]">
                        {profile.name}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile.infoPills.slice(0, 2).map((pill, index) => (
                            <span key={index} className="text-sm text-[var(--foreground)]/60">
                                {pill.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            {profile.prompts.map((prompt, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-[var(--border)] mb-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]/60 mb-2">{prompt.question}</p>
                    <p className="text-lg text-[var(--foreground)] leading-relaxed">
                        {prompt.answer}
                    </p>
                </div>
            ))}

            {/* Skills */}
            {profile.details.stack && (
                <div className="bg-white p-6 rounded-xl border border-[var(--border)] mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]/60 mb-3">
                        Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.details.stack.map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 bg-[var(--foreground)] text-white rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* All Info Pills */}
            <div className="bg-white p-6 rounded-xl border border-[var(--border)]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]/60 mb-3">
                    About Me
                </h3>
                <div className="flex flex-wrap gap-2">
                    {profile.infoPills.map((pill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-[var(--background)] rounded-full text-sm text-[var(--foreground)] border border-[var(--border)]"
                        >
                            {pill.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Project Details
function ProjectDetails({ profile }: { profile: CardData }) {
    return (
        <div className="max-w-3xl mx-auto pt-16">
            <h1 className="text-5xl font-serif font-bold text-[var(--foreground)] mb-4">
                {profile.name}
            </h1>

            {/* Project Images Gallery */}
            {profile.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {profile.images.map((img, index) => (
                        <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)]">
                            <Image src={img} alt={`${profile.name} screenshot ${index + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Project Description */}
            {profile.prompts.map((prompt, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-[var(--border)] mb-4">
                    <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-3">{prompt.question}</h2>
                    <p className="text-lg text-[var(--foreground)] leading-relaxed">
                        {prompt.answer}
                    </p>
                </div>
            ))}

            {/* Tech Stack */}
            {profile.details.stack && (
                <div className="bg-[var(--foreground)] text-white p-8 rounded-xl mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">
                        Built With
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {profile.details.stack.map((tech) => (
                            <span
                                key={tech}
                                className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-base font-medium border border-white/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Project Links */}
            <div className="flex flex-wrap gap-4">
                {profile.details.github && (
                    <a
                        href={profile.details.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                    >
                        <Github size={24} /> View Code
                    </a>
                )}
                {profile.details.demo && (
                    <a
                        href={profile.details.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-white text-[var(--foreground)] rounded-full font-bold text-lg border-2 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white transition-all shadow-lg"
                    >
                        <Globe size={24} /> Live Demo
                    </a>
                )}
            </div>
        </div>
    );
}

// Contact Details
function ContactDetails({ profile }: { profile: CardData }) {
    return (
        <div className="max-w-xl mx-auto pt-16 text-center">
            {profile.images[0] && (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--border)] mx-auto mb-6">
                    <Image src={profile.images[0]} alt={profile.name} width={128} height={128} className="object-cover" />
                </div>
            )}

            <h1 className="text-5xl font-serif font-bold text-[var(--foreground)] mb-6">
                {profile.name}
            </h1>

            {/* Contact Prompts */}
            {profile.prompts.map((prompt, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-[var(--border)] mb-6 text-left">
                    <p className="text-sm font-semibold text-[var(--foreground)]/60 mb-2">{prompt.question}</p>
                    <p className="text-xl font-serif text-[var(--foreground)] leading-relaxed">
                        {prompt.answer}
                    </p>
                </div>
            ))}

            {/* Contact Methods */}
            <div className="bg-[var(--foreground)] text-white p-8 rounded-xl mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-80">
                    Get In Touch
                </h3>
                <div className="flex flex-col gap-4">
                    {profile.details.email && (
                        <a
                            href={`mailto:${profile.details.email}`}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-[var(--foreground)] rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
                        >
                            <Mail size={24} /> {profile.details.email}
                        </a>
                    )}
                    {profile.details.socials?.map((social) => {
                        const Icon = social.label === 'Twitter' ? Twitter : social.label === 'LinkedIn' ? Linkedin : Globe;
                        return (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                <Icon size={24} /> {social.label}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Availability Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
                {profile.infoPills.map((pill, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-sm text-[var(--foreground)] border border-[var(--border)] font-medium"
                    >
                        {pill.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
