import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { BlogPost } from "./backend.d";
import BlogPage from "./components/BlogPage";
import CoverLetterPage from "./components/CoverLetterPage";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import ResumePage from "./components/ResumePage";
import { useActor } from "./hooks/useActor";
import {
  useAddBlogPost,
  useGetAllBlogPosts,
  useGetCoverLetter,
  useGetEducation,
  useGetResumeTitle,
  useGetSkills,
  useInitialize,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

type Page = "home" | "blog" | "coverletter" | "resume";

const COVER_LETTER = `Dear Hiring Manager,

I am writing to express my strong interest in a cybersecurity role within your organization. As a cybersecurity student and educator at Old Dominion University, where I served as a tutor for a 300-level cybersecurity course, I have developed both a deep theoretical foundation and hands-on instructional experience with core cybersecurity principles.

Through my coursework and tutoring, I have guided students through complex topics including the NIST Cybersecurity Framework, organizational IT structures, the role of the System Security Officer, patch management policies, and cybersecurity governance at both national and global levels. My ability to communicate these technical and policy-driven subjects clearly reflects my commitment to making cybersecurity accessible and actionable.

My long-term goal is to establish a cybersecurity law firm that bridges the gap between legal compliance and technical security. I aim to help organizations draft stronger supplier contracts, reduce legal liability, and build customer trust using frameworks like NIST as both legal and technical guides.

I bring a combination of analytical thinking, strong written communication, and a passion for cybersecurity policy that I believe would be a strong asset to your team. I am eager to contribute to an organization committed to proactive, strategic cybersecurity.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my background aligns with your needs.

Sincerely,
[Your Name]`;

const SKILLS = [
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
  "Tutoring & Education",
  "Legal-Technical Analysis",
];

const EDUCATION = [
  {
    institution: "Old Dominion University",
    degree: "Bachelor of Science in Cybersecurity",
    startDate: "2022",
    endDate: "Present",
  },
];

const BLOG_POSTS = [
  {
    title:
      "Leveraging the NIST Cybersecurity Framework: From Risk Management to Legal Strategy",
    tags: ["NIST", "Risk Management", "Supply Chain", "Compliance"],
    summary:
      "How the NIST Cybersecurity Framework provides organizations a common language for risk management, strengthens supply chain security, and can serve as both a legal and technical guide for a cybersecurity law practice.",
    content: `Organizations can gain strengths like common language from the NIST Cybersecurity framework to provide requirements to communicate risk management, for example, a business a Current Profile to report issues and compare them with other data. The framework also strengthens supply chain risk management since supply chains are highly interconnected and face risks from suppliers who introduce vulnerabilities through poor experience or malicious components.\n\nThe framework addresses this by guiding companies to set cybersecurity requirements for suppliers, ensuring that efforts do not overreach by collecting personal data which builds public trust and support, helping organizations track progress, reduce risk, and make better investment decisions. The NIST Framework offers structured, consistent and cost-effective ways to manage cybersecurity while keeping a connection with business and legal obligations that organize practices supported by Implementation Tiers.\n\nIn my future workplace, I plan to create a cybersecurity law firm, and after reading pgs 1-21, I would use the NIST Framework both as a legal and technical guide for clients so I could help businesses draft stronger contracts that ensure that suppliers meet their legal and cybersecurity obligations. Applying the framework's tools my firm would help organizations reduce legal liability, strengthen compliance, and build trust with customers and partners.`,
  },
  {
    title: "IT's Critical Role in Modern Organizations",
    tags: ["IT Management", "Organizational Structure", "Cybersecurity"],
    summary:
      "Exploring how IT fits into organizational structure, the departments it supports, and why a structured IT division is essential for business security and efficiency.",
    content: `Beyond the core functions of operations, marketing, sales, finance, and human resources, there are additional departments that play a very important role within IT. For example, the legal side ensures understanding with laws and regulations, supply chain management oversees movement of materials and products and public relations manages the company's reputation. Each of these fits into the organization by supporting the main mission of delivering a good or service while protecting the company's overall integrity and competitiveness.\n\nIT fits into the organization by providing the infrastructure, security, and systems that ensure that every department functions properly. Without IT, communications, data storage, marketing campaigns, and even financial transactions would be severely compromised. IT can give sensitive company and customer data protected from breaches and attacks to maintain trust and which is crucial.\n\nWithin IT, there are multiple roles and responsibilities. IT manages hardware, software, networks, and data systems and oversees more important tasks such as application development, system architecture, database management, and can provide help desk support for those in need of tech assistance. Each sector needs to work together to ensure that information systems are reliable, efficient, and secure. IT should be organized in a structured manner like subdivisions that include project management, development, testing, architecture, operations, and security. This would allow IT departments to respond effectively to business needs while also safeguarding sensitive information.`,
  },
  {
    title: "The System Security Officer: Guardian of Operational Security",
    tags: ["SSO", "Security Operations", "Cybersecurity Roles"],
    summary:
      "An in-depth look at the System Security Officer role, their daily responsibilities, and why they are indispensable to any organization's cybersecurity posture.",
    content:
      "The System Security Officer is in charge of maintaining operational security of organizational systems for order and efficiency, they work closely with the system owner and other members of the cybersecurity team to ensure that systems operate securely and efficiently. In practice, this means that they monitor the system environment, security policies and ensure proper function with organizational procedures for communication and coordination across departments.\n\nThe SSO makes sure that directives are actually implemented and are responsible for daily security operations, reviewing logs for unusual activity, ensuring patches and updates are applied, and helping to develop and enforce security policies. They are part of the cybersecurity team because security requires ongoing maintenance and quick responses to errors or threats, such as any anomalies or vulnerabilities, within their given software to make sure they are addressed before they escalate.\n\nFor example, if malicious code is detected on a system, the SSO helps coordinate containment and remediation. Furthermore the SSO also enforces and trains users to follow proper security practices, which makes them a vital part in promoting a practice of security within the organization. Without a System Security Officer, organizations would lack a dedicated individual responsible for the daily enforcement of security measures within an organization. This could leave systems vulnerable to threats or overlooked vulnerabilities. Overall the SSO ensures that systems remain up to date and secure, while staying resilient against evolving cyber threats.",
  },
  {
    title: "Patch Management Policy: A Case Study with Titan Financial Group",
    tags: ["Patch Management", "Policy", "Financial Sector"],
    summary:
      "A breakdown of Titan Financial Group's patch management policy, covering timelines, testing procedures, and compliance accountability.",
    content:
      "The Patch Management Policy for Titan Financial Group is designed to keep all systems secure and operations running, they do this by ensuring all devices and applications are regularly updated and maintained. Major patches must be applied within 14 days, while all other updates should be completed within 30 days.\n\nBefore final production the patches will be tested in a safe environment to avoid issues, and tools will keep track of incoming data. Any exceptions or delays must be approved by the IT Security team, and system owners are responsible for compliance.\n\nThis structured approach ensures that vulnerabilities are addressed promptly while maintaining operational stability. The testing environment prevents untested patches from disrupting live systems, and the accountability framework ensures that no system falls through the cracks in the update cycle.",
  },
  {
    title:
      "Rethinking Cybersecurity Governance: Toward Proactive, Global Policy",
    tags: ["Governance", "Policy", "Global Security", "Risk Society"],
    summary:
      "Drawing on Beck, Winner, Nye, Clarke, Rid, and Kello, this essay argues that cybersecurity policy must shift from reactive state-led responses to preventive, collaborative, globally-coordinated frameworks.",
    content: `This study argues that current cybersecurity rules should shift from state-led responses toward stronger private action, better coordination among key service providers, plus joint global efforts. As essential systems grow more connected digitally while commercial networks take on civic functions, authorities find it harder to foresee or manage new digital threats.\n\nUlrich Beck described today's tech-driven world as a "risk society," where advances in technology bring complex dangers that go beyond existing laws and governance. In line with this idea, cybersecurity shows how quickly digital tools develop compared to slow-moving policies. Threats emerge faster than rules can respond. Furthermore, interconnected networks across countries lead to spreading weaknesses — many of which remain unclear or poorly grasped.\n\nLike Langdon Winner noted, today's tech doesn't just support people — it alters how society and authority work by changing where choices happen (Winner 1986). When vital systems rely on digital networks, these tools gain political weight — often exceeding state control. Seen this way, online security isn't only a technical issue; it shifts into moral and governance territory.\n\nAll these vital systems — power grids, water supplies, transport routes, emergency comms, and industrial controls — have quickly shifted to digital formats. As Clarke and Knake point out, such reliance on tech creates strategic weak spots since attackers may go after civilian setups that state bodies don't directly manage.\n\nSince cyber threats change quicker than our ability to predict them, policies ought to stress caution instead of reaction. Clarke and Knake argue nations should set mandatory security standards, use joint accountability frameworks, while having governments actively shape critical tech oversight.\n\nReferences: Beck, U. (1992). Risk society. Sage. Clarke & Knake (2010). Cyber war. HarperCollins. Kello, L. (2017). The virtual weapon and international order. Yale. Nye, J.S. (2010). Cyber power. Harvard Kennedy School. Rid, T. (2013). Cyber war will not take place. Oxford. Winner, L. (1986). The whale and the reactor. University of Chicago Press.`,
  },
];

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const initialized = useRef(false);
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
  } = useGetAllBlogPosts();
  const { data: coverLetter = "" } = useGetCoverLetter();
  const { data: education = [], isLoading: eduLoading } = useGetEducation();
  const { data: skills = [], isLoading: skillsLoading } = useGetSkills();
  const { data: resumeTitle = "", isLoading: rtLoading } = useGetResumeTitle();

  const { mutateAsync: initialize } = useInitialize();
  const { mutateAsync: addBlogPost } = useAddBlogPost();

  useEffect(() => {
    if (!actor || actorFetching || initialized.current || postsLoading) return;
    initialized.current = true;
    if (posts.length === 0) {
      (async () => {
        try {
          await initialize({
            coverLetterText: COVER_LETTER,
            skills: SKILLS,
            educations: EDUCATION,
            resumeTitle: "Cybersecurity Professional & Educator",
          });
          for (const post of BLOG_POSTS) {
            await addBlogPost(post);
          }
        } catch (err) {
          console.error("Initialization error:", err);
        }
      })();
    }
  }, [
    actor,
    actorFetching,
    posts.length,
    postsLoading,
    initialize,
    addBlogPost,
  ]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== "blog") setFeaturedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPost = (post: BlogPost) => {
    setFeaturedPost(post);
    setCurrentPage("blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="flex-1">
        {currentPage === "home" && (
          <HomePage
            posts={posts}
            onNavigate={handleNavigate}
            onOpenPost={handleOpenPost}
          />
        )}
        {currentPage === "blog" && (
          <BlogPage
            posts={posts}
            isLoading={postsLoading}
            isError={postsError}
            initialPost={featuredPost}
            onClearInitialPost={() => setFeaturedPost(null)}
          />
        )}
        {currentPage === "coverletter" && (
          <CoverLetterPage
            coverLetter={coverLetter || COVER_LETTER}
            isLoading={false}
          />
        )}
        {currentPage === "resume" && (
          <ResumePage
            resumeTitle={resumeTitle || "Cybersecurity Professional & Educator"}
            skills={skills}
            education={education}
            isLoading={eduLoading || skillsLoading || rtLoading}
          />
        )}
      </div>
      <footer className="border-t border-border bg-muted/20 mt-auto">
        <div className="container mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs text-primary/60">
              &gt;_
            </span>
            <span>Cybersecurity Professional · ODU</span>
          </div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            © {new Date().getFullYear()}. Built with ♥ using caffeine.ai
          </a>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
