import userEvent from '@testing-library/user-event'

import { MOCKED_TOPICS } from '@/libs/msw/constants/topics'
import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { TopicSelection } from './topic-selection'

const navigateToNextComponent = vi.fn()
const navigateToPreviousComponent = vi.fn()
const setValue = vi.fn()

vi.mock(
  '@/components/ui/group-transition/hooks/use-change-transition-step',
  () => {
    return {
      useChangeTransitionStep: () => ({
        navigateToNextComponent,
        navigateToPreviousComponent,
      }),
    }
  }
)

describe('topic-selection', () => {
  it('should render topic selection', async () => {
    const { container } = renderWithChatProviders(<TopicSelection />)

    expect(container).toBeInTheDocument()
  })

  it('should call navigateToNextComponent when topic is selected', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithChatProviders(<TopicSelection />, {
      mockedMethods: { setValue },
    })

    const footballTopic = getByText('Football')
    await user.click(footballTopic)

    expect(navigateToNextComponent).toHaveBeenCalledWith('subtopic-selection')
    expect(setValue).toHaveBeenCalledWith('topic', MOCKED_TOPICS[0])
  })
})
