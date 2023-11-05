"use client"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import { useToast  } from "@/components/ui/use-toast";
import { SubmitHandler } from "react-hook-form";
import { sendContactForm } from "@/lib/api";
import { formSchema, TformShema } from "@/lib/types";

//define form
const ContactForm = () => {

  const form = useForm<TformShema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  })

  const { toast } = useToast()
  //define submit handler
  const onSubmit: SubmitHandler<TformShema> = async (values) => {
    await sendContactForm(values);

    setTimeout(() => {
      form.reset();
    }, 2000);
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3 mx-auto pt-[10%]">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="James Bond" {...field}/>
              </FormControl>
              <FormDescription>
                Your full name
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field}/>
              </FormControl>
              <FormDescription>
                Your Email
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({field}) =>(
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi, love your work"
                  className="resize-none"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                Your Message
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm