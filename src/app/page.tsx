import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Stats } from "@/components/site/stats";
import { About } from "@/components/site/about";
import { WhyChoose } from "@/components/site/why-choose";
import { Philosophy } from "@/components/site/philosophy";
import { Facilities } from "@/components/site/facilities";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { News } from "@/components/site/news";
import { ParentLogin } from "@/components/site/parent-login";
import { AdmissionForm } from "@/components/site/admission-form";
import { Contact } from "@/components/site/contact";
import { AdminUpload } from "@/components/site/admin-upload";
import { AdminPanel } from "@/components/site/admin-panel";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <WhyChoose />
        <Philosophy />
        <Facilities />
        <Gallery />
        <Testimonials />
        <News />
        <ParentLogin />
        <AdmissionForm />
        <AdminUpload />
        <AdminPanel />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
