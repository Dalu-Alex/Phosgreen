import { MapPin, CheckCircle2 } from "lucide-react";
import { CASES } from "../../data/site";
import { SectionHeader } from "./SectionHeader";

export const Work = () => (
    <section id="work" data-testid="work-section" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                eyebrow="Our Work"
                title="Real Plants. Measured Results."
                sub="A sample of recent service audits and restorations across Kerala."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {CASES.map((item, i) => (
                    <article
                        key={`${item.district}-${item.tag}`}
                        data-testid={`case-card-${i}`}
                        className="glow-card reveal p-7 flex flex-col"
                        style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                    >
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-emerald-bright" />
                            <span className="text-emerald-bright text-xs font-bold tracking-[0.15em] uppercase">
                                {item.district}
                            </span>
                            <span className="text-fog text-xs">· {item.tag}</span>
                        </div>
                        <div className="mt-5 space-y-4 flex-1">
                            <div>
                                <p className="text-[11px] tracking-[0.2em] uppercase text-fog font-semibold">Problem</p>
                                <p className="text-silver text-sm leading-relaxed mt-1.5">{item.problem}</p>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.2em] uppercase text-fog font-semibold">Action</p>
                                <p className="text-silver text-sm leading-relaxed mt-1.5">{item.action}</p>
                            </div>
                        </div>
                        <div
                            data-testid={`case-result-${i}`}
                            className="mt-6 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-bold text-soft"
                            style={{
                                background: "linear-gradient(135deg, #0F7A6A 0%, #14A085 100%)",
                            }}
                        >
                            <CheckCircle2 size={13} />
                            {item.result}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
);
