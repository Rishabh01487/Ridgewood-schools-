import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import dynamic from "next/dynamic";

// Lazy-load below-the-fold sections so the initial page load is fast.
// These only load when the user scrolls near them (or the browser prefetches
// during idle time). This significantly reduces the initial JS bundle.
const About = dynamic(() => import("@/components/site/about").then(m => ({ default: m.About })), { loading: () => null });
const WhyChoose = dynamic(() => import("@/components/site/why-choose").then(m => ({ default: m.WhyChoose })), { loading: () => null });
const Facilities = dynamic(() => import("@/components/site/facilities").then(m => ({ default: m.Facilities })), { loading: () => null });
const Gallery = dynamic(() => import("@/components/site/gallery").then(m => ({ default: m.Gallery })), { loading: () => null });
const Testimonials = dynamic(() => import("@/components/site/testimonials").then(m => ({ default: m.Testimonials })), { loading: () => null });
const ParentLogin = dynamic(() => import("@/components/site/parent-login").then(m => ({ default: m.ParentLogin })), { loading: () => null });
const AdmissionForm = dynamic(() => import("@/components/site/admission-form").then(m => ({ default: m.AdmissionForm })), { loading: () => null });
const AdminPanel = dynamic(() => import("@/components/site/admin-panel").then(m => ({ default: m.AdminPanel })), { loading: () => null });
const Contact = dynamic(() => import("@/components/site/contact").then(m => ({ default: m.Contact })), { loading: () => null });
const Footer = dynamic(() => import("@/components/site/footer").then(m => ({ default: m.Footer })), { loading: () => null });

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-cream text-foreground">
      <Navbar />
      <main className="relative flex-1">
        <Hero />
        <About />
        <WhyChoose />
        <Facilities />
        <Gallery />
        <Testimonials />
        <ParentLogin />
        <AdmissionForm />
        <AdminPanel />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
