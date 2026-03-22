import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Printer } from "lucide-react";
import { motion } from "motion/react";

interface CoverLetterPageProps {
  coverLetter: string;
  isLoading: boolean;
}

export default function CoverLetterPage({
  coverLetter,
  isLoading,
}: CoverLetterPageProps) {
  const paragraphs = coverLetter.split("\n\n").filter(Boolean);

  return (
    <section
      className="container mx-auto max-w-6xl px-6 py-12"
      data-ocid="coverletter.section"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono-code text-xs text-primary tracking-widest uppercase mb-2">
            cover_letter
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground">
            Cover Letter
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
        className="max-w-3xl"
      >
        <div className="cyber-border rounded-xl p-8 sm:p-12">
          {isLoading ? (
            <div className="space-y-4">
              {["a", "b", "c", "d", "e"].map((k) => (
                <div key={k}>
                  <Skeleton className="h-4 w-full mb-1.5 bg-muted" />
                  <Skeleton className="h-4 w-5/6 bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {paragraphs.map((para) => (
                <p
                  key={para.slice(0, 30)}
                  className={`leading-relaxed text-foreground/85 ${para.startsWith("Sincerely") ? "mt-8" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
