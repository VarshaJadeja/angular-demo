import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    if (password.length !== confirmPassword.length) {
      formGroup
        .get('confirmPassword')!
        .setErrors({ passwordsDoNotMatch: true });
      return { passwordsDoNotMatch: true };
    } else {
      for (let i = 0; i < password.length; i++) {
        if (password[i] !== confirmPassword[i]) {
          formGroup
            .get('confirmPassword')!
            .setErrors({ passwordsDoNotMatch: true });
          return { passwordsDoNotMatch: true };
        }
      }
    }
    formGroup.get('confirmPassword')!.setErrors(null);
    return null;
  };
}
