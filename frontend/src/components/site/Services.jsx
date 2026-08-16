import {
    Sparkles, PlugZap, Building2, Thermometer, CalendarCheck,
    Cable, Hammer, ArrowRight,
} from "lucide-react";
import { SERVICES } from "../../data/site";
import { SectionHeader } from "./SectionHeader";

const ICONS = [Sparkles, PlugZap, Building2, Thermometer, CalendarCheck, Cable, Hammer];

export const Services = () => (
    <section id="services" data-testid="services-section" className="relative py-24 lg:py-32 bg-surface/40">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                eyebrow="Our Services"
                title="Complete Care for Every Layer of Your Solar Plant"
                sub="From glass to grid — cleaning, diagnostics, structure and fabrication under one specialised roof."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {SERVICES.map((service, i) => {
                    const Icon = ICONS[i];
                    return (
                        <article
                            key={service.title}
                            data-testid={`service-card-${i}`}
                            className="glow-card reveal p-7 flex flex-col"
                            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                        >
                            <div className="h-11 w-11 rounded-xl bg-elevated border border-hairline flex items-center justify-center">
                                <Icon size={20} className="card-icon" />
                            </div>
                            <h3 className="text-silver-light font-semibold text-lg leading-snug mt-5">
                                {service.title}
                            </h3>
                            <p className="text-fog text-sm leading-relaxed mt-2.5 flex-1">
                                {service.desc}
                            </p>
                            <a
                                href="#contact"
                                data-testid={`service-enquire-link-${i}`}
                                className="inline-flex items-center gap-2 text-emerald-bright text-sm font-semibold mt-6 hover:gap-3 transition-all duration-300"
                            >
                                Enquire <ArrowRight size={15} />
                            </a>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
