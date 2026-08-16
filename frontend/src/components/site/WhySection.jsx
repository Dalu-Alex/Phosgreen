import {
    Zap, Flame, Activity, ShieldAlert, Anchor, TrendingUp,
} from "lucide-react";
import { REASONS } from "../../data/site";
import { SectionHeader } from "./SectionHeader";

const ICONS = [Zap, Flame, Activity, ShieldAlert, Anchor, TrendingUp];

export const WhySection = () => (
    <section id="about" data-testid="why-section" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                eyebrow="Why Professional Maintenance"
                title="Kerala's Climate Is Quietly Taxing Your Solar Plant"
                sub="Humidity, bird droppings, dust and monsoon debris can cut solar power output by up to 30%. Scheduled professional care takes it back."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {REASONS.map((reason, i) => {
                    const Icon = ICONS[i];
                    return (
                        <article
                            key={reason.title}
                            data-testid={`reason-card-${i}`}
                            className="glow-card reveal p-7"
                            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                        >
                            <div className="h-11 w-11 rounded-xl bg-elevated border border-hairline flex items-center justify-center">
                                <Icon size={20} className="card-icon" />
                            </div>
                            <h3 className="text-silver-light font-semibold text-lg mt-5">
                                {reason.title}
                            </h3>
                            <p className="text-fog text-sm leading-relaxed mt-2.5">
                                {reason.desc}
                            </p>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
