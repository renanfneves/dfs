import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { usePrefetchTopics } from '../hooks/use-prefetch-topics'
import { Chat } from './chat'

export function CustomerSupport() {
  usePrefetchTopics()

  return (
    <div id="page" className="h-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <Chat />
        </DialogContent>
      </Dialog>
    </div>
  )
}
