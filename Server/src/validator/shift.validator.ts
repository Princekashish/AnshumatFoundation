import z from "zod";

export const shiftSchema = z
  .object({
    userid: z.string().nonempty("User ID is required"),
    start_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    end_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  })
  .refine((data) => data.end_time > data.start_time);
