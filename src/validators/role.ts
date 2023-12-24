import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'roleCheck', async: false })
export class EmailValidator implements ValidatorConstraintInterface {
  validate(role: string, args: ValidationArguments) {
    // Your custom validation logic goes here
    return true
    
  }

  defaultMessage(args: ValidationArguments) {
    // This message will be used if the validation fails
    return `Invalid role`;
  }
}