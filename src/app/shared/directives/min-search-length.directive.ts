
import {
  Directive,
  forwardRef,
} from '@angular/core'

import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms'

@Directive({
  selector: '[minSearchLength]',
  standalone: false,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MinSearchLengthDirective),
      multi: true,
    },
  ],
})
export class MinSearchLengthDirective implements Validator {
  validate(control: AbstractControl): Record<string, any> | null {
    const value = (control.value || '').trim()

    if (value.length === 0) {
      return null
    }

    if (value.length < 3) {
      return {
        minSearchLength: {
          requiredLength: 3,
          actualLength: value.length,
        },
      }
    }

    return null
  }
}
