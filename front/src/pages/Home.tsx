import gnome from '@/assets/gnome.png'
import { Page } from '@/components/Page'

export function Home() {
  return (
    <Page>
      <img
        src={gnome}
        className="absolute opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <Page.Title>CASA DO GNOMO</Page.Title>
    </Page>
  )
}
