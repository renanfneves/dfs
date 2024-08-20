import userEvent from '@testing-library/user-event'

import { MOCKED_TOPICS } from '@/libs/msw/constants/topics'
import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { SubTopicSelection } from './subtopic-selection'

const navigateToNextComponent = vi.fn()
const setValue = vi.fn()

vi.mock(
  '@/components/ui/group-transition/hooks/use-change-transition-step',
  () => {
    return {
      useChangeTransitionStep: () => ({
        navigateToNextComponent,
      }),
    }
  }
)

describe('subtopic-selection', () => {
  it('should render sub topic selection', async () => {
    const { container } = renderWithChatProviders(<SubTopicSelection />, {
      defaultValues: { topic: MOCKED_TOPICS[0] },
    })

    expect(container).toBeInTheDocument()
  })

  it('should call navigateToNextComponent when topic is selected', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithChatProviders(<SubTopicSelection />, {
      defaultValues: { topic: MOCKED_TOPICS[0] },
      mockedMethods: { setValue },
    })

    const subtopic = getByText('Premier League')
    await user.click(subtopic)

    expect(navigateToNextComponent).toHaveBeenCalledWith('subject-selection')
    expect(setValue).toHaveBeenCalledWith('subTopicId', 'premier-league')
  })
})
