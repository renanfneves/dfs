import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const chatFormSchema = z.object({
  agent: z.string(),
  topicId: z.string(),
  subTopicId: z.string(),
  chosenSubject: z.string(),
})

export type ChatForm = z.infer<typeof chatFormSchema>

export function useChatForm() {
  const form = useForm({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      agent: '',
      topicId: '',
      subTopicId: '',
      chosenSubject: '',
    },
  })

  return {
    form
  }
}
