import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    title: string;
    content: string;
    date: Time;
    tags: Array<string>;
    summary: string;
}
export type Time = bigint;
export interface Education {
    endDate: string;
    institution: string;
    degree: string;
    startDate: string;
}
export interface backendInterface {
    addBlogPost(title: string, content: string, tags: Array<string>, summary: string): Promise<void>;
    deleteBlogPost(title: string): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPost(title: string): Promise<BlogPost>;
    getBlogPostsByTag(tag: string): Promise<Array<BlogPost>>;
    getCoverLetter(): Promise<string>;
    getEducation(): Promise<Array<Education>>;
    getResumeTitle(): Promise<string>;
    getSkills(): Promise<Array<string>>;
    initialize(coverLetterText: string, inputSkills: Array<string>, educations: Array<Education>, inputResumeTitle: string): Promise<void>;
    setCoverLetter(newCoverLetter: string): Promise<void>;
    setEducation(newEducation: Array<Education>): Promise<void>;
    setResumeTitle(newTitle: string): Promise<void>;
    setSkills(newSkills: Array<string>): Promise<void>;
    updateBlogPost(title: string, content: string, tags: Array<string>, summary: string): Promise<void>;
}
