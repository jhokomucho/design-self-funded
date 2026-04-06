import type { InjectionKey } from 'vue'
import type { TogeToggleVariants } from '@/components/ui/toge-toggle'

export interface TogeToggleGroupContext {
  variant?: TogeToggleVariants['variant']
  size?: TogeToggleVariants['size']
}

export const togeToggleGroupContextKey: InjectionKey<TogeToggleGroupContext> =
  Symbol('toge-toggle-group')
