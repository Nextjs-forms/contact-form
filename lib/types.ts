import * as z from "zod";


export const formSchema = z.object({
    username:z.string().min(2, {
        message: "Username must be at least 2 characters"
    }).max(50),
    email:z.string().email(),
    message: z
      .string()
      .min(10, {
        message: "message must be at least 10 characters.",
      }),
  })
  
export  type TformShema = z.infer<typeof formSchema>