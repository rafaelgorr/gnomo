import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Spinner,
  toast,
} from '@gnomo/uikit'
import { useNavigate, useParams } from '@tanstack/react-router'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'

import GnomeMessedUp from '@/assets/gnome_icon_messed_up.svg?react'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'

export function DeleteAlertDialog() {
  const navigate = useNavigate({ from: '/kitchen/recipes/$recipeId' })
  const { recipeId } = useParams({ from: '/_kitchen/kitchen/recipes/$recipeId' })

  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector(recipeId)
  const { recipe, deleting } = selectors

  const [open, setOpen] = useState(false)

  if (!recipe) {
    return null
  }

  const handleDeleteRecipe = () => {
    void dispatch(actions.deleteRecipe({ id: recipe.id })).then(() => {
      toast.add({
        type: 'success',
        title: (
          <div className="flex gap-2 items-center">
            <p className="">Receita removida com sucesso!</p>
            <GnomeMessedUp className="size-8 flex-1" />
          </div>
        ),
      })
      setOpen(false)
      void navigate({ to: '/kitchen/recipes' })
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="outline" className="size-10">
            <TrashIcon className="size-5" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remover receita</AlertDialogTitle>
          <AlertDialogDescription>
            Você realmente quer remover a receita "<b>{recipe.name}</b>"?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={deleting} onClick={handleDeleteRecipe}>
            Sim, remova
            {deleting ? <Spinner data-icon="inline-end" /> : null}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
