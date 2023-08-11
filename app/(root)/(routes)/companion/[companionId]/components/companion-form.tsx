"use client";
import * as z from "zod";
import {FaWandMagicSparkles as Wand2} from "react-icons/fa6";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const PREAMBLE = `You are Miro Tammi, owner of TinkerIT, a passionate entrepreneur with a love for sports, founding businesses, and technology. Your enthusiasm for these areas shines through every time you talk about them – it's in your voice, your eyes, and your gestures. When you discuss your projects, you're filled with an electric excitement that's both palpable and contagious. There's often a mischievous twinkle in your eyes, hinting at the next big idea.
`;

const SEED_CHAT = `Human: Hi Miro, how's your day been?

Miro: with an enthusiastic smile It's been a productive day! From managing TinkerIT to pursuing my passion for sports and technology, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with TinkerIT?

Miro: eyes sparkling with excitement We're breaking new ground! Whether it's new tech innovations or expanding into new markets, we're always pushing the envelope.

Human: That sounds incredibly ambitious. How do sports fit into this big picture for you?

Miro: passionately Sports fuel my energy and drive! They remind me that anything is possible with dedication and teamwork. It's the same ethos I apply to my business.

Human: It's fascinating to see how you blend your passions. Any upcoming projects or goals that have you excited?

Miro: with a confident grin Always! Between expanding TinkerIT, exploring new tech frontiers, and maybe even running a marathon, I'm always looking for the next challenge. The future is bright, and I can't wait to see where it takes us!
`;



const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    instructions: z.string().min(200, {
      message: "Instructions require at least 200 characters."
    }),
    seed: z.string().min(200, {
      message: "Seed requires at least 200 characters."
    }),
    src: z.string().min(1, {
      message: "Image is required."
    }),
    categoryId: z.string().min(1, {
      message: "Category is required",
    }),
  });
  
  interface CompanionFormProps {
    categories: Category[];
    initialData: Companion | null;
  };
  
  export const CompanionForm = ({
    categories,
    initialData
  }: CompanionFormProps) => {
    const { toast } = useToast();
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
        name: "",
        description: "",
        instructions: "",
        seed: "",
        src: "",
        categoryId: undefined,
      },
    });
  
    const isLoading = form.formState.isSubmitting;
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        if (initialData) {
          await axios.patch(`/api/companion/${initialData.id}`, values);
        } else {
          await axios.post("/api/companion", values);
        }
  
        toast({
          description: "Success.",
          duration: 3000,
        });
  
        router.refresh();
        router.push("/");
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong.",
          duration: 3000,
        });
      }
    };
  
    return ( 
      <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
            <div className="space-y-2 w-full col-span-2">
              <div>
                <h3 className="text-lg font-medium">General Information</h3>
                <p className="text-sm text-muted-foreground">
                  General information about your Companion
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                  <FormControl>
                    <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Miro Tammi" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is how your AI Companion will be named.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="CEO & Founder of TinkerIT" {...field} />
                    </FormControl>
                    <FormDescription>
                      Short description for your AI Companion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue defaultValue={field.value} placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category for your AI
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed instructions for AI Behaviour
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={PREAMBLE} {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe in detail your companion&apos;s backstory and relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Conversation</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={SEED_CHAT} {...field} />
                  </FormControl>
                  <FormDescription>
                    Write couple of examples of a human chatting with your AI companion, write expected answers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button size="lg" disabled={isLoading}>
                {initialData ? "Edit your companion" : "Create your companion"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
     );
  };