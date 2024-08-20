import userEvent from '@testing-library/user-event'

import { MOCKED_TOPICS } from '@/libs/msw/constants/topics'
import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { SubjectSelection } from './subject-selection'

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

describe('subject-selection', () => {
  it('should render subject selection', async () => {
    const { container } = renderWithChatProviders(<SubjectSelection />, {
      defaultValues: { topic: MOCKED_TOPICS[0], subTopicId: 'premier-league' },
    })

    expect(container).toBeInTheDocument()
  })

  it('should call navigateToNextComponent when subject is selected', async () => {
    const user = userEvent.setup()
    const { getByText } = renderWithChatProviders(<SubjectSelection />, {
      defaultValues: { topic: MOCKED_TOPICS[0], subTopicId: 'premier-league' },
      mockedMethods: { setValue },
    })

    const subject = getByText('Liverpool')
    await user.click(subject)

    expect(navigateToNextComponent).toHaveBeenCalledWith('choices-summary')
    expect(setValue).toHaveBeenCalledWith('chosenSubject', 'Liverpool')
  })
})
