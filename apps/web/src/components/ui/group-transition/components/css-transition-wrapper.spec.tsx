import { render } from '@testing-library/react'

import { CSSTransitionWrapper } from './css-transition-wrapper'

describe('CSSTransitionWrapper', () => {
  it('should render', () => {
    const wrapper = render(
      <CSSTransitionWrapper show={true} className="">
        <div>Test</div>
      </CSSTransitionWrapper>
    )

    const renderedChildren = wrapper.getByText('Test')

    expect(renderedChildren).toBeVisible()
  })
})
