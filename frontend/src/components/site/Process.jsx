import { STEPS } from "../../data/site";
import { SectionHeader } from "./SectionHeader";

export const Process = () => (
    <section data-testid="process-section" className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                eyebrow="Our Servicing Process"
                title="Five Steps. One Restored Power Plant."
            />
            <div className="relative mt-20">
                <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(20,160,133,0.6), rgba(15,122,106,0.6), transparent)",
                    }}
                />
                <ol className="grid lg:grid-cols-5 gap-10 lg:gap-6">
                    {STEPS.map((step, i) => (
                        <li
                            key={step.title}
                            data-testid={`process-step-${i}`}
                            className="reveal relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div
                                className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center font-display text-lg font-bold text-soft ring-1 ring-emerald-bright/40 lg:mb-6"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0F7A6A 0%, #14A085 100%)",
                                    boxShadow: "0 0 24px -6px rgba(20,160,133,0.5)",
                                }}
                            >
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-silver-light font-semibold text-sm lg:text-base leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-fog text-xs leading-relaxed mt-2 max-w-[16rem] lg:mx-auto">
                                    {step.desc}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </section>
);
