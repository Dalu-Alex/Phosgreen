import { TAGLINE } from "../../data/site";

const TRUST_ITEMS = [
    "14 Districts Covered",
    "Thermal Camera Diagnostics",
    "Chemical-Free Cleaning",
    "AMC Plans",
];

export const Hero = () => (
    <section
        id="home"
        data-testid="hero-section"
        className="relative min-h-screen flex items-center overflow-hidden"
    >
        <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(201,209,211,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,209,211,0.5) 1px, transparent 1px)",
                backgroundSize: "72px 44px",
                transform: "perspective(600px) rotateX(28deg) scale(1.6)",
                transformOrigin: "center 70%",
            }}
        />
        <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[42rem] w-[70rem] max-w-none rounded-full pointer-events-none"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(15,122,106,0.28), rgba(10,79,69,0.1), transparent)",
            }}
        />
        <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-[28rem] w-[40rem] rounded-full pointer-events-none"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(20,160,133,0.1), transparent)",
            }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-28 text-center">
            <div
                className="hero-rise flex items-center justify-center gap-4"
                style={{ animationDelay: "0.05s" }}
            >
                <span aria-hidden="true" className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-silver/60" />
                <p
                    data-testid="hero-tagline"
                    className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-silver font-medium"
                >
                    {TAGLINE}
                </p>
                <span aria-hidden="true" className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-silver/60" />
            </div>
            <h1
                data-testid="hero-headline"
                className="hero-rise font-display metallic-text text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] mt-8"
                style={{ animationDelay: "0.2s" }}
            >
                Best <span className="emerald-text">Solar Servicing</span>
                <br />
                &amp; Maintenance in Kerala
            </h1>
            <p
                data-testid="hero-subline"
                className="hero-rise text-fog text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-7"
                style={{ animationDelay: "0.35s" }}
            >
                Professional solar panel cleaning, inverter diagnostics and
                preventive maintenance that restores lost output — across all 14
                districts of Kerala.
            </p>
            <div
                className="hero-rise flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                style={{ animationDelay: "0.5s" }}
            >
                <a
                    href="#contact"
                    data-testid="hero-audit-button"
                    className="btn-primary rounded-full px-8 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                    Request Service Audit
                </a>
                <a
                    href="#about"
                    data-testid="hero-learn-more-button"
                    className="btn-ghost rounded-full px-8 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                    Learn More
                </a>
            </div>
            <div
                data-testid="hero-trust-strip"
                className="hero-rise flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-16"
                style={{ animationDelay: "0.65s" }}
            >
                {TRUST_ITEMS.map((item, i) => (
                    <span key={item} className="flex items-center gap-3">
                        {i > 0 && (
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-bright/70" />
                        )}
                        <span className="text-xs sm:text-sm tracking-wide text-silver/80">
                            {item}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    </section>
);
