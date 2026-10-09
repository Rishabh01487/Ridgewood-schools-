"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark, BrandLogo, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Check,
  ShieldCheck,
  Send,
  Upload,
  GraduationCap,
  HeartHandshake,
  FileText,
  Loader2,
  Download,
  Hash,
} from "lucide-react";

const CLASSES = [
  "Pre-Primary (Play Group)",
  "Pre-Primary (Nursery)",
  "LKG",
  "UKG",
  "1st Standard",
  "2nd Standard",
  "3rd Standard",
  "4th Standard",
  "5th Standard",
  "6th Standard",
  "7th Standard",
  "8th Standard",
];

const ACADEMIC_YEARS = ["2026–2027", "2027–2028"];

export function AdmissionForm() {
  const { toast } = useToast();
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = React.useState(false);

  const [s1, setS1] = React.useState({ studentName: "", dob: "", ageYears: "", gender: "", admissionClass: "", academicYear: ACADEMIC_YEARS[0], previousSchool: "", previousClass: "" });
  const [s2, setS2] = React.useState({ fatherName: "", fatherOccupation: "", fatherMobile: "", fatherEmail: "", motherName: "", motherOccupation: "", motherMobile: "", motherEmail: "", residentialAddress: "", transport: "" });
  const [s3, setS3] = React.useState({ siblingName: "", siblingClass: "", specialNeeds: "", motherTongue: "", category: "" });
  const [s4, setS4] = React.useState({ photo: null as File | null, birthCert: null as File | null, aadhaarStudent: null as File | null, aadhaarFather: null as File | null, aadhaarMother: null as File | null, undertaking: false });

  const upd = (st: number, key: string, val: any) => {
    if (st === 1) setS1({ ...s1, [key]: val });
    else if (st === 2) setS2({ ...s2, [key]: val });
    else if (st === 3) setS3({ ...s3, [key]: val });
    else setS4({ ...s4, [key]: val } as any);
  };

  const next = () => {
    if (step === 1) {
      if (!s1.studentName || !s1.dob || !s1.gender || !s1.admissionClass) { toast({ title: "Please fill all required fields", variant: "destructive" }); return; }
      setStep(2);
    } else if (step === 2) {
      if (!s2.fatherName || !s2.fatherMobile || !s2.residentialAddress) { toast({ title: "Please fill all required fields", variant: "destructive" }); return; }
      setStep(3);
    } else if (step === 3) { setStep(4); }
  };
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!s4.undertaking) { toast({ title: "Please accept the undertaking", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      // Submit to MongoDB via API
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: s1.studentName,
          dob: s1.dob,
          ageYears: s1.ageYears,
          gender: s1.gender,
          admissionClass: s1.admissionClass,
          academicYear: s1.academicYear,
          previousSchool: s1.previousSchool,
          previousClass: s1.previousClass,
          fatherName: s2.fatherName,
          fatherOccupation: s2.fatherOccupation,
          fatherMobile: s2.fatherMobile,
          fatherEmail: s2.fatherEmail,
          motherName: s2.motherName,
          motherOccupation: s2.motherOccupation,
          motherMobile: s2.motherMobile,
          motherEmail: s2.motherEmail,
          residentialAddress: s2.residentialAddress,
          transport: s2.transport,
          siblingName: s3.siblingName,
          siblingClass: s3.siblingClass,
          specialNeeds: s3.specialNeeds,
          motherTongue: s3.motherTongue,
          category: s3.category,
          documents: {
            photo: s4.photo?.name || null,
            birthCert: s4.birthCert?.name || null,
            aadhaarStudent: s4.aadhaarStudent?.name || null,
            aadhaarFather: s4.aadhaarFather?.name || null,
            aadhaarMother: s4.aadhaarMother?.name || null,
          },
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      toast({
        title: "Registration submitted! 🎉",
        description: `Registration for ${s1.studentName} (${s1.admissionClass}) received. We'll contact you at ${s2.fatherMobile} within 1 working day.`,
      });

      // Reset
      setStep(1);
      setS1({ studentName: "", dob: "", ageYears: "", gender: "", admissionClass: "", academicYear: ACADEMIC_YEARS[0], previousSchool: "", previousClass: "" });
      setS2({ fatherName: "", fatherOccupation: "", fatherMobile: "", fatherEmail: "", motherName: "", motherOccupation: "", motherMobile: "", motherEmail: "", residentialAddress: "", transport: "" });
      setS3({ siblingName: "", siblingClass: "", specialNeeds: "", motherTongue: "", category: "" });
      setS4({ photo: null, birthCert: null, aadhaarStudent: null, aadhaarFather: null, aadhaarMother: null, undertaking: false });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admissions" className="relative anchor-offset bg-cream-gradient py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-3"><LeafMark size={18} />Registration Open · 2026–27</div>
          <h2 className="font-heading text-sunset-gradient animate-gradient-flow font-bold leading-tight text-[28px] sm:text-[40px] text-balance">Secure your child&apos;s seat at Ridgewood</h2>
          <div className="mt-4"><GoldRule /></div>
          <p className="mt-4 text-[15px] sm:text-[16px] text-navy/70 max-w-2xl mx-auto text-pretty">Complete the registration form below. Limited seats available from Pre-Primary to 8th Standard. We&apos;ll contact you within 1 working day.</p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="relative rounded-[2rem] bg-navy-gradient text-cream p-6 shadow-navy overflow-hidden h-full">
              <CirclePattern color="oklch(0.78 0.13 75 / 0.25)" />
              <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-gold/10 blur-[80px]" />
              <div className="relative">
                <BrandLogo variant="full" size={48} tone="white" className="mb-5" />
                <h3 className="font-heading text-[18px] font-bold text-cream mb-4">Registration Steps</h3>
                <ol className="space-y-4">
                  {[{ n: 1, t: "Student Information", d: "Name, DOB, class" }, { n: 2, t: "Parent Details", d: "Father & mother info" }, { n: 3, t: "Additional Info", d: "Sibling, category, needs" }, { n: 4, t: "Documents & Submit", d: "Upload + undertaking" }].map((s) => {
                    const isActive = step === s.n; const isDone = step > s.n;
                    return (
                      <li key={s.n} className={`flex items-start gap-3 transition-opacity ${isActive ? "opacity-100" : isDone ? "opacity-80" : "opacity-50"}`}>
                        <span className={`grid place-items-center h-8 w-8 rounded-full shrink-0 font-bold text-[13px] ${isActive ? "bg-gold-gradient text-navy-dark shadow-gold" : isDone ? "bg-gold/30 border border-gold/50 text-gold-light" : "bg-navy-light/40 border border-cream/20 text-cream/70"}`}>{isDone ? <Check className="h-4 w-4" /> : s.n}</span>
                        <div className="pt-0.5"><p className="font-heading text-[14px] font-bold text-cream leading-tight">{s.t}</p><p className="text-[11.5px] text-cream/65 mt-0.5">{s.d}</p></div>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-6 pt-5 border-t border-cream/15 space-y-2.5 text-[12px] text-cream/75">
                  <p className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-gold mt-0.5 shrink-0" />Your data is encrypted and confidential.</p>
                  <p className="flex items-start gap-2"><Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />For help: +91 70522 24726</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <form onSubmit={submit} className="rounded-[2rem] bg-card border border-gold/25 shadow-luxe p-5 sm:p-8">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <React.Fragment key={s}>
                      <span className={`grid place-items-center h-8 w-8 rounded-full font-bold text-[12px] ${step === s ? "bg-navy text-cream shadow-soft" : step > s ? "bg-gold-gradient text-navy-dark" : "bg-cream border border-navy/20 text-navy/50"}`}>{step > s ? <Check className="h-3.5 w-3.5" /> : s}</span>
                      {s < 4 && <span className={`h-px w-6 sm:w-12 ${step > s ? "bg-gold" : "bg-navy/15"}`} />}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-[11px] tracking-luxe uppercase font-semibold text-navy/60">Step {step} of 4</span>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="font-heading text-[18px] font-bold text-navy mb-2 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-gold-dark" /> Student Information</h3>
                    <F icon={User} label="Student's Name (BLOCK LETTERS) *" value={s1.studentName} onChange={(v: string) => upd(1, "studentName", v.toUpperCase())} placeholder="e.g. AAROHI SHARMA" required />
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={Calendar} label="Date of Birth *" type="date" value={s1.dob} onChange={(v: string) => upd(1, "dob", v)} required />
                      <F icon={Hash} label="Age (years)" value={s1.ageYears} onChange={(v: string) => upd(1, "ageYears", v.replace(/\D/g, "").slice(0, 2))} placeholder="e.g. 6" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Sel icon={User} label="Gender *" value={s1.gender} onChange={(v: string) => upd(1, "gender", v)} options={["Male", "Female", "Other"]} placeholder="Select" required />
                      <Sel icon={GraduationCap} label="Class for Admission *" value={s1.admissionClass} onChange={(v: string) => upd(1, "admissionClass", v)} options={CLASSES} placeholder="Select class" required />
                    </div>
                    <Sel icon={Calendar} label="Academic Year" value={s1.academicYear} onChange={(v: string) => upd(1, "academicYear", v)} options={ACADEMIC_YEARS} />
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={GraduationCap} label="Previous Class" value={s1.previousClass} onChange={(v: string) => upd(1, "previousClass", v)} placeholder="e.g. UKG" />
                      <F icon={MapPin} label="Previous School" value={s1.previousSchool} onChange={(v: string) => upd(1, "previousSchool", v)} placeholder="School name" />
                    </div>
                    <div className="flex justify-end pt-3"><Btn2 onNext={next} /></div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="font-heading text-[18px] font-bold text-navy mb-2 flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-gold-dark" /> Father&apos;s Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={User} label="Father's Name *" value={s2.fatherName} onChange={(v: string) => upd(2, "fatherName", v)} placeholder="Name" required />
                      <F icon={User} label="Occupation" value={s2.fatherOccupation} onChange={(v: string) => upd(2, "fatherOccupation", v)} placeholder="e.g. Business" />
                      <F icon={Phone} label="Father's Mobile *" type="tel" value={s2.fatherMobile} onChange={(v: string) => upd(2, "fatherMobile", v.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit" required />
                      <F icon={Mail} label="Father's Email (optional)" type="email" value={s2.fatherEmail} onChange={(v: string) => upd(2, "fatherEmail", v)} placeholder="email" />
                    </div>
                    <h3 className="font-heading text-[18px] font-bold text-navy mb-2 mt-5 flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-gold-dark" /> Mother&apos;s Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={User} label="Mother's Name" value={s2.motherName} onChange={(v: string) => upd(2, "motherName", v)} placeholder="Name" />
                      <F icon={User} label="Occupation" value={s2.motherOccupation} onChange={(v: string) => upd(2, "motherOccupation", v)} placeholder="e.g. Teacher" />
                      <F icon={Phone} label="Mother's Mobile" type="tel" value={s2.motherMobile} onChange={(v: string) => upd(2, "motherMobile", v.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit" />
                      <F icon={Mail} label="Mother's Email (optional)" type="email" value={s2.motherEmail} onChange={(v: string) => upd(2, "motherEmail", v)} placeholder="email" />
                    </div>
                    <TA icon={MapPin} label="Residential Address *" value={s2.residentialAddress} onChange={(v: string) => upd(2, "residentialAddress", v)} placeholder="Full address" required />
                    <Sel icon={MapPin} label="School Transport Required?" value={s2.transport} onChange={(v: string) => upd(2, "transport", v)} options={["Yes", "No"]} placeholder="Select" />
                    <div className="flex justify-between pt-3"><Btn1 onBack={back} /><Btn2 onNext={next} /></div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="font-heading text-[18px] font-bold text-navy mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-gold-dark" /> Additional Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={User} label="Sibling Name (if any)" value={s3.siblingName} onChange={(v: string) => upd(3, "siblingName", v)} placeholder="Name" />
                      <F icon={GraduationCap} label="Sibling's Class" value={s3.siblingClass} onChange={(v: string) => upd(3, "siblingClass", v)} placeholder="e.g. 3rd Standard" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <F icon={Hash} label="Mother Tongue" value={s3.motherTongue} onChange={(v: string) => upd(3, "motherTongue", v)} placeholder="e.g. Hindi" />
                      <Sel icon={User} label="Category" value={s3.category} onChange={(v: string) => upd(3, "category", v)} options={["General", "OBC", "SC", "ST"]} placeholder="Select" />
                    </div>
                    <TA icon={HeartHandshake} label="Special Needs / Medical Info" value={s3.specialNeeds} onChange={(v: string) => upd(3, "specialNeeds", v)} placeholder="If any special needs, describe. Otherwise leave blank." />
                    <div className="flex justify-between pt-3"><Btn1 onBack={back} /><Btn2 onNext={next} /></div>
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <h3 className="font-heading text-[18px] font-bold text-navy mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-gold-dark" /> Documents & Undertaking</h3>
                    <p className="text-[13px] text-navy/65 mb-3">Upload documents (JPG/PNG/PDF, max 5MB each):</p>
                    <div className="grid grid-cols-2 gap-3">
                      <FU label="Student's Photo" onChange={(f: File) => upd(4, "photo", f)} />
                      <FU label="Birth Certificate" onChange={(f: File) => upd(4, "birthCert", f)} />
                      <FU label="Aadhaar — Student" onChange={(f: File) => upd(4, "aadhaarStudent", f)} />
                      <FU label="Aadhaar — Father" onChange={(f: File) => upd(4, "aadhaarFather", f)} />
                      <FU label="Aadhaar — Mother" onChange={(f: File) => upd(4, "aadhaarMother", f)} />
                    </div>
                    <div className="rounded-xl border border-gold/25 bg-cream/40 p-4 mt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={s4.undertaking} onChange={(e) => upd(4, "undertaking", e.target.checked)} className="mt-1 rounded border-navy/30 accent-[oklch(0.235_0.07_264)]" />
                        <p className="text-[12.5px] text-navy/80 leading-relaxed"><span className="font-semibold text-navy">Undertaking:</span> I hereby declare that the information given above is based on facts and authentic records. Registration/Admission of my child may be cancelled if any information is found to be false. I shall produce the requisite original documents at the time of admission.</p>
                      </label>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <Btn1 onBack={back} />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button type="button" variant="outline" className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-5 py-2.5 text-[13px]" onClick={() => {
                          // Trigger download of a blank form PDF
                          const link = document.createElement("a");
                          link.href = "/Ridgewood-Registration-Form.pdf";
                          link.download = "Ridgewood-Registration-Form.pdf";
                          link.click();
                          toast({ title: "Form downloaded", description: "Print, fill, and submit at the school office." });
                        }}>
                          <Download className="h-4 w-4 mr-1.5" /> Download Form
                        </Button>
                        <Button type="submit" disabled={submitting} className="rounded-full bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold px-6 py-2.5 text-[14px]">
                          {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting…</> : <><Send className="h-4 w-4 mr-1.5" /> Submit Online</>}
                        </Button>
                      </div>
                    </div>
                    <p className="text-center text-[11px] text-navy/50 pt-1">Submit online or download the form, print, and submit at the school office.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Btn1({ onBack }: { onBack: () => void }) {
  return <Button type="button" onClick={onBack} variant="outline" className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-5 py-2.5"><ChevronLeft className="h-4 w-4 mr-1" /> Back</Button>;
}
function Btn2({ onNext }: { onNext: () => void }) {
  return <Button type="button" onClick={onNext} className="rounded-full bg-navy text-cream hover:bg-navy-dark px-6 py-2.5 text-[14px]">Continue <ChevronRight className="h-4 w-4 ml-1" /></Button>;
}

function F({ icon: Icon, label, value, onChange, placeholder, type = "text", required }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[11.5px] font-semibold text-navy">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 z-10"><Icon className="h-4 w-4" /></span>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full rounded-lg border border-navy/15 bg-cream/40 pl-10 pr-3 py-2.5 text-[13.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all" />
      </div>
    </div>
  );
}

function TA({ icon: Icon, label, value, onChange, placeholder, required }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[11.5px] font-semibold text-navy">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} rows={3} className="w-full rounded-lg border border-navy/15 bg-cream/40 px-3 py-2.5 text-[13.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all resize-none" />
    </div>
  );
}

function Sel({ icon: Icon, label, value, onChange, options, placeholder, required }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[11.5px] font-semibold text-navy">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 z-10"><Icon className="h-4 w-4" /></span>
        <select value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full rounded-lg border border-navy/15 bg-cream/40 pl-10 pr-9 py-2.5 text-[13.5px] text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all appearance-none cursor-pointer">
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"><ChevronRight className="h-4 w-4 rotate-90" /></span>
      </div>
    </div>
  );
}

function FU({ label, onChange }: { label: string; onChange: (f: File) => void }) {
  const [name, setName] = React.useState("");
  return (
    <label className="block cursor-pointer">
      <span className="text-[11.5px] font-semibold text-navy block mb-1">{label}</span>
      <div className="rounded-lg border-2 border-dashed border-navy/20 hover:border-gold/50 transition-colors p-3 text-center bg-cream/30">
        {name ? (<div className="flex items-center justify-center gap-1.5"><Check className="h-4 w-4 text-green-600" /><span className="text-[11px] text-navy/70 truncate max-w-[100px]">{name}</span></div>) : (<div className="flex flex-col items-center gap-1"><Upload className="h-4 w-4 text-navy/40" /><span className="text-[10px] text-navy/50">Click to upload</span></div>)}
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setName(f.name); onChange(f); } }} />
      </div>
    </label>
  );
}
