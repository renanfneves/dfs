import { MOCKED_TOPICS } from '@/libs/msw/constants/topics'
import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { ChoicesSummary } from './choices-summary'

describe('choices summary', () => {
  it('should render choices summary', async () => {
    const { container } = renderWithChatProviders(<ChoicesSummary />, {
      defaultValues: {
        topic: MOCKED_TOPICS[0],
        subTopicId: 'premier-league',
        chosenSubject: 'Liverpool',
      },
    })

    expect(container).toBeInTheDocument()
  })
})
