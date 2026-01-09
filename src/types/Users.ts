import { z } from "zod";

export const zUser = z.object({
    email: z.string(),
    name: z.string().nullable(),
    profile_image: z.string().nullable(),
    tagline: z.string().nullable(),
})

export type User = z.infer<typeof zUser>;
