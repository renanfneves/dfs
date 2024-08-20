import { FormProvider } from 'react-hook-form'

import { GroupTransition } from '@/components/ui/group-transition'
import { GroupTransitionProvider } from '@/components/ui/group-transition/context/group-transition-context'
import { toast } from '@/components/ui/toast/use-toast'
import { useTranslation } from '@/libs/i18n'
import { queryClient } from '@/libs/react-query/query-client'
import { QUERY_KEYS } from '@/libs/react-query/query-keys'

import { useChatComponentsSteps } from '../../hooks/use-chat-components-steps'
import { ChatForm, useChatForm } from '../../hooks/use-chat-form'
import { useChatModalState } from '../../hooks/use-chat-modal-state'
import { useSaveChatSession } from '../../hooks/use-save-chat-session'

export function Chat() {
  const { t } = useTranslation('customer_support')
  const { form } = useChatForm()
  const { componentsSteps } = useChatComponentsSteps()
  const { saveChatChoices } = useSaveChatSession()
  const { toggleModal } = useChatModalState()

  async function submit(data: ChatForm) {
    try {
      await saveChatChoices(data)

      setTimeout(() => {
        toggleModal(false, () => {
          if (!open) {
            queryClient.removeQueries({
              queryKey: [QUERY_KEYS.GET_AVAILABLE_AGENT],
            })
          }
        })
      }, 1000)

      toast({
        description: t('response_feedbacks.success'),
      })
    } catch (error) {
      console.log(error)
      toast({
        description: t('response_feedbacks.error'),
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
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
