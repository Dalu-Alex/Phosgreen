import { useState } from "react";
import axios from "axios";
import {
    MapPin, Phone, Mail, Instagram, Clock, CheckCircle2, AlertCircle, Send,
} from "lucide-react";
import {
    ADDRESS, PHONE_DISPLAY, PHONE_TEL, EMAIL, INSTAGRAM_URL,
    DISTRICTS, PROPERTY_TYPES, SERVICES,
} from "../../data/site";
import { SectionHeader } from "./SectionHeader";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAP_SRC =
    "https://www.google.com/maps?q=St.%20George%20Church%2C%20Ayur%2C%20Kollam%2C%20Kerala%20691533&output=embed";

const EMPTY = {
    name: "", email: "", phone: "", district: "",
    propertyType: "", serviceType: "", message: "", consent: false,
};

const validate = (f) => {
    const errors = {};
    if (f.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = "Please enter a valid email address.";
    if (!/^[+\d][\d\s-]{7,18}$/.test(f.phone.trim())) errors.phone = "Please enter a valid phone number.";
    if (!f.district) errors.district = "Please select your district.";
    if (!f.propertyType) errors.propertyType = "Please select a property type.";
    if (!f.serviceType) errors.serviceType = "Please select a service.";
    if (!f.consent) errors.consent = "Please accept the privacy policy to continue.";
    return errors;
};

const Field = ({ label, error, children, testId }) => (
    <div>
        <label className="block text-xs font-semibold tracking-wide text-silver mb-2">
            {label}
        </label>
        {children}
        {error && (
            <p data-testid={`${testId}-error`} className="flex items-center gap-1.5 text-emerald-bright text-xs mt-1.5">
                <AlertCircle size={12} /> {error}
            </p>
        )}
    </div>
);

const ContactInfo = () => (
    <div className="glow-card reveal p-8 flex flex-col h-full">
        <h3 className="font-display metallic-text text-2xl font-semibold">Visit or Call Us</h3>
        <ul className="mt-7 space-y-5 flex-1">
            <li className="flex gap-4">
                <MapPin size={18} className="text-emerald-bright shrink-0 mt-0.5" />
                <span data-testid="contact-address" className="text-silver text-sm leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex gap-4">
                <Phone size={18} className="text-emerald-bright shrink-0 mt-0.5" />
                <a href={PHONE_TEL} data-testid="contact-phone-link" className="text-silver text-sm hover:text-emerald-bright transition-colors duration-300">
                    {PHONE_DISPLAY}
                </a>
            </li>
            <li className="flex gap-4">
                <Mail size={18} className="text-emerald-bright shrink-0 mt-0.5" />
                <a href={`mailto:${EMAIL}`} data-testid="contact-email-link" className="text-silver text-sm hover:text-emerald-bright transition-colors duration-300">
                    {EMAIL}
                </a>
            </li>
            <li className="flex gap-4">
                <Instagram size={18} className="text-emerald-bright shrink-0 mt-0.5" />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="contact-instagram-link" className="text-silver text-sm hover:text-emerald-bright transition-colors duration-300">
                    @phosgreenofficial
                </a>
            </li>
            <li className="flex gap-4">
                <Clock size={18} className="text-emerald-bright shrink-0 mt-0.5" />
                <div data-testid="contact-hours" className="text-sm">
                    <p className="text-silver">Monday – Saturday · 8:00 AM – 6:00 PM</p>
                    <p className="text-fog mt-1">Sunday closed (emergency only)</p>
                </div>
            </li>
        </ul>
        <div className="mt-8 rounded-xl overflow-hidden border border-hairline">
            <iframe
                title="Phosgreen location map — Ayur, Kollam"
                data-testid="contact-map"
                src={MAP_SRC}
                className="map-dark w-full h-56 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    </div>
);

const AuditForm = () => {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [serverError, setServerError] = useState("");

    const set = (key) => (e) => {
        const value = key === "consent" ? e.target.checked : e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
        setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length) return;
        setStatus("submitting");
        setServerError("");
        try {
            await axios.post(`${API}/service-requests`, {
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                district: form.district,
                property_type: form.propertyType,
                service_type: form.serviceType,
                message: form.message.trim(),
                consent: form.consent,
            });
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setServerError(
                err.response?.data?.detail ||
                    "Something went wrong. Please try again or call us directly."
            );
        }
    };

    if (status === "success") {
        return (
            <div className="glow-card reveal p-10 flex flex-col items-center justify-center text-center min-h-[32rem]">
                <CheckCircle2 size={52} className="text-emerald-bright" />
                <h3 data-testid="contact-success-message" className="font-display metallic-text text-3xl font-semibold mt-6">
                    Request Received
                </h3>
                <p className="text-fog text-sm leading-relaxed mt-4 max-w-sm">
                    Thank you, {form.name.split(" ")[0]}. Our team will call you
                    within one business day to schedule your service audit in{" "}
                    {form.district}.
                </p>
                <button
                    data-testid="contact-send-another-button"
                    onClick={() => { setForm(EMPTY); setStatus("idle"); }}
                    className="btn-ghost rounded-full px-6 py-2.5 text-sm font-semibold mt-8"
                >
                    Send Another Request
                </button>
            </div>
        );
    }

    return (
        <form
            data-testid="audit-form"
            onSubmit={onSubmit}
            noValidate
            className="glow-card reveal p-8"
        >
            <h3 className="font-display metallic-text text-2xl font-semibold">Request a Service Audit</h3>
            <div className="grid sm:grid-cols-2 gap-5 mt-7">
                <Field label="Name" error={errors.name} testId="contact-name-input">
                    <input data-testid="contact-name-input" className="field" placeholder="Your full name" value={form.name} onChange={set("name")} />
                </Field>
                <Field label="Email" error={errors.email} testId="contact-email-input">
                    <input data-testid="contact-email-input" type="email" className="field" placeholder="you@example.com" value={form.email} onChange={set("email")} />
                </Field>
                <Field label="Phone" error={errors.phone} testId="contact-phone-input">
                    <input data-testid="contact-phone-input" type="tel" className="field" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set("phone")} />
                </Field>
                <Field label="District" error={errors.district} testId="contact-district-select">
                    <select data-testid="contact-district-select" className="field" value={form.district} onChange={set("district")}>
                        <option value="">Select district</option>
                        {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </Field>
                <Field label="Property Type" error={errors.propertyType} testId="contact-property-select">
                    <select data-testid="contact-property-select" className="field" value={form.propertyType} onChange={set("propertyType")}>
                        <option value="">Select property type</option>
                        {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                </Field>
                <Field label="Service Type" error={errors.serviceType} testId="contact-service-select">
                    <select data-testid="contact-service-select" className="field" value={form.serviceType} onChange={set("serviceType")}>
                        <option value="">Select service</option>
                        {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                </Field>
            </div>
            <div className="mt-5">
                <Field label="Message / System Specs" error={errors.message} testId="contact-message-input">
                    <textarea
                        data-testid="contact-message-input"
                        rows={4}
                        className="field resize-none"
                        placeholder="e.g. 5kW rooftop system, installed 2019, output dropped after monsoon…"
                        value={form.message}
                        onChange={set("message")}
                    />
                </Field>
            </div>
            <div className="mt-5">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        data-testid="contact-consent-checkbox"
                        type="checkbox"
                        checked={form.consent}
                        onChange={set("consent")}
                        className="mt-0.5 h-4 w-4 rounded accent-[#14A085]"
                    />
                    <span className="text-fog text-xs leading-relaxed">
                        I agree to the privacy policy and consent to Phosgreen
                        contacting me regarding my service request.
                    </span>
                </label>
                {errors.consent && (
                    <p data-testid="contact-consent-checkbox-error" className="flex items-center gap-1.5 text-emerald-bright text-xs mt-1.5">
                        <AlertCircle size={12} /> {errors.consent}
                    </p>
                )}
            </div>
            {status === "error" && (
                <p data-testid="contact-error-message" className="flex items-center gap-2 text-emerald-bright text-sm mt-5">
                    <AlertCircle size={15} /> {serverError}
                </p>
            )}
            <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary rounded-full px-8 py-3.5 font-semibold text-sm mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
                {status === "submitting" ? "Sending…" : (
                    <>Request Service Audit <Send size={15} /></>
                )}
            </button>
        </form>
    );
};

export const Contact = () => (
    <section id="contact" data-testid="contact-section" className="relative py-24 lg:py-32 bg-surface/40">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                eyebrow="Contact Us"
                title="Book Your Solar Service Audit"
                sub="Tell us about your plant — we'll respond within one business day."
            />
            <div className="grid lg:grid-cols-2 gap-8 mt-16 items-stretch">
                <ContactInfo />
                <AuditForm />
            </div>
        </div>
    </section>
);
