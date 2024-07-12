import { UserData } from "@/types/farmers";
import { ZodType, z } from "zod";

export const userSchema: ZodType<UserData> = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.string().min(2),
});
