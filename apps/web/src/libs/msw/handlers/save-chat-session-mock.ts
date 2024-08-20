import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'



export const saveChatSessionMock = http.post(
  '*/api/chat-sessions',
  withCORS(async ({ request }) => {
    const {
      email,
      topicId,
      subTopicId,
      chosenSubject } = await request.json()

    if (!email || !topicId || !subTopicId || !chosenSubject) {
      return new HttpResponse(null, { status: 400 })
    }

    if (email === 'email-to-fail@test.com') {
      return new HttpResponse(null, { status: 400 })
    }
    return new HttpResponse(null, { status: 201 })
  }),
)
