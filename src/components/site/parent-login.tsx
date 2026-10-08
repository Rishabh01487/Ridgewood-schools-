"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Reveal } from "./reveal";
import { GoldRule, LeafMark, BrandLogo, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LogIn,
  GraduationCap,
  Bell,
  Trophy,
  FileText,
  CalendarDays,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  Share2,
  Image as ImageIcon,
  Video,
  Star,
  X,
  Loader2,
} from "lucide-react";

interface Subject { id: string; name: string; marks: number; grade: string; }
interface ReportCard { id: string; term: string; remarks: string | null; pdfUrl: string | null; subjects: Subject[]; }
interface Participation { id: string; event: string; date: string; result: string; category: string; }
interface Student {
  id: string;
  name: string;
  rollNo: string;
  classSection: string;
  classTeacher: string;
  attendance: number;
  averageGrade: string;
  reportCards: ReportCard[];
  participation: Participation[];
}
interface Notice {
  id: string;
  title: string;
  body: string;
  tag: string;
  date: string;
  read: boolean;
}
interface DashboardData {
  parent: { name?: string | null; email?: string | null };
  students: Student[];
  notices: Notice[];
}

export function ParentLogin() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState<"overview" | "report" | "notice" | "participation" | "gallery">("overview");
  const { toast } = useToast();

  // Fetch dashboard data when session is ready
  React.useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      fetch("/api/parent/me")
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((d) => setData(d))
        .catch(() => {
          toast({
            title: "Failed to load dashboard",
            description: "Please try again in a moment.",
            variant: "destructive",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setData(null);
    }
  }, [status, toast]);

  if (status === "loading") {
    return (
      <section id="parent-login" className="relative anchor-offset bg-navy-gradient text-cream py-24 sm:py-32 bg-navy-fusion navy-craft-overlay">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
          <p className="mt-3 text-cream/70 text-sm">Loading…</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="parent-login"
      className="relative anchor-offset bg-navy-gradient text-cream py-24 sm:py-32 overflow-hidden bg-navy-fusion navy-craft-overlay"
    >
      {/* Subtle gold circle pattern across the navy section */}
      <CirclePattern color="oklch(0.78 0.13 75 / 0.10)" />
      {/* gold orbs */}
      <div className="absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-gold/15 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 h-72 w-72 rounded-full bg-navy-light/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-luxe uppercase text-gold font-medium mb-4">
            <LeafMark size={18} />
            Parent Portal
          </div>
          <h2 className="font-heading text-royal-cream-gradient animate-gradient-flow font-bold leading-tight text-[34px] sm:text-[44px] md:text-[52px] text-balance">
            A window into your child&apos;s everyday journey
          </h2>
          <div className="mt-6">
            <GoldRule />
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-cream/85 text-pretty">
            One login — complete visibility. Track your child&apos;s report
            cards, read school notices, follow their participation in events,
            and browse the photo &amp; video gallery — all in one place.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {!session ? (
            <motion.div key="login" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <LoginPanel onLogin={(phone, password) => signIn("credentials", { phone, password, redirect: false })} />
            </motion.div>
          ) : (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              {loading || !data ? (
                <div className="text-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
                  <p className="mt-3 text-cream/70 text-sm">Loading dashboard…</p>
                </div>
              ) : data.students.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-cream/85 mb-4">No students linked to your account yet.</p>
                  <Button onClick={() => signOut({ redirect: false })} className="rounded-full bg-gold-gradient text-navy-dark hover:shadow-gold">
                    Sign out
                  </Button>
                </div>
              ) : (
                <ParentDashboard
                  parentName={data.parent?.name || session.user?.name || "Parent"}
                  student={data.students[0]}
                  notices={data.notices}
                  tab={tab}
                  setTab={setTab}
                  onLogout={() => signOut({ redirect: false })}
                  onMarkNoticeRead={async (noticeId) => {
                    await fetch("/api/parent/me", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ noticeId }),
                    });
                    setData((prev) => prev ? { ...prev, notices: prev.notices.map(n => n.id === noticeId ? { ...n, read: true } : n) } : prev);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ----------------------- LOGIN PANEL ----------------------- */

function LoginPanel({ onLogin }: { onLogin: (phone: string, password: string) => Promise<any> }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await onLogin(phone, password);
      if (result?.error) {
        toast({
          title: "Login failed",
          description: "Phone or password is incorrect.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back! 👋",
          description: "You have signed in to the Parent Portal.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.message || "Network error.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="relative rounded-[2rem] glass-navy border border-gold/30 shadow-luxe p-8 sm:p-10">
        <div className="absolute top-5 right-5 flex items-center gap-1.5 text-[10.5px] tracking-luxe uppercase text-gold font-semibold">
          <LeafMark size={14} />
          Secure Access
        </div>

        <div className="flex flex-col items-center text-center mb-7">
          <span className="grid place-items-center h-16 w-16 rounded-full bg-cream mb-4">
            <BrandLogo variant="shield" size={36} tone="navy" />
          </span>
          <h3 className="font-heading text-[26px] font-bold text-cream mb-1.5">
            Parent Sign-In
          </h3>
          <p className="text-[13.5px] text-cream/70">
            Use your registered phone number and password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] tracking-wide font-medium text-cream/85">
              Registered Phone Number (10 digits)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="9999344965"
              required
              className="w-full rounded-xl bg-navy-dark/50 border border-gold/30 px-4 py-3 text-[14.5px] text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] tracking-wide font-medium text-cream/85">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl bg-navy-dark/50 border border-gold/30 px-4 py-3 text-[14.5px] text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-[12px] pt-1">
            <label className="flex items-center gap-2 text-cream/65 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gold/40 accent-[oklch(0.78_0.13_75)]" />
              Remember me
            </label>
            <a href="#" className="text-gold hover:text-gold-light transition-colors">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold py-3.5 mt-2 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In to Parent Portal
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Feature chips below */}
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: "Report Cards" },
          { icon: Bell, label: "Notices" },
          { icon: Trophy, label: "Participation" },
          { icon: ImageIcon, label: "Photo Gallery" },
        ].map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="glass-navy rounded-xl border border-gold/20 p-3.5 text-center">
              <Icon className="h-5 w-5 text-gold mx-auto mb-1.5" />
              <p className="text-[11.5px] font-medium text-cream/85 tracking-wide">{f.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------- PARENT DASHBOARD ----------------------- */

function ParentDashboard({
  parentName,
  student,
  notices,
  tab,
  setTab,
  onLogout,
  onMarkNoticeRead,
}: {
  parentName: string;
  student: Student;
  notices: Notice[];
  tab: "overview" | "report" | "notice" | "participation" | "gallery";
  setTab: (t: "overview" | "report" | "notice" | "participation" | "gallery") => void;
  onLogout: () => void;
  onMarkNoticeRead: (id: string) => Promise<void>;
}) {
  const TABS = [
    { id: "overview", label: "Overview", icon: GraduationCap },
    { id: "report", label: "Report Cards", icon: FileText },
    { id: "notice", label: "Notices", icon: Bell },
    { id: "participation", label: "Participation", icon: Trophy },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ] as const;

  const unreadCount = notices.filter(n => !n.read).length;

  return (
    <div>
      {/* Student card */}
      <Reveal className="rounded-[2rem] glass-navy border border-gold/30 shadow-luxe p-6 sm:p-8 mb-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <span className="grid place-items-center h-20 w-20 rounded-2xl bg-navy border border-gold/40 text-cream font-heading font-bold text-[24px]">
              {student.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <div>
              <p className="text-[11px] tracking-luxe uppercase text-gold font-semibold">Welcome, {parentName}</p>
              <h3 className="font-heading text-[24px] sm:text-[28px] font-bold text-cream leading-tight">
                {student.name}
              </h3>
              <p className="text-[13px] text-cream/75 mt-1">
                {student.classSection} · Roll {student.rollNo} · Class Teacher {student.classTeacher}
              </p>
            </div>
          </div>
          <Button onClick={onLogout} variant="ghost" className="rounded-full border border-cream/20 text-cream hover:bg-cream hover:text-navy self-start sm:self-center">
            <LogIn className="h-4 w-4 mr-1.5 rotate-180" />
            Logout
          </Button>
        </div>
      </Reveal>

      {/* Tab nav */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {TABS.map((t) => {
          const Icon = t.icon;
          const badge = t.id === "notice" && unreadCount > 0 ? unreadCount : null;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                tab === t.id
                  ? "bg-gold-gradient text-navy-dark shadow-gold"
                  : "glass-navy text-cream/80 hover:text-cream border border-gold/20"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
              {badge !== null && (
                <span className="grid place-items-center h-5 w-5 rounded-full bg-maroon text-cream text-[10px] font-bold">{badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="rounded-[2rem] glass-navy border border-gold/25 shadow-luxe p-6 sm:p-8 min-h-[420px]">
        <AnimatePresence mode="wait">
          {tab === "overview" && <OverviewTab key="ov" student={student} notices={notices} />}
          {tab === "report" && <ReportTab key="rc" student={student} />}
          {tab === "notice" && <NoticeTab key="nt" notices={notices} onMarkRead={onMarkNoticeRead} />}
          {tab === "participation" && <ParticipationTab key="pt" student={student} />}
          {tab === "gallery" && <GalleryTab key="gl" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ----------------------- TAB: OVERVIEW ----------------------- */
function OverviewTab({ student, notices }: { student: Student; notices: Notice[] }) {
  const unread = notices.filter(n => !n.read).length;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
      <h3 className="font-heading text-[24px] font-bold text-cream mb-1">Snapshot</h3>
      <p className="text-[13.5px] text-cream/70 mb-6">A quick overview of {student.name}&apos;s current term.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CalendarDays, label: "Attendance", value: `${student.attendance}%`, trend: "↑ 2% this month" },
          { icon: TrendingUp, label: "Average Grade", value: student.averageGrade, trend: "Top of section" },
          { icon: Trophy, label: "Participation", value: `${student.participation.length} events`, trend: "3 awards" },
          { icon: Bell, label: "Pending Notices", value: `${unread}`, trend: unread > 0 ? `${unread} unread` : "All caught up" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl bg-navy-dark/60 border border-gold/25 p-5">
              <Icon className="h-6 w-6 text-gold mb-3" />
              <p className="text-[10.5px] tracking-luxe uppercase text-cream/60 font-semibold mb-1">{s.label}</p>
              <p className="font-heading text-[26px] font-bold text-cream leading-none">{s.value}</p>
              <p className="text-[11.5px] text-gold-light mt-1.5">{s.trend}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="mt-7">
        <h4 className="font-heading text-[18px] font-bold text-cream mb-3">Recent Activity</h4>
        <div className="space-y-2.5">
          {[
            { icon: Trophy, text: `Participated in ${student.participation[0]?.event || "Inter-House Elocution"}`, time: "2 days ago", tone: "good" },
            { icon: FileText, text: "Term 1 report card published", time: "1 week ago", tone: "info" },
            { icon: Bell, text: `New notice: ${notices[0]?.title || "Parent–Teacher Meeting"}`, time: "3 days ago", tone: "warn" },
            { icon: CheckCircle2, text: "Attended all classes this week", time: "Today", tone: "good" },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-navy-dark/40 border border-gold/15">
                <span className={`grid place-items-center h-10 w-10 rounded-xl shrink-0 ${a.tone === "good" ? "bg-gold/20 text-gold-light" : a.tone === "warn" ? "bg-maroon/30 text-gold-light" : "bg-navy-light/40 text-cream"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-cream/90 leading-tight">{a.text}</p>
                  <p className="text-[11.5px] text-cream/55 mt-0.5 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {a.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------- TAB: REPORT CARDS ----------------------- */
function ReportTab({ student }: { student: Student }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-heading text-[24px] font-bold text-cream mb-1">Report Cards</h3>
          <p className="text-[13.5px] text-cream/70">Download or print your child&apos;s term-wise report card.</p>
        </div>
        <Button className="rounded-full bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold">
          <Download className="h-4 w-4 mr-1.5" />
          Download All
        </Button>
      </div>

      {student.reportCards.map((rc) => (
        <div key={rc.id} className="rounded-2xl bg-navy-dark/50 border border-gold/25 p-6 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-heading text-[20px] font-bold text-cream">{rc.term}</h4>
            <span className="rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-[11px] tracking-luxe uppercase text-gold-light font-semibold">
              Grade A · 90%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gold/20 text-[12px] tracking-luxe uppercase text-gold-light">
                  <th className="py-2 pr-4 font-semibold">Subject</th>
                  <th className="py-2 px-4 font-semibold">Marks</th>
                  <th className="py-2 px-4 font-semibold">Grade</th>
                  <th className="py-2 px-4 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {rc.subjects.map((s) => (
                  <tr key={s.id} className="border-b border-gold/10 last:border-0 text-cream">
                    <td className="py-3 pr-4 text-[14px] font-medium">{s.name}</td>
                    <td className="py-3 px-4 text-[14px] text-cream/80">{s.marks}/100</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center justify-center h-7 w-9 rounded-md bg-gold/15 border border-gold/40 text-gold-light text-[12px] font-bold">{s.grade}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-1.5 w-32 rounded-full bg-navy-light/40 overflow-hidden">
                        <div className="h-full bg-gold-gradient" style={{ width: `${s.marks}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rc.remarks && (
            <p className="mt-5 text-[14px] text-cream/80 italic leading-relaxed">
              <span className="text-gold-light font-medium not-italic">Teacher&apos;s remarks: </span>
              {rc.remarks}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <Button className="rounded-full bg-navy text-cream hover:bg-navy-light px-5 py-2.5 text-[13px]">
              <Download className="h-4 w-4 mr-1.5" />
              Download PDF
            </Button>
            <Button variant="outline" className="rounded-full border-gold/40 text-gold-light hover:bg-gold/10 hover:text-cream px-5 py-2.5 text-[13px]">
              <Share2 className="h-4 w-4 mr-1.5" />
              Share with Family
            </Button>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ----------------------- TAB: NOTICES ----------------------- */
function NoticeTab({ notices, onMarkRead }: { notices: Notice[]; onMarkRead: (id: string) => Promise<void> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
      <h3 className="font-heading text-[24px] font-bold text-cream mb-1">School Notices</h3>
      <p className="text-[13.5px] text-cream/70 mb-6">Stay updated with the latest from Ridgewood.</p>

      <div className="space-y-4">
        {notices.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => !n.read && onMarkRead(n.id)}
            className={`group flex items-start gap-4 rounded-2xl border p-5 hover:border-gold/60 transition-all cursor-pointer ${
              n.read ? "bg-navy-dark/30 border-gold/15" : "bg-navy-dark/50 border-gold/40"
            }`}
          >
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 border border-gold/30 text-gold-light shrink-0">
              <Bell className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] tracking-luxe uppercase font-semibold border ${
                  n.tag === "Important"
                    ? "bg-gold/15 border-gold/40 text-gold-light"
                    : n.tag === "Holiday"
                    ? "bg-navy-light/40 border-cream/30 text-cream"
                    : "bg-maroon/30 border-maroon/40 text-gold-light"
                }`}>
                  {n.tag === "Important" && <AlertCircle className="h-3 w-3" />}
                  {n.tag}
                </span>
                <span className="text-[12px] text-cream/60 flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {n.date}
                </span>
                {!n.read && <span className="text-[10px] tracking-luxe uppercase text-gold font-bold">NEW</span>}
              </div>
              <h4 className="font-heading text-[17px] font-bold text-cream mb-1.5 leading-tight">{n.title}</h4>
              <p className="text-[13.5px] text-cream/75 leading-relaxed">{n.body}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gold/50 group-hover:translate-x-1 transition-transform shrink-0 mt-2" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ----------------------- TAB: PARTICIPATION ----------------------- */
function ParticipationTab({ student }: { student: Student }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
      <h3 className="font-heading text-[24px] font-bold text-cream mb-1">Participation &amp; Achievements</h3>
      <p className="text-[13.5px] text-cream/70 mb-6">Every event your child has been part of this academic year.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {student.participation.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group rounded-2xl bg-navy-dark/50 border border-gold/25 p-5 hover:border-gold/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-gold/15 border border-gold/30 text-gold-light">
                <Trophy className="h-5 w-5" />
              </span>
              {p.result.includes("1st") && <span className="text-[20px]" aria-hidden>🥇</span>}
              {p.result.includes("2nd") && <span className="text-[20px]" aria-hidden>🥈</span>}
              {p.result === "Participation" && <Star className="h-5 w-5 text-cream/60" />}
              {p.result === "Best Project" && <span className="text-[18px]" aria-hidden>🏆</span>}
            </div>
            <p className="text-[10.5px] tracking-luxe uppercase text-gold-light font-semibold mb-1">{p.category}</p>
            <h4 className="font-heading text-[18px] font-bold text-cream leading-tight mb-1.5">{p.event}</h4>
            <p className="text-[12px] text-cream/60 mb-2.5 flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {p.date}
            </p>
            <p className="text-[13px] text-cream/85 font-medium">
              Result: <span className="text-gold-light">{p.result}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ----------------------- TAB: GALLERY (with share/download) ----------------------- */

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  date: string | null;
  tag: string;
  type: string;
}

function GalleryTab() {
  const [items, setItems] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<GalleryItem | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setItems(d.items.map((it: any) => ({
        id: it.id,
        src: it.imageUrl,
        title: it.title,
        date: it.date,
        tag: it.tag,
        type: it.type,
      }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (item: GalleryItem) => {
    toast({ title: "Download started", description: `"${item.title}" will be saved to your device.` });
    const a = document.createElement("a");
    a.href = item.src;
    a.download = item.src.split("/").pop() || "ridgewood-photo";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleShare = (platform: string, item: GalleryItem) => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${item.src}` : item.src;
    const shareText = `Our little one at Ridgewood School, Mirganj — ${item.title}. So proud! 🌟`;
    let url = "";
    if (platform === "whatsapp") {
      url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    } else if (platform === "instagram") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(shareText + " " + shareUrl).catch(() => {});
      }
      toast({ title: "Ready for Instagram Stories", description: "Caption + link copied. Paste into your story." });
      return;
    } else if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    } else if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === "native") {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        (navigator as any).share({ title: item.title, text: shareText, url: shareUrl }).catch(() => {});
        return;
      }
      toast({ title: "Sharing not available", description: "Try one of the social platforms below." });
      return;
    }
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=540");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-7 w-7 animate-spin mx-auto text-gold" />
        <p className="mt-2 text-cream/70 text-sm">Loading gallery…</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="font-heading text-[24px] font-bold text-cream mb-1">School Gallery</h3>
          <p className="text-[13.5px] text-cream/70">Photos &amp; videos of school activities — download or share to your stories.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelected(item)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/25 hover:border-gold/60 transition-all"
          >
            <img
              src={item.src}
              alt={item.title}
             
             
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/10 to-transparent opacity-90" />
            <span className="absolute top-2.5 left-2.5 rounded-full bg-navy-dark/70 backdrop-blur-sm border border-gold/40 px-2 py-0.5 text-[9.5px] tracking-luxe uppercase text-gold-light font-semibold">{item.tag}</span>
            <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="grid place-items-center h-8 w-8 rounded-full bg-cream/90 text-navy backdrop-blur-sm"><Download className="h-3.5 w-3.5" /></span>
              <span className="grid place-items-center h-8 w-8 rounded-full bg-cream/90 text-navy backdrop-blur-sm"><Share2 className="h-3.5 w-3.5" /></span>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-3 text-left">
              <p className="text-[13px] font-semibold text-cream leading-tight line-clamp-2">{item.title}</p>
              {item.date && item.date !== "—" && <p className="text-[10.5px] text-cream/65 mt-0.5">{item.date}</p>}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setSelected(null)} className="fixed inset-0 z-[100] bg-navy-dark/90 backdrop-blur-md grid place-items-center p-4 sm:p-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()} className="relative max-w-4xl w-full grid lg:grid-cols-12 gap-4 bg-navy-gradient rounded-3xl border border-gold/30 overflow-hidden shadow-luxe">
              <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto">
                <img src={selected.src} alt={selected.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-0.5 text-[10px] tracking-luxe uppercase text-gold-light font-semibold mb-2">{selected.tag}</span>
                    <h4 className="font-heading text-[22px] font-bold text-cream leading-tight">{selected.title}</h4>
                    {selected.date && selected.date !== "—" && <p className="text-[12.5px] text-cream/60 mt-1 flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{selected.date}</p>}
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Close" className="grid place-items-center h-9 w-9 rounded-full bg-navy-dark/60 border border-gold/30 text-cream hover:bg-gold hover:text-navy transition-colors"><X className="h-4 w-4" /></button>
                </div>
                <p className="text-[13.5px] text-cream/75 leading-relaxed mb-6">Captured at Ridgewood School, Mirganj — moments worth celebrating.</p>
                <div className="space-y-3 mt-auto">
                  <Button onClick={() => handleDownload(selected)} className="w-full rounded-full bg-gold-gradient text-navy-dark font-semibold hover:shadow-gold">
                    <Download className="h-4 w-4 mr-1.5" />
                    Download Photo
                  </Button>
                  <div>
                    <p className="text-[11px] tracking-luxe uppercase text-cream/55 font-semibold mb-2">Share to your Stories</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "whatsapp", label: "WhatsApp", color: "bg-[#25D366] text-white", icon: "💬" },
                        { id: "instagram", label: "Instagram", color: "bg-[#E1306C] text-white", icon: "📷" },
                        { id: "facebook", label: "Facebook", color: "bg-[#1877F2] text-white", icon: "f" },
                        { id: "native", label: "More…", color: "bg-gold/20 text-gold-light", icon: "…" },
                      ].map((s) => (
                        <button key={s.id} onClick={() => handleShare(s.id, selected)} className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border border-gold/25 hover:border-gold/60 transition-all ${s.color}`}>
                          <span className="text-[18px] leading-none font-bold">{s.icon}</span>
                          <span className="text-[10px] font-medium tracking-wide">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
