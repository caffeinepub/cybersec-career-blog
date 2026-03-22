import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { BlogPost } from "../backend.d";

interface BlogPageProps {
  posts: BlogPost[];
  isLoading: boolean;
  isError: boolean;
  initialPost?: BlogPost | null;
  onClearInitialPost: () => void;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostDetail({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        data-ocid="blog.back.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all posts
      </Button>
      <article>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary/30 text-primary/80 bg-primary/5"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8 pb-6 border-b border-border">
          <Calendar className="w-4 h-4" />
          <span className="font-mono-code">{formatDate(post.date)}</span>
        </div>
        <div className="space-y-4">
          {post.content.split("\n\n").map((para) => (
            <p
              key={para.slice(0, 40)}
              className="text-foreground/85 leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

export default function BlogPage({
  posts,
  isLoading,
  isError,
  initialPost,
  onClearInitialPost,
}: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(
    initialPost ?? null,
  );

  const handleBack = () => {
    setSelectedPost(null);
    onClearInitialPost();
  };
  const handleSelect = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div
        className="container mx-auto max-w-6xl px-6 py-12"
        data-ocid="blog.loading_state"
      >
        <div className="space-y-4">
          {["a", "b", "c"].map((k) => (
            <div key={k} className="cyber-border rounded-lg p-6">
              <Skeleton className="h-4 w-32 mb-3 bg-muted" />
              <Skeleton className="h-6 w-3/4 mb-2 bg-muted" />
              <Skeleton className="h-4 w-full mb-1 bg-muted" />
              <Skeleton className="h-4 w-2/3 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="container mx-auto max-w-6xl px-6 py-12 text-center"
        data-ocid="blog.error_state"
      >
        <p className="text-destructive">
          Failed to load blog posts. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl px-6 py-12">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <PostDetail key="detail" post={selectedPost} onBack={handleBack} />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-10">
              <p className="font-mono-code text-xs text-primary tracking-widest uppercase mb-2">
                blog_posts
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground">
                Articles
              </h1>
              <p className="text-muted-foreground mt-2">
                Explorations in cybersecurity frameworks, governance, and
                legal-technical strategy.
              </p>
            </div>
            <div className="space-y-4" data-ocid="blog.list">
              {posts.map((post, i) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i, duration: 0.4 }}
                  data-ocid={`blog.item.${i + 1}`}
                  className="cyber-border rounded-lg p-6 cursor-pointer group hover:border-primary/40 transition-all"
                  onClick={() => handleSelect(post)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-accent/30 text-accent/70 bg-accent/5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground/60 text-xs font-mono-code sm:mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
