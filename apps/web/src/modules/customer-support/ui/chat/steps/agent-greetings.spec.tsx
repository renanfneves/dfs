import userEvent from '@testing-library/user-event'

import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { AgentGreetings } from './agent-greetings'

const navigateToNextComponent = vi.fn()

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

describe('agentGreetings', () => {
  it('should render agent greetings', () => {
    const { container } = renderWithChatProviders(<AgentGreetings />)

    expect(container).toBeInTheDocument()
  })

  it('should call navigateToNextComponent when start chat button is clicked', async () => {
    const user = userEvent.setup()
    const { getByTestId } = renderWithChatProviders(<AgentGreetings />)

    const startChatBtn = getByTestId('start-chat-btn')
    await user.click(startChatBtn)

    expect(navigateToNextComponent).toHaveBeenCalledWith('topic-selection')
  })
})
