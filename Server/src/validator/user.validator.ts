import z from "zod";

export const registationSchema = z.object({
  email: z.string().min(5, "please enter valid email").trim().email(),
  password: z.string().min(6),
});

export const profileUdate = z.object({
  user: z.string().min(3, "please valid name ").trim().optional(),
  employeeCode: z
    .string()
    .min(3, "Enter valid Employee code")
    .trim()
    .uppercase()
    .optional(),
  department: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user").optional(),
});
