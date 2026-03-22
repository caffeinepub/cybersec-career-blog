import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  GraduationCap,
  Printer,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import type { Education } from "../backend.d";

interface ResumePageProps {
  resumeTitle: string;
  skills: string[];
  education: Education[];
  isLoading: boolean;
}

const COMPETENCIES = [
  {
    area: "NIST Framework Application",
    desc: "Applying CSF to legal and technical risk management",
  },
  {
    area: "Supply Chain Security",
    desc: "Evaluating third-party risk and supplier obligations",
  },
  {
    area: "IT Governance",
    desc: "Organizational structure and security operations",
  },
  {
    area: "Patch Management",
    desc: "Policy development and compliance enforcement",
  },
  {
    area: "Cybersecurity Law",
    desc: "Bridging legal compliance with technical controls",
  },
  {
    area: "Global Policy Analysis",
    desc: "Critical infrastructure governance frameworks",
  },
];

const BULLETS = [
  "Tutored students in 300-level cybersecurity course covering NIST frameworks, IT governance, security operations, and policy",
  "Developed instructional materials explaining complex cybersecurity topics for diverse learning styles",
  "Supported student understanding of patch management, SSO roles, and supply chain security concepts",
  "Guided students through risk management frameworks and organizational cybersecurity practices",
];

const DEFAULT_SKILLS = [
  "NIST Cybersecurity Framework",
  "Risk Management",
  "Supply Chain Security",
  "IT Governance",
  "Patch Management",
  "Security Policy Development",
  "Cybersecurity Law & Compliance",
  "System Security Operations",
  "Technical Writing",
  "Curriculum Development",
];

export default function ResumePage({
  resumeTitle,
  skills,
  education,
  isLoading,
}: ResumePageProps) {
  const displaySkills = skills.length > 0 ? skills : DEFAULT_SKILLS;

  return (
    <section
      className="container mx-auto max-w-6xl px-6 py-12"
      data-ocid="resume.section"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono-code text-xs text-primary tracking-widest uppercase mb-2">
            resume
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground">
            Resume
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="no-print gap-2 border-border/60 text-muted-foreground hover:text-foreground"
        >
          <Printer className="w-4 h-4" /> Print
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-8"
      >
        <div className="cyber-border rounded-xl p-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-1">
            Your Name
          </h2>
          {isLoading ? (
            <Skeleton className="h-5 w-64 bg-muted" />
          ) : (
            <p className="text-primary font-medium">{resumeTitle}</p>
          )}
          <p className="text-muted-foreground text-sm mt-2">
            Old Dominion University · Norfolk, VA
          </p>
        </div>

        <div className="cyber-border rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Work Experience
            </h3>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <h4 className="font-semibold text-foreground">
                Cybersecurity Tutor
              </h4>
              <span className="font-mono-code text-xs text-muted-foreground">
                2022 – Present
              </span>
            </div>
            <p className="text-primary text-sm mb-3">
              Old Dominion University · Norfolk, VA
            </p>
            <ul className="space-y-2">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet.slice(0, 20)}
                  className="flex gap-2 text-sm text-foreground/80 leading-relaxed"
                >
                  <span className="text-primary mt-1.5 flex-shrink-0">›</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cyber-border rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Education
            </h3>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-48 bg-muted" />
              <Skeleton className="h-4 w-72 bg-muted" />
            </div>
          ) : (
            <div className="space-y-4">
              {education.length > 0 ? (
                education.map((edu) => (
                  <div key={edu.institution}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <h4 className="font-semibold text-foreground">
                        {edu.institution}
                      </h4>
                      <span className="font-mono-code text-xs text-muted-foreground">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    <p className="text-primary text-sm">{edu.degree}</p>
                  </div>
                ))
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <h4 className="font-semibold text-foreground">
                      Old Dominion University
                    </h4>
                    <span className="font-mono-code text-xs text-muted-foreground">
                      2022 – Present
                    </span>
                  </div>
                  <p className="text-primary text-sm">
                    Bachelor of Science in Cybersecurity
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cyber-border rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Technical Skills
            </h3>
          </div>
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                <Skeleton key={k} className="h-7 w-32 rounded-full bg-muted" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {displaySkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-border text-foreground/80 bg-muted/40 hover:border-primary/40 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        <div className="cyber-border rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Cybersecurity Competencies
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {COMPETENCIES.map((comp) => (
              <div
                key={comp.area}
                className="border border-border rounded-lg p-4 bg-muted/20 hover:border-primary/30 transition-colors"
              >
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {comp.area}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
