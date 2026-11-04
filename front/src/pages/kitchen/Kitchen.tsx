import gnomeChef from '@/assets/gnome_chef.png'
import { Page } from '@/components/Page'

export function Kitchen() {
  return (
    <Page backgroundPath={gnomeChef}>
      <Page.Title>COZINHA DO GNOMO</Page.Title>
      {/* <img src={gnomeChef} className="opacity-20" /> */}
    </Page>
  )
}
