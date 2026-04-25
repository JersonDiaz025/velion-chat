import { deleteSession } from '@/lib/session.lib'
import { ROUTES } from '@/constants/routes.constants'
import { redirect } from 'next/navigation'

export async function logout() {
  await deleteSession()
  redirect(ROUTES.LOGIN)
}
