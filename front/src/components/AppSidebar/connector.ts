import { useAppSelector } from '@/store/hooks'
import { actions as themeActions, selectors as themeSelectors } from '@/store/ui/theme'

export const useConnector = () => {
  const selectors = {
    theme: useAppSelector(themeSelectors.getTheme),
  }

  const actions = {
    toggleTheme: themeActions.toggleTheme,
  }

  return {
    actions,
    selectors,
  }
}
