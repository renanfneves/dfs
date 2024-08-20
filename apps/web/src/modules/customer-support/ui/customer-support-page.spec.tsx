import { renderWithChatProviders } from '@/modules/test/render-with-chat-providers'

import { CustomerSupport } from './page'

describe('CustomerSupport', () => {
  it('should render customer support page', () => {
    const { container } = renderWithChatProviders(<CustomerSupport />)

    expect(container).toBeInTheDocument()
  })
})
