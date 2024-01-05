import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'deadlineDate', async: false })

export class DeadlineDateValidator implements ValidatorConstraintInterface {
  validate(deadlineDate: Date, args: ValidationArguments) {
    let today=new Date()
    today.setHours(0,0,0,0);

    return deadlineDate>=today
  }

  defaultMessage(args: ValidationArguments) {
    
    return `${args.value} Invalid date - cannot be past date`;

  }
}