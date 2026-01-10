import { z } from "zod";

export const zPostDetail = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
    contact_info: z.string(),
    clicks: z.int(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().nullable(),
    name: z.string().nullable(),
    profile_image: z.string().nullable(),
    tagline: z.string().nullable(),
})

export type PostDetail = z.infer<typeof zPostDetail>;

export const zPost = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    tags: z.array(z.string()),
    hasImage: z.boolean(),
    clicks: z.int(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().nullable(),
    name: z.string().nullable(),
    profile_image: z.string().nullable(),
    tagline: z.string().nullable(),
})

export const zPostArray = z.array(zPost);

export type Post = z.infer<typeof zPost>;

export const zUserPost = z.object({
    title: z.string(),
    subtitle: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
    contact_info: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().nullable(),
})
