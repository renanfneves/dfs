import { MessageSquare } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTranslation } from '@/libs/i18n'
import { queryClient } from '@/libs/react-query/query-client'
import { QUERY_KEYS } from '@/libs/react-query/query-keys'

import { useAvailableAgent } from '../hooks/use-available-agent'
import { useChatModalState } from '../hooks/use-chat-modal-state'
import { usePrefetchTopics } from '../hooks/use-prefetch-topics'
import { Chat } from './chat'

export function CustomerSupport() {
  const { t } = useTranslation('customer_support')
  usePrefetchTopics()
  const { toggleModal, open } = useChatModalState()
  const { agent } = useAvailableAgent(open)

  function handleToggleModal(open: boolean) {
    toggleModal(open, () => {
      if (!open) {
        queryClient.removeQueries({
          queryKey: [QUERY_KEYS.GET_AVAILABLE_AGENT],
        })
      }
    })
  }

  return (
    <div id="page" className="h-full">
      <Helmet title={t('title')} />
      <Dialog onOpenChange={handleToggleModal} open={open}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            {t('chat')} <MessageSquare />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[27rem]">
          <DialogHeader>
            <DialogTitle>{agent}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Chat />
        </DialogContent>
      </Dialog>
    </div>
  )
}
