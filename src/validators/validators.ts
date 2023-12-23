import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
const emailPattern = /^[A-Za-z0-9]+@postbank.bg$/
@ValidatorConstraint({ name: 'customEmail', async: false })
export class EmailValidator implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    // Your custom validation logic goes here
    const testForMatch = emailPattern.test(email);
    return testForMatch;
  }

  defaultMessage(args: ValidationArguments) {
    // This message will be used if the validation fails
    return `Invalid pattern for email.`;
  }
}