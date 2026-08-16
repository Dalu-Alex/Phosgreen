import { useEffect, useRef, useState } from "react";

const STATS = [
    { end: 14, suffix: "", label: "Districts Served" },
    { end: 30, suffix: "%", label: "Output Recovered" },
    { end: 100, suffix: "%", label: "Chemical-Free Cleaning" },
    { end: 6, suffix: "", label: "Days A Week Support" },
];

const CountUp = ({ end, suffix, duration = 1600 }) => {
    const ref = useRef(null);
    const [val, setVal] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                obs.disconnect();
                const start = performance.now();
                const tick = (now) => {
                    const p = Math.min((now - start) / duration, 1);
                    setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref}>
            {val}
            {suffix}
        </span>
    );
};

export const Overview = () => (
    <section data-testid="overview-section" className="relative py-24 lg:py-32 bg-surface/40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
                <p className="eyebrow">Company Overview</p>
                <h2 className="font-display metallic-text text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-4">
                    Optimising Kerala's Solar Assets, District by District
                </h2>
                <p className="text-fog text-base md:text-lg leading-relaxed mt-6">
                    Phosgreen is dedicated to optimizing existing solar
                    installations across all 14 districts of Kerala. We serve
                    residential, commercial, industrial and institutional
                    clients using high-grade diagnostics, thermal cameras and
                    specialized chemical-free cleaning systems.
                </p>
                <p className="text-fog text-sm leading-relaxed mt-4">
                    From a single rooftop in Ayur to industrial arrays in Kochi,
                    every plant we service leaves measurably stronger than we
                    found it — documented, verified and reported.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        data-testid={`stat-card-${i}`}
                        className="glow-card reveal p-7 text-center"
                        style={{ transitionDelay: `${i * 90}ms` }}
                    >
                        <p className="emerald-text font-display text-4xl sm:text-5xl font-bold">
                            <CountUp end={stat.end} suffix={stat.suffix} />
                        </p>
                        <p className="text-silver text-xs sm:text-sm tracking-wide mt-3">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
