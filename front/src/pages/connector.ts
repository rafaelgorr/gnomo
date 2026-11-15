import { useAppSelector } from '@/store/hooks'
import { selectors as headerSelectors } from '@/store/ui/header'

export const useConnector = () => {
  const selectors = {
    title: useAppSelector(headerSelectors.getHeaderTitle),
  }

  return {
    selectors,
  }
}
