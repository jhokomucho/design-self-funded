import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'

export const TOGE_SIDEBAR_COOKIE_NAME = 'toge_sidebar_state'
export const TOGE_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const TOGE_SIDEBAR_WIDTH = '16rem'
export const TOGE_SIDEBAR_WIDTH_MOBILE = '18rem'
export const TOGE_SIDEBAR_WIDTH_ICON = '3rem'
export const TOGE_SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export const [useTogeSidebar, provideTogeSidebarContext] = createContext<{
  state: ComputedRef<'expanded' | 'collapsed'>
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  isMobile: Ref<boolean>
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
}>('TogeSidebar')
