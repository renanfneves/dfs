import { FormProvider } from 'react-hook-form'

import { GroupTransition } from '@/components/ui/group-transition'
import { GroupTransitionProvider } from '@/components/ui/group-transition/context/group-transition-context'

import { useChatComponentsSteps } from '../../hooks/use-chat-components-steps'
import { useChatForm } from '../../hooks/use-chat-form'
import { useSaveChatChoices } from '../../hooks/use-save-chat-choices'

export function Chat() {
  const { form } = useChatForm()
  const { componentsSteps } = useChatComponentsSteps()
  const { saveChatChoices } = useSaveChatChoices()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(saveChatChoices)}>
        <GroupTransitionProvider<ChatSteps> initialStep="agent-greetings">
          <GroupTransition<ChatSteps>
            components={componentsSteps}
            initialStep="agent-greetings"
          />
        </GroupTransitionProvider>
      </form>
    </FormProvider>
  )
}
