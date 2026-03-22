import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, Education } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCoverLetter() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["coverLetter"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getCoverLetter();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEducation() {
  const { actor, isFetching } = useActor();
  return useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEducation();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSkills() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetResumeTitle() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["resumeTitle"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getResumeTitle();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitialize() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      coverLetterText: string;
      skills: string[];
      educations: Education[];
      resumeTitle: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.initialize(
        payload.coverLetterText,
        payload.skills,
        payload.educations,
        payload.resumeTitle,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetter"] });
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["education"] });
      queryClient.invalidateQueries({ queryKey: ["resumeTitle"] });
    },
  });
}

export function useAddBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      content: string;
      tags: string[];
      summary: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addBlogPost(
        payload.title,
        payload.content,
        payload.tags,
        payload.summary,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}
