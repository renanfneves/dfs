import { render } from '@testing-library/react'

import { SummaryCard } from './summary-card'

describe('SummaryCard', () => {
  it('should render', () => {
    const title = 'Title'
    const value = 'Any Value'

    const wrapper = render(<SummaryCard title="Title" value="Any Value" />)

    const titleText = wrapper.getByText(title)
    const valueText = wrapper.getByText(value)

    expect(titleText).toBeVisible()
    expect(valueText).toBeVisible()
  })
})
