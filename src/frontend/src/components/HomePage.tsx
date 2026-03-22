import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend.d";

type Page = "home" | "blog" | "coverletter" | "resume";

interface HomePageProps {
  posts: BlogPost[];
  onNavigate: (page: Page) => void;
  onOpenPost: (post: BlogPost) => void;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage({
  posts,
  onNavigate,
  onOpenPost,
}: HomePageProps) {
  const featured = posts.slice(0, 3);
  const stats = [
    {
      icon: BookOpen,
      value: `${posts.length || 5}`,
      label: "Published Articles",
    },
    { icon: Shield, value: "NIST", label: "Framework Expert" },
    { icon: Globe, value: "ODU", label: "Cyber Tutor" },
    { icon: Lock, value: "300", label: "Level Course" },
  ];

  return (
    <main>
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-cyber-bg.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 scanline-bg" />
        <div className="relative container mx-auto max-w-6xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono-code text-xs text-primary tracking-widest uppercase">
                Cybersecurity Professional
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-foreground leading-tight mb-4">
              Your{" "}
              <span className="text-primary amber-glow terminal-cursor">
                Name
              </span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Cybersecurity Professional · Legal Tech Strategist · Educator
            </p>
            <p className="text-foreground/80 text-base max-w-2xl mb-10 leading-relaxed">
              Aspiring cybersecurity attorney and educator at Old Dominion
              University. I write about NIST frameworks, organizational
              security, governance policy, and the intersection of law and
              technology. My goal: build a cybersecurity law firm that bridges
              legal compliance with technical security.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => onNavigate("blog")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 gap-2"
              >
                Read My Blog <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onNavigate("resume")}
                variant="outline"
                className="border-border/60 text-foreground hover:bg-muted/60 px-6"
              >
                View Resume
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle at bottom right, oklch(0.72 0.16 65 / 0.4), transparent 60%)",
            }}
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded border border-primary/20 bg-primary/10 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground text-lg leading-none">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-mono-code text-xs text-primary tracking-widest uppercase mb-2">
                featured_posts
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Recent Writing
              </h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate("blog")}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              All posts <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i, duration: 0.5 }}
                className="cyber-border rounded-lg p-5 cursor-pointer group hover:border-primary/40 transition-all"
                onClick={() => onOpenPost(post)}
              >
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-accent/30 text-accent/80 bg-accent/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-display font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs text-muted-foreground/60">
                    {formatDate(post.date)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
              Interested in working together?
            </h3>
            <p className="text-muted-foreground text-sm">
              View my cover letter and resume to learn more about my background.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => onNavigate("coverletter")}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10"
              data-ocid="nav.coverletter.link"
            >
              Cover Letter
            </Button>
            <Button
              onClick={() => onNavigate("resume")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Resume
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
