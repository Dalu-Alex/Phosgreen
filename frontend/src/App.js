import { useEffect } from "react";
import "@/App.css";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { WhySection } from "@/components/site/WhySection";
import { Overview } from "@/components/site/Overview";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Floating } from "@/components/site/Floating";

function App() {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        obs.unobserve(e.target);
                    }
                }),
            { threshold: 0.1 }
        );
        document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <div className="App bg-ink text-soft font-sans antialiased">
            <div className="noise-layer" aria-hidden="true" />
            <Navbar />
            <main>
                <Hero />
                <WhySection />
                <Overview />
                <Process />
                <Services />
                <Work />
                <Contact />
            </main>
            <Footer />
            <Floating />
        </div>
    );
}

export default App;
