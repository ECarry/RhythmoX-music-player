import { z } from "zod";

export const configSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  server: z.string().min(1).url({
    message: "Server must be a valid URL",
  }),
});
