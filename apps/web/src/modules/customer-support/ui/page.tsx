import { MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { queryClient } from '@/libs/react-query/query-client'
import { QUERY_KEYS } from '@/libs/react-query/query-keys'

import { useAvailableAgent } from '../hooks/use-available-agent'
import { useChatModalState } from '../hooks/use-chat-modal-state'
import { usePrefetchTopics } from '../hooks/use-prefetch-topics'
import { Chat } from './chat'

export function CustomerSupport() {
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
      <Dialog onOpenChange={handleToggleModal} open={open}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            Chat <MessageSquare />
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
