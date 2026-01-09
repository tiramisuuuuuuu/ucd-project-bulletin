import { z } from "zod";

export const zPost = z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
    contact_info: z.string(),
})
