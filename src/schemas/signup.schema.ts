import { z } from "zod";

const signupValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(1, "Please enter a password!"),
  image: z
    .any()
    .optional()
    .refine((file) => {
      return file instanceof File && file.type.startsWith("image/");
    }, "Please upload a valid image file (JPG, PNG, etc.)"),
});

export default signupValidationSchema;
