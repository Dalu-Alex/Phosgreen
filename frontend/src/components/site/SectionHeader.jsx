export const SectionHeader = ({ eyebrow, title, sub, align = "center" }) => (
    <div
        className={`reveal relative max-w-3xl ${
            align === "center" ? "mx-auto text-center" : ""
        }`}
    >
        <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] max-w-full rounded-full pointer-events-none"
            style={{
                background:
                    "radial-gradient(closest-side, rgba(20,160,133,0.12), transparent)",
            }}
        />
        <p className="eyebrow" data-testid={`eyebrow-${eyebrow.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            {eyebrow}
        </p>
        <h2 className="font-display metallic-text text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-4">
            {title}
        </h2>
        {sub && (
            <p className="text-fog text-base md:text-lg mt-5 leading-relaxed">{sub}</p>
        )}
    </div>
);
