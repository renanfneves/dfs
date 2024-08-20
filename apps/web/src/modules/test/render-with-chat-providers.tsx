import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { GroupTransitionProvider } from '@/components/ui/group-transition/context/group-transition-context'
import { renderTestWithProviders } from '@/libs/vitest/render-test-with-providers'

export const renderWithChatProviders = (
  ui: React.ReactElement,
  { defaultValues = {}, mockedMethods = {} } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({ defaultValues })

    return (
      <FormProvider {...methods} {...mockedMethods}>
        <GroupTransitionProvider<ChatSteps> initialStep="agent-greetings">
          {children}
        </GroupTransitionProvider>
      </FormProvider>
    )
  }

  return {
    ...renderTestWithProviders(<Wrapper>{ui}</Wrapper>),
  }
}
