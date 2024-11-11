import * as z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  full_name: z.string().min(1),
  clone_url: z.string().url(),
  privateRepo: z.boolean(),
});
