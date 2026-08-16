import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from "../../data/site";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-35% 0px -55% 0px" }
        );
        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-ink/80 backdrop-blur-xl border-b border-hairline"
                    : "bg-transparent"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between gap-4">
                <a href="#home" data-testid="navbar-logo-link" className="shrink-0">
                    <img
                        src="/logo.jpeg"
                        alt="Phosgreen logo"
                        className="h-11 w-11 rounded-full object-cover ring-1 ring-hairline"
                    />
                </a>
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            data-testid={`nav-link-${id}`}
                            className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                                active === id
                                    ? "text-emerald-bright"
                                    : "text-silver hover:text-soft"
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex items-center gap-5">
                    <a
                        href={PHONE_TEL}
                        data-testid="navbar-call-link"
                        className="flex items-center gap-2 text-sm text-silver hover:text-emerald-bright transition-colors duration-300"
                    >
                        <Phone size={15} />
                        {PHONE_DISPLAY}
                    </a>
                    <a
                        href="#contact"
                        data-testid="navbar-audit-button"
                        className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                        Request Service Audit
                    </a>
                </div>
                <button
                    data-testid="mobile-menu-toggle"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-silver-light p-2"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>
            <div
                data-testid="mobile-menu"
                className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-ink/95 backdrop-blur-2xl transition-all duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                <div className="flex flex-col gap-2 px-8 pt-10">
                    {NAV_LINKS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            data-testid={`mobile-nav-link-${id}`}
                            onClick={() => setOpen(false)}
                            className={`font-display text-3xl py-3 border-b border-hairline ${
                                active === id ? "text-emerald-bright" : "text-silver-light"
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        data-testid="mobile-audit-button"
                        onClick={() => setOpen(false)}
                        className="btn-primary rounded-full px-6 py-3.5 text-center font-semibold mt-8"
                    >
                        Request Service Audit
                    </a>
                </div>
            </div>
        </header>
    );
};
