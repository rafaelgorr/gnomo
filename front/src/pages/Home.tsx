import gnome from '@/assets/gnome.png'
import { Page } from '@/components/Page'

export function Home() {
  return (
    <Page backgroundPath={gnome}>
      <Page.Title>CASA DO GNOMO</Page.Title>
    </Page>
  )
}
