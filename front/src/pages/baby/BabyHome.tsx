import gnomeMason from '@/assets/gnome_mason.png'
import { Page } from '@/components/Page'

export function BabyHome() {
  return (
    <Page>
      <Page.Title>Bebê do gnomo</Page.Title>
      <Page.Content className="h-full flex flex-col justify-center items-center">
        <div className="text-center flex flex-col gap-2">
          <img src={gnomeMason} width={256} />
          <p className="text-2xl font-bold">Em construção...</p>
        </div>
      </Page.Content>
    </Page>
  )
}
