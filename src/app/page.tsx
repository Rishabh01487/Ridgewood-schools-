import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { WhyChoose } from "@/components/site/why-choose";
import { Facilities } from "@/components/site/facilities";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { ParentLogin } from "@/components/site/parent-login";
import { AdmissionForm } from "@/components/site/admission-form";
import { AdminPanel } from "@/components/site/admin-panel";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
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
