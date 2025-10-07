import { z } from "zod";

export const zCreateBikeRequest = z.object({
    description: z.string(),
    bike_image: z.array(z.string()),
    dropoff_location: z.string()
})

export const zUpdateBikeRequest = z.object({
    dropoff_location: z.string(),
    dropoff_image: z.array(z.string()),
    bike_lock: z.string(),
})