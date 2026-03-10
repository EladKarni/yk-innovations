import { revalidatePath } from 'next/cache'

/**
 * Revalidates the homepage layout.
 * Used as an afterChange hook on all globals and content collections
 * so that ISR cache is invalidated immediately when CMS content is saved.
 */
export const revalidateHomepage = () => {
  revalidatePath('/', 'layout')
}
