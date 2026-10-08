"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { GoldRule, LeafMark, BrandLogo, CirclePattern } from "./ornament";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Lock,
  ShieldAlert,
  Plus,
  Trash2,
  ChevronRight,
  GraduationCap,
  FileText,
  Bell,
  Trophy,
  Eye,
} from "lucide-react";

const STAFF_EMAILS = ["Ridgewoodmirganj@gmail.com", "admin@ridgewoodmirganj.in"];
function isStaff(email?: string | null): boolean {
  if (!email) return false;
  return STAFF_EMAILS.includes(email.toLowerCase());
}

export function AdminPanel() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [students, setStudents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedStudent, setExpandedStudent] = React.useState<string | null>(null);

  const staffEmail = session?.user?.email || null;
  const canManage = isStaff(staffEmail);

  React.useEffect(() => {
    if (status === "authenticated" && canManage) {
      fetch("/api/admin/students")
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((d) => setStudents(d.students || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [status, canManage]);

  return (
    <section id="admin-panel" className="relative anchor-offset bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[11.5px] tracking-luxe uppercase text-gold-dark font-medium mb-3">
            <LeafMark size={16} />
            Admin Dashboard
          </div>
          <h2 className="font-heading text-royal-gradient animate-gradient-flow font-bold leading-tight text-[26px] sm:text-[34px] text-balance">
            Manage students, report cards &amp; notices
          </h2>
        </div>

        {status !== "authenticated" ? (
          <div className="rounded-[1.75rem] bg-navy-gradient text-cream p-7 sm:p-9 text-center shadow-navy relative overflow-hidden">
            <CirclePattern color="oklch(0.78 0.13 75 / 0.12)" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
            <div className="relative">
              <BrandLogo variant="full" size={56} tone="white" className="mx-auto" />
              <h3 className="font-heading text-[18px] font-bold mt-3 mb-2">Staff sign-in required</h3>
              <p className="text-cream/80 text-[13.5px] mb-4">Sign in with a staff account to manage school data.</p>
              <a href="#parent-login" className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-navy-dark font-semibold px-5 py-2.5 text-[13px] hover:shadow-gold transition-all">
                <Lock className="h-3.5 w-3.5" /> Sign in as Staff
              </a>
            </div>
          </div>
        ) : !canManage ? (
          <div className="rounded-[1.75rem] bg-card border-2 border-maroon/30 p-7 sm:p-9 text-center shadow-luxe">
            <ShieldAlert className="h-10 w-10 text-maroon mx-auto mb-3" />
            <h3 className="font-heading text-[18px] font-bold text-navy mb-2">Parent account — admin access not available</h3>
            <p className="text-navy/70 text-[13.5px] max-w-sm mx-auto">
              Only school staff can manage students, report cards, and notices.
            </p>
          </div>
        ) : (
          <AdminContent students={students} loading={loading} expandedStudent={expandedStudent} setExpandedStudent={setExpandedStudent} toast={toast} setStudents={setStudents} />
        )}
      </div>
    </section>
  );
}

function AdminContent({ students, loading, expandedStudent, setExpandedStudent, toast, setStudents }: any) {
  const [showAddStudent, setShowAddStudent] = React.useState(false);
  const [showAddNotice, setShowAddNotice] = React.useState(false);
  const [showAddReport, setShowAddReport] = React.useState<string | null>(null);
  const [showAddPart, setShowAddPart] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Quick action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setShowAddStudent(!showAddStudent)} className="rounded-full bg-navy text-cream hover:bg-navy-dark px-5 py-2.5 text-[13px]">
          <Plus className="h-4 w-4 mr-1.5" /> Add Student
        </Button>
        <Button onClick={() => setShowAddNotice(!showAddNotice)} className="rounded-full bg-navy text-cream hover:bg-navy-dark px-5 py-2.5 text-[13px]">
          <Plus className="h-4 w-4 mr-1.5" /> Add Notice
        </Button>
      </div>

      {/* Add Student form */}
      {showAddStudent && <AddStudentForm toast={toast} setStudents={setStudents} onClose={() => setShowAddStudent(false)} />}

      {/* Add Notice form */}
      {showAddNotice && <AddNoticeForm toast={toast} onClose={() => setShowAddNotice(false)} />}

      {/* Student list */}
      {loading ? (
        <div className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-gold-dark" /></div>
      ) : students.length === 0 ? (
        <p className="text-center text-navy/55 text-[13.5px] py-8">No students yet. Add one above.</p>
      ) : (
        <div className="space-y-3">
          {students.map((s: any) => (
            <div key={s.id} className="rounded-2xl border border-navy/10 bg-card overflow-hidden shadow-soft">
              <button
                onClick={() => setExpandedStudent(expandedStudent === s.id ? null : s.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-cream/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-10 w-10 rounded-xl bg-navy text-cream font-heading font-bold text-[14px]">
                    {s.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-heading text-[15px] font-bold text-navy">{s.name}</p>
                    <p className="text-[12px] text-navy/60">{s.classSection} · {s.parent?.name} ({s.parent?.phone})</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-navy/50">{s.reportCards.length} reports · {s.participation.length} events</span>
                  <ChevronRight className={`h-4 w-4 text-navy/40 transition-transform ${expandedStudent === s.id ? "rotate-90" : ""}`} />
                </div>
              </button>

              {expandedStudent === s.id && (
                <div className="border-t border-navy/10 p-4 space-y-4 bg-cream/30">
                  {/* Add report card button */}
                  <Button onClick={() => setShowAddReport(showAddReport === s.id ? null : s.id)} variant="outline" className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-4 py-2 text-[12px]">
                    <FileText className="h-3.5 w-3.5 mr-1.5" /> Add Report Card
                  </Button>

                  {showAddReport === s.id && <AddReportCardForm studentId={s.id} toast={toast} onClose={() => setShowAddReport(null)} />}

                  {/* Existing report cards */}
                  {s.reportCards.map((rc: any) => (
                    <div key={rc.id} className="rounded-xl bg-card border border-navy/10 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-heading text-[13px] font-bold text-navy">{rc.term}</p>
                        <DeleteButton endpoint="/api/admin/report-cards" id={rc.id} toast={toast} label="report card" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {rc.subjects.map((sub: any) => (
                          <div key={sub.id} className="text-[11.5px] text-navy/70 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                            {sub.name}: {sub.marks} ({sub.grade})
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add participation button */}
                  <Button onClick={() => setShowAddPart(showAddPart === s.id ? null : s.id)} variant="outline" className="rounded-full border-navy/25 text-navy hover:bg-navy hover:text-cream px-4 py-2 text-[12px]">
                    <Trophy className="h-3.5 w-3.5 mr-1.5" /> Add Participation
                  </Button>

                  {showAddPart === s.id && <AddParticipationForm studentId={s.id} toast={toast} onClose={() => setShowAddPart(null)} />}

                  {/* Existing participation */}
                  {s.participation.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl bg-card border border-navy/10 p-3">
                      <div>
                        <p className="text-[12.5px] font-semibold text-navy">{p.event}</p>
                        <p className="text-[11px] text-navy/55">{p.date} · {p.category} · {p.result}</p>
                      </div>
                      <DeleteButton endpoint="/api/admin/participation" id={p.id} toast={toast} label="entry" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddStudentForm({ toast, setStudents, onClose }: any) {
  const [name, setName] = React.useState("");
  const [rollNo, setRollNo] = React.useState("");
  const [classSection, setClassSection] = React.useState("");
  const [classTeacher, setClassTeacher] = React.useState("");
  const [parentName, setParentName] = React.useState("");
  const [parentPhone, setParentPhone] = React.useState("");
  const [parentEmail, setParentEmail] = React.useState("");
  const [password, setPassword] = React.useState("ridgewood123");
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !parentName || !parentPhone) {
      toast({ title: "Name, parent name and phone are required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, classSection, classTeacher, parentName, parentPhone, parentEmail, parentPassword: password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast({ title: "Student added! 🎉", description: `${name} linked to ${parentName}. Parent login: ${parentPhone} / ${password}` });
      // Refresh student list
      fetch("/api/admin/students").then(r => r.json()).then(d => setStudents(d.students || []));
      onClose();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/25 bg-card p-5 shadow-soft space-y-3">
      <h3 className="font-heading text-[15px] font-bold text-navy mb-2">New Student + Parent Account</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <Input label="Student Name *" value={name} onChange={setName} placeholder="e.g. Aarohi Sharma" />
        <Input label="Roll No" value={rollNo} onChange={setRollNo} placeholder="e.g. RW-2025-0089" />
        <Input label="Class & Section" value={classSection} onChange={setClassSection} placeholder="e.g. Year 3 · Section B" />
        <Input label="Class Teacher" value={classTeacher} onChange={setClassTeacher} placeholder="e.g. Ms Priya Verma" />
        <Input label="Parent Name *" value={parentName} onChange={setParentName} placeholder="e.g. Mr & Mrs Sharma" />
        <Input label="Parent Phone (10-digit) *" value={parentPhone} onChange={(v) => setParentPhone(v.replace(/\D/g, "").slice(0, 10))} placeholder="e.g. 9876543210" />
        <Input label="Parent Email" value={parentEmail} onChange={setParentEmail} placeholder="parent@email.com" />
        <Input label="Parent Password" value={password} onChange={setPassword} placeholder="ridgewood123" />
      </div>
      <Button type="submit" disabled={submitting} className="w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3 text-[13px]">
        {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding…</> : <><Plus className="h-4 w-4 mr-2" /> Add Student</>}
      </Button>
    </form>
  );
}

function AddReportCardForm({ studentId, toast, onClose }: any) {
  const [term, setTerm] = React.useState("Term 1 · 2025–26");
  const [remarks, setRemarks] = React.useState("");
  const [subjects, setSubjects] = React.useState([{ name: "", marks: "90", grade: "A" }]);
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validSubjects = subjects.filter((s: any) => s.name.trim());
    if (validSubjects.length === 0) { toast({ title: "Add at least one subject", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/report-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, term, remarks, subjects: validSubjects }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast({ title: "Report card added! 🎉" });
      onClose();
      // Trigger refresh
      window.location.reload();
    } catch (err: any) { toast({ title: "Failed", description: err.message, variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/25 bg-card p-5 shadow-soft space-y-3">
      <h3 className="font-heading text-[15px] font-bold text-navy">New Report Card</h3>
      <Input label="Term" value={term} onChange={setTerm} />
      <Input label="Teacher's Remarks" value={remarks} onChange={setRemarks} placeholder="e.g. Excellent progress…" />
      <div className="space-y-2">
        <p className="text-[12px] font-semibold text-navy">Subjects</p>
        {subjects.map((s: any, i: number) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <input className="col-span-6 rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold" placeholder="Subject name" value={s.name} onChange={(e) => { const n = [...subjects]; n[i].name = e.target.value; setSubjects(n); }} />
            <input className="col-span-3 rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy focus:outline-none focus:border-gold" type="number" min="0" max="100" placeholder="Marks" value={s.marks} onChange={(e) => { const n = [...subjects]; n[i].marks = e.target.value; setSubjects(n); }} />
            <input className="col-span-2 rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy focus:outline-none focus:border-gold" placeholder="Grade" value={s.grade} onChange={(e) => { const n = [...subjects]; n[i].grade = e.target.value; setSubjects(n); }} />
            {subjects.length > 1 && <button type="button" onClick={() => setSubjects(subjects.filter((_: any, j: number) => j !== i))} className="col-span-1 grid place-items-center text-navy/40 hover:text-maroon"><Trash2 className="h-4 w-4" /></button>}
          </div>
        ))}
        <button type="button" onClick={() => setSubjects([...subjects, { name: "", marks: "90", grade: "A" }])} className="text-[12px] text-navy font-medium hover:text-gold-dark"><Plus className="h-3.5 w-3.5 inline mr-1" />Add subject</button>
      </div>
      <Button type="submit" disabled={submitting} className="w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3 text-[13px]">
        {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding…</> : <><Plus className="h-4 w-4 mr-2" /> Add Report Card</>}
      </Button>
    </form>
  );
}

function AddNoticeForm({ toast, onClose }: any) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tag, setTag] = React.useState("Important");
  const [date, setDate] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) { toast({ title: "Title and body required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, tag, date }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast({ title: "Notice added! 🎉" });
      onClose();
    } catch (err: any) { toast({ title: "Failed", description: err.message, variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/25 bg-card p-5 shadow-soft space-y-3">
      <h3 className="font-heading text-[15px] font-bold text-navy">New Notice</h3>
      <Input label="Title *" value={title} onChange={setTitle} placeholder="e.g. Parent–Teacher Meeting" />
      <div className="space-y-1.5">
        <label className="text-[12px] font-semibold text-navy">Body *</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="Notice details…" className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy focus:outline-none focus:border-gold resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-navy">Tag</label>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy focus:outline-none focus:border-gold cursor-pointer">
            <option>Important</option><option>Holiday</option><option>Event</option><option>General</option>
          </select>
        </div>
        <Input label="Date" value={date} onChange={setDate} placeholder="e.g. Oct 11, 2025" />
      </div>
      <Button type="submit" disabled={submitting} className="w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3 text-[13px]">
        {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding…</> : <><Plus className="h-4 w-4 mr-2" /> Add Notice</>}
      </Button>
    </form>
  );
}

function AddParticipationForm({ studentId, toast, onClose }: any) {
  const [event, setEvent] = React.useState("");
  const [date, setDate] = React.useState("");
  const [result, setResult] = React.useState("Participation");
  const [category, setCategory] = React.useState("Academics");
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) { toast({ title: "Event name required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, event, date, result, category }),
      });
      const r = await res.json();
      if (!res.ok) throw new Error(r.error);
      toast({ title: "Participation added! 🎉" });
      onClose();
      window.location.reload();
    } catch (err: any) { toast({ title: "Failed", description: err.message, variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/25 bg-card p-5 shadow-soft space-y-3">
      <h3 className="font-heading text-[15px] font-bold text-navy">New Participation Entry</h3>
      <Input label="Event *" value={event} onChange={setEvent} placeholder="e.g. Inter-House Elocution" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Date" value={date} onChange={setDate} placeholder="e.g. Sep 12, 2025" />
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-navy">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy focus:outline-none focus:border-gold cursor-pointer">
            <option>Academics</option><option>Literary</option><option>Sports</option><option>Music</option><option>Art & Craft</option>
          </select>
        </div>
      </div>
      <Input label="Result" value={result} onChange={setResult} placeholder="e.g. 1st Place / Participation" />
      <Button type="submit" disabled={submitting} className="w-full rounded-full bg-navy text-cream hover:bg-navy-dark py-3 text-[13px]">
        {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding…</> : <><Plus className="h-4 w-4 mr-2" /> Add Entry</>}
      </Button>
    </form>
  );
}

function DeleteButton({ endpoint, id, toast, label }: any) {
  const [deleting, setDeleting] = React.useState(false);
  const del = async () => {
    if (!confirm(`Delete this ${label}?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Deleted" });
      window.location.reload();
    } catch { toast({ title: "Delete failed", variant: "destructive" }); }
    finally { setDeleting(false); }
  };
  return <button onClick={del} disabled={deleting} className="text-navy/40 hover:text-maroon transition-colors" aria-label={`Delete ${label}`}><Trash2 className={`h-4 w-4 ${deleting ? "animate-spin" : ""}`} /></button>;
}

function Input({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[12px] font-semibold text-navy">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2 text-[13px] text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
    </div>
  );
}
