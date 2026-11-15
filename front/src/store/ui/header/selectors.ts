import type { StoreState } from '@/store'

export const getHeaderTitle = (state: StoreState) => state.ui.header.title
