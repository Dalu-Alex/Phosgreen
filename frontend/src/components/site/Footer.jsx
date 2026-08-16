import { Instagram } from "lucide-react";
import {
    TAGLINE, DISTRICTS, NAV_LINKS, INSTAGRAM_URL, WHATSAPP_URL,
} from "../../data/site";
import { WhatsAppIcon } from "./Floating";

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Cookie Policy"];

export const Footer = () => (
    <footer data-testid="site-footer" className="relative border-t border-emerald-deep/60 bg-ink">
        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
                <img
                    src="/logo.jpeg"
                    alt="Phosgreen logo"
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-hairline"
                />
                <p className="text-[10px] tracking-[0.3em] uppercase text-silver mt-4">
                    {TAGLINE}
                </p>
                <p className="text-fog text-sm leading-relaxed mt-4">
                    Premium solar servicing and maintenance across all 14
                    districts of Kerala.
                </p>
            </div>
            <nav aria-label="Company">
                <h4 className="text-silver-light text-xs font-bold tracking-[0.2em] uppercase">Company</h4>
                <ul className="mt-5 space-y-3">
                    {NAV_LINKS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                data-testid={`footer-link-${id}`}
                                className="text-fog text-sm hover:text-emerald-bright transition-colors duration-300"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <h4 className="text-silver-light text-xs font-bold tracking-[0.2em] uppercase">
                    Servicing Areas
                </h4>
                <p className="text-emerald-bright text-xs font-semibold mt-5 tracking-wide">
                    Statewide Coverage
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {DISTRICTS.map((d) => (
                        <li key={d} className="text-fog text-xs">{d}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-silver-light text-xs font-bold tracking-[0.2em] uppercase">Legal</h4>
                <ul className="mt-5 space-y-3">
                    {LEGAL_LINKS.map((item) => (
                        <li key={item}>
                            <a
                                href="#"
                                data-testid={`footer-legal-${item.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                onClick={(e) => e.preventDefault()}
                                className="text-fog text-sm hover:text-emerald-bright transition-colors duration-300"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4 mt-6">
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Phosgreen on Instagram"
                        data-testid="footer-instagram-link"
                        className="h-9 w-9 rounded-full border border-hairline flex items-center justify-center text-silver hover:text-emerald-bright hover:border-emerald-bright/50 transition-colors duration-300"
                    >
                        <Instagram size={16} />
                    </a>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Phosgreen on WhatsApp"
                        data-testid="footer-whatsapp-link"
                        className="h-9 w-9 rounded-full border border-hairline flex items-center justify-center text-silver hover:text-emerald-bright hover:border-emerald-bright/50 transition-colors duration-300"
                    >
                        <WhatsAppIcon size={16} />
                    </a>
                </div>
            </div>
        </div>
        <div className="border-t border-hairline">
            <p data-testid="footer-copyright" className="max-w-7xl mx-auto px-6 py-6 text-center text-fog text-xs tracking-wide">
                © 2026 Phosgreen. All rights reserved.
            </p>
        </div>
    </footer>
);
