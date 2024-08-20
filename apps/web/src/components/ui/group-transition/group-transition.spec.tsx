import { render } from '@testing-library/react'

import { GroupTransition } from './'
import { GroupTransitionProvider } from './context/group-transition-context'

type TransitionStep = 'step_1' | 'step_2'
const componentsSteps: ComponentStep<TransitionStep>[] = [
  {
    key: 'step_1',
    Component: () => <div>One</div>,
  },
  {
    key: 'step_2',
    Component: () => <div>Two</div>,
  },
]

describe('GroupTransition', () => {
  it('should render', () => {
    const wrapper = render(
      <GroupTransitionProvider<TransitionStep> initialStep="step_1">
        <GroupTransition<TransitionStep> components={componentsSteps} />
      </GroupTransitionProvider>
    )

    const titleText = wrapper.getByText('One')
    expect(titleText).toBeVisible()
  })

  it('should render step 2', () => {
    const wrapper = render(
      <GroupTransitionProvider<TransitionStep> initialStep="step_2">
        <GroupTransition<TransitionStep> components={componentsSteps} />
      </GroupTransitionProvider>
    )

    const titleText = wrapper.getByText('Two')
    expect(titleText).toBeVisible()
  })
})
