import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
const iapplyPattern = /^[A-Z]{2}[0-9]+$/
const example='BL101'
@ValidatorConstraint({ name: 'iApplyId', async: false })

export class IApplyIdValidator implements ValidatorConstraintInterface {
  validate(iapplyId: string, args: ValidationArguments) {
    
    const testForMatch = iapplyPattern.test(iapplyId);
    return testForMatch;
  }

  defaultMessage(args: ValidationArguments) {

    return `${args.value}: Invalid pattern for I-apply ID. Expect: ${example}`;
  }
}