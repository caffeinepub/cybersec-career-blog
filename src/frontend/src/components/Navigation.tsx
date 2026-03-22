import { Shield } from "lucide-react";

type Page = "home" | "blog" | "coverletter" | "resume";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  const links: { id: Page; label: string; ocid: string }[] = [
    { id: "home", label: "Home", ocid: "nav.home.link" },
    { id: "blog", label: "Blog", ocid: "nav.blog.link" },
    { id: "coverletter", label: "Cover Letter", ocid: "nav.coverletter.link" },
    { id: "resume", label: "Resume", ocid: "nav.resume.link" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-semibold text-foreground tracking-tight hidden sm:block">
            CyberCareer
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => onNavigate(link.id)}
              data-ocid={link.ocid}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                currentPage === link.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
