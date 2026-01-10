import { z } from "zod";

export const zUser = z.object({
    name: z.string(),
    // profile_image: z.string(),
    tagline: z.string(),
})
