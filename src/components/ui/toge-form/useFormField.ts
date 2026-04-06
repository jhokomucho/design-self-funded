import { FieldContextKey } from 'vee-validate'
import { computed, inject } from 'vue'
import { TOGE_FORM_ITEM_INJECTION_KEY } from './injectionKeys'

export function useFormField() {
  const fieldContext = inject(FieldContextKey)
  const fieldItemContext = inject(TOGE_FORM_ITEM_INJECTION_KEY)

  if (!fieldContext) throw new Error('useFormField should be used within <TogeFormField>')

  const { name, errorMessage: error, meta } = fieldContext
  const id = fieldItemContext

  return {
    id,
    name,
    error,
    valid: computed(() => meta.valid),
    isDirty: computed(() => meta.dirty),
    isTouched: computed(() => meta.touched),
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}
