import type { StoreState } from '@/store'

export const getTheme = (state: StoreState) => state.ui.theme.theme
