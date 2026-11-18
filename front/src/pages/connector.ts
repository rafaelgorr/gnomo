import { useAppSelector } from '@/store/hooks'
import { selectors as headerSelectors } from '@/store/ui/header'
import { selectors as themeSelectors } from '@/store/ui/theme'

export const useConnector = () => {
  const selectors = {
    title: useAppSelector(headerSelectors.getHeaderTitle),
    theme: useAppSelector(themeSelectors.getTheme),
  }

  return {
    selectors,
  }
}
