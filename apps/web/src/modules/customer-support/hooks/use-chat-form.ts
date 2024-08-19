import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const topicSchema = z.object({
  id: z.string(),
  category: z.string(),
  subcategories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      suggestions: z.array(z.string()),
    })
  ),
})

export const chatFormSchema = z.object({
  agent: z.string(),
  topic: z.any().refine((value): value is Topic => {
    return topicSchema.safeParse(value).success;
  }).transform(value => ({
    id: value.id,
    category: value.category,
    subcategories: value.subcategories
  })),
  subTopicId: z.string(),
  chosenSubject: z.string(),
  email: z.string().email(),
})

export type ChatForm = z.infer<typeof chatFormSchema>

export function useChatForm() {
  const form = useForm({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      agent: '',
      topic: {
        id: '',
        category: '',
        subcategories: [],
      },
      subTopicId: '',
      chosenSubject: '',
      email: '',
    },
  })

  return {
    form
  }
}
