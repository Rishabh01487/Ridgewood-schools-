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
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Check,
  ShieldCheck,
  Send,
  Hash,
  Sparkles,
} from "lucide-react";

const CLASSES = [
  "Pre-Primary (Bachpan · Play Group)",
  "Pre-Primary (Nursery)",
  "LKG (Lower KG)",
  "UKG (Upper KG)",
  "1st Standard",
  "2nd Standard",
  "3rd Standard",
  "4th Standard",
  "5th Standard",
  "6th Standard",
  "7th Standard",
  "8th Standard",
];

const ACADEMIC_YEARS = ["2026–2027", "2026–2027", "2027–2028"];

const COUNTRY_CODES = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+977", label: "+977 (Nepal)" },
];

export function AdmissionForm() {
  const { toast } = useToast();
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = React.useState(false);

  // Step 1 — child + parent basic info
  const [form1, setForm1] = React.useState({
    childName: "",
    academicYear: ACADEMIC_YEARS[0],
    parentName: "",
    phone: "",
    countryCode: "+91",
    email: "",
    classOfAdmission: "",
  });

  // Step 2 — student details
  const [form2, setForm2] = React.useState({
    dob: "",
    age: "",
    location: "",
  });

  const update = (form: "f1" | "f2", key: string, value: string) => {
    if (form === "f1") setForm1({ ...form1, [key]: value });
    else setForm2({ ...form2, [key]: value });
  };

  const next = () => {
    if (step === 1) {
      if (!form1.childName || !form1.parentName || !form1.phone || !form1.email || !form1.classOfAdmission) {
        toast({
          title: "Please complete all required fields",
          description: "All fields in Step 1 are required to continue.",
          variant: "destructive",
        });
        return;
      }
      // Send OTP
      setOtpSent(true);
      toast({
        title: "OTP sent to your phone",
        description: `A 4-digit code has been sent to ${form1.countryCode} ${form1.phone}.`,
      });
      setStep(2);
    } else if (step === 2) {
      if (!form2.dob || !form2.location) {
        toast({
          title: "Please complete all required fields",
          description: "Date of birth and location are required.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const back = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : 1));

  const verifyOtp = () => {
    if (otp.join("") !== "1234") {
      toast({
        title: "Invalid OTP",
        description: "Please enter 1234 (demo) to continue.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Phone verified ✓",
      description: "Your phone number has been confirmed.",
    });
    setStep(3);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Application submitted! 🎉",
        description: "Our admissions team will call you within one working day to schedule a campus visit.",
      });
      // Reset
      setStep(1);
      setOtp(["", "", "", ""]);
      setOtpSent(false);
      setForm1({
        childName: "",
        academicYear: ACADEMIC_YEARS[0],
        parentName: "",
        phone: "",
        countryCode: "+91",
        email: "",
        classOfAdmission: "",
      });
      setForm2({ dob: "", age: "", location: "" });
    }, 1200);
  };

  return (
    <section
      id="admissions"
      className="relative anchor-offset bg-cream-gradient py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold-dark font-medium mb-4">
            <LeafMark size={18} />
            Admissions Open · 2026–27
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            Start your child&apos;s journey with Ridgewood
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-navy/70 text-pretty">
            Applications are now open for the 2026–2027 academic year from
            Pre-Primary through 8th Standard. Complete the application below — we
            will contact you within one working day to start the process.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left — info side panel */}
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="relative rounded-[2rem] bg-navy-gradient text-cream p-7 sm:p-9 shadow-navy overflow-hidden h-full">
              <CirclePattern color="oklch(0.78 0.13 75 / 0.10)" />
              <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-gold/10 blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-navy-light/30 blur-[80px]" />

              <div className="relative">
                <span className="grid place-items-center h-14 w-14 rounded-2xl bg-navy border border-gold/30 mb-5">
                  <BrandLogo variant="shield" size={48} tone="white" />
                </span>
                <h3 className="font-heading text-[24px] font-bold text-cream leading-tight mb-2">
                  Apply in 3 simple steps
                </h3>
                <p className="text-[14px] text-cream/80 leading-relaxed mb-7">
                  Complete the form, verify your phone, and submit. Our
                  admissions team will reach out to schedule a campus visit.
                </p>

                {/* Steps */}
                <ol className="space-y-5">
                  {[
                    { num: "1", title: "Child & Parent Details", desc: "Basic information about your child and you." },
                    { num: "2", title: "Verify with OTP", desc: "A 4-digit code sent to your phone." },
                    { num: "3", title: "Student Details", desc: "DOB, age, and location." },
                  ].map((s, i) => {
                    const isActive = step === i + 1;
                    const isDone = step > i + 1;
                    return (
                      <li
                        key={s.num}
                        className={`flex items-start gap-3.5 transition-opacity ${
                          isActive ? "opacity-100" : isDone ? "opacity-80" : "opacity-50"
                        }`}
                      >
                        <span
                          className={`grid place-items-center h-9 w-9 rounded-full shrink-0 font-semibold text-[13px] transition-all ${
                            isActive
                              ? "bg-gold-gradient text-navy-dark shadow-gold"
                              : isDone
                              ? "bg-gold/30 text-gold-light border border-gold/50"
                              : "bg-navy-light/40 text-cream/70 border border-cream/20"
                          }`}
                        >
                          {isDone ? <Check className="h-4 w-4" /> : s.num}
                        </span>
                        <div className="pt-1">
                          <p className="font-heading text-[16px] font-bold text-cream leading-tight">
                            {s.title}
                          </p>
                          <p className="text-[12.5px] text-cream/70 mt-1 leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 pt-6 border-t border-cream/15 space-y-3 text-[13px] text-cream/80">
                  <p className="flex items-start gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    Your information is encrypted and never shared with third parties.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    For assistance, call us at <span className="text-gold-light font-medium">+91 99993 44965</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Sparkles className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    Limited seats — early applications get priority slots.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <form
              onSubmit={submit}
              className="relative rounded-[2rem] bg-card border border-gold/25 shadow-luxe p-6 sm:p-10"
            >
              {/* Step progress */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                      <span
                        className={`grid place-items-center h-9 w-9 rounded-full font-heading font-bold text-[13px] transition-all ${
                          step === s
                            ? "bg-navy text-cream shadow-soft"
                            : step > s
                            ? "bg-gold-gradient text-navy-dark"
                            : "bg-cream border border-navy/20 text-navy/50"
                        }`}
                      >
                        {step > s ? <Check className="h-4 w-4" /> : s}
                      </span>
                      {s < 3 && (
                        <span
                          className={`h-px w-12 sm:w-20 transition-all ${
                            step > s ? "bg-gold" : "bg-navy/15"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-[11.5px] tracking-luxe uppercase font-semibold text-navy/60">
                  Step {step} of 3
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* STEP 1 — Child + Parent Basic */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        icon={User}
                        label="Child's Name"
                        value={form1.childName}
                        onChange={(v) => update("f1", "childName", v)}
                        placeholder="Ex: John"
                        required
                      />
                      <SelectField
                        icon={BookOpen}
                        label="Academic Year"
                        value={form1.academicYear}
                        onChange={(v) => update("f1", "academicYear", v)}
                        options={ACADEMIC_YEARS}
                        required
                      />
                    </div>

                    <Field
                      icon={User}
                      label="Parent Name"
                      value={form1.parentName}
                      onChange={(v) => update("f1", "parentName", v)}
                      placeholder="Parent Name"
                      required
                    />

                    <div className="grid sm:grid-cols-3 gap-3">
                      <SelectField
                        icon={Phone}
                        label="Country Code"
                        value={form1.countryCode}
                        onChange={(v) => update("f1", "countryCode", v)}
                        options={COUNTRY_CODES.map((c) => c.code)}
                        getLabel={(o) => COUNTRY_CODES.find((c) => c.code === o)?.label || o}
                        required
                      />
                      <div className="sm:col-span-2">
                        <Field
                          icon={Phone}
                          label="Parent Contact Number"
                          value={form1.phone}
                          onChange={(v) => update("f1", "phone", v.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit mobile"
                          type="tel"
                          hint="*OTP will be sent to this number"
                          required
                        />
                      </div>
                    </div>

                    <Field
                      icon={Mail}
                      label="Parent Email ID"
                      value={form1.email}
                      onChange={(v) => update("f1", "email", v)}
                      placeholder="parent-mail-id"
                      type="email"
                      required
                    />

                    <SelectField
                      icon={BookOpen}
                      label="Class of Admission"
                      value={form1.classOfAdmission}
                      onChange={(v) => update("f1", "classOfAdmission", v)}
                      options={CLASSES}
                      placeholder="Select Class of Admission"
                      required
                    />

                    <div className="flex justify-end pt-3">
                      <Button
                        type="button"
                        onClick={next}
                        className="rounded-full bg-navy text-cream hover:bg-navy-dark px-7 py-3.5 font-medium"
                      >
                        Send OTP &amp; Continue
                        <ChevronRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — OTP verification */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="text-center max-w-md mx-auto py-6">
                      <span className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-navy text-cream mb-5">
                        <Hash className="h-7 w-7 text-gold" />
                      </span>
                      <h3 className="font-heading text-[24px] font-bold text-navy mb-2">
                        Verify Your Phone
                      </h3>
                      <p className="text-[14px] text-navy/70 leading-relaxed mb-7">
                        Enter the 4-digit code we&apos;ve sent to{" "}
                        <span className="font-semibold text-navy">
                          {form1.countryCode} {form1.phone}
                        </span>
                        . For the demo, the code is{" "}
                        <span className="font-bold text-gold-dark">1234</span>.
                      </p>

                      {/* OTP inputs */}
                      <div className="flex justify-center gap-3 mb-7">
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            id={`otp-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={d}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "");
                              const next = [...otp];
                              next[i] = v;
                              setOtp(next);
                              if (v && i < 3) {
                                const el = document.getElementById(`otp-${i + 1}`);
                                el?.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Backspace" && !otp[i] && i > 0) {
                                const el = document.getElementById(`otp-${i - 1}`);
                                el?.focus();
                              }
                            }}
                            className="h-16 w-14 sm:w-16 rounded-2xl border-2 border-navy/20 bg-cream/50 text-center font-heading text-[26px] font-bold text-navy focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/25 transition-all"
                          />
                        ))}
                      </div>

                      <p className="text-[12.5px] text-navy/55 mb-6">
                        Didn&apos;t receive the code?{" "}
                        <button
                          type="button"
                          onClick={() => toast({ title: "OTP resent", description: "A new code has been sent." })}
                          className="text-gold-dark font-semibold hover:underline"
                        >
                          Resend OTP
                        </button>
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <Button
                          type="button"
                          onClick={back}
                          variant="outline"
                          className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-5 py-3"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1.5" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={verifyOtp}
                          className="rounded-full bg-navy text-cream hover:bg-navy-dark px-7 py-3 font-medium"
                        >
                          <ShieldCheck className="h-4 w-4 mr-1.5" />
                          Verify &amp; Continue
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Student Details + Submit */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div className="rounded-2xl bg-cream/80 border border-gold/25 p-5 mb-2">
                      <p className="text-[11.5px] tracking-luxe uppercase text-gold-dark font-semibold mb-1.5 flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5" /> Verified
                      </p>
                      <p className="text-[13.5px] text-navy/80">
                        Application for{" "}
                        <span className="font-semibold text-navy">{form1.childName}</span> ·{" "}
                        {form1.classOfAdmission} · {form1.academicYear}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        icon={Calendar}
                        label="Student Date of Birth"
                        value={form2.dob}
                        onChange={(v) => update("f2", "dob", v)}
                        placeholder="dd/mm/yyyy"
                        type="date"
                        required
                      />
                      <Field
                        icon={User}
                        label="Student Age (as on June 2025)"
                        value={form2.age}
                        onChange={(v) => update("f2", "age", v)}
                        placeholder="Ex: 6 years 2 months"
                      />
                    </div>

                    <Field
                      icon={MapPin}
                      label="Your Location"
                      value={form2.location}
                      onChange={(v) => update("f2", "location", v)}
                      placeholder="Ex: Hathua Mor, Mirganj"
                      required
                    />

                    <div className="flex items-center justify-between pt-3">
                      <Button
                        type="button"
                        onClick={back}
                        variant="outline"
                        className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-5 py-3"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1.5" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold px-7 py-3.5"
                      >
                        {submitting ? (
                          "Submitting…"
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-1.5" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-[12px] text-navy/55 text-center pt-2">
                      Note: In case you are unable to register online, you may directly visit the school along with all relevant documents.
                    </p>
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

/* ---------- Reusable form primitives ---------- */

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12.5px] font-heading font-semibold text-navy flex items-center gap-1">
        {label} {required && <span className="text-gold-dark">*</span>}
        {hint && <span className="text-[11px] font-normal text-navy/50 ml-1">— {hint}</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-navy/15 bg-cream/40 pl-11 pr-4 py-3 text-[14.5px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  placeholder,
  getLabel,
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  getLabel?: (o: string) => string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12.5px] font-heading font-semibold text-navy flex items-center gap-1">
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-navy/15 bg-cream/40 pl-11 pr-10 py-3 text-[14.5px] text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {!placeholder && !value && <option value="">Select…</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {getLabel ? getLabel(o) : o}
            </option>
          ))}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none">
          <ChevronRight className="h-4 w-4 rotate-90" />
        </span>
      </div>
    </div>
  );
}
