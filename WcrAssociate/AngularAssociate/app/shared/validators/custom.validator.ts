import { FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from 'AngularAssociate/app/services/auth';

export class CustomValidator {

    //static validUsername(fc: FormControl) {
    //    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
    //        return {
    //            validUsername: true
    //        };
    //    } else {
    //        return null;
    //    }
    //}

    //static emailDomain(domainName: string) {
    //    return (control: AbstractControl): { [key: string]: any } | null => {
    //        const email: string = control.value;
    //        const domain = email.substring(email.lastIndexOf('@') + 1);
    //        if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
    //            return null;
    //        } else {
    //            return { 'emailDomain': true };
    //        }
    //    };
    //}

   

    static matchPasswords(group: AbstractControl): { [key: string]: any } | null {
        const passwordControl = group.get('password');
        const confirmPasswordControl = group.get('confirmPassword');
        if (group.parent !== undefined) {
            if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
                group.parent.get('associate').disable();
                group.parent.get('consumer').disable();
                return null;
            } else {
                group.parent.get('associate').enable();
                group.parent.get('consumer').enable();
                return { 'passwordMismatch': true };
            }
        }
        else {
            return null;
        }
    }

    static regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }


}
