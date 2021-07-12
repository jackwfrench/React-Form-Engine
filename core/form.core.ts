import TRules from './form.rules';

export enum TFormQuestionValueType {
  text = 'text',
  number = 'number',
  radioGroup = 'radio-group',
  date = 'date',
  datetime = 'datetime',
  phone = 'phone',
  email = 'email'
}

export type TFormQuestionValue = string | number | undefined;

export type TFormQuestion = {
  id: number;
  valueType: TFormQuestionValueType;
  value: TFormQuestionValue;
  rules: TRules;
};

export type TForm = {
  formType: string;
  questions: Array<TFormQuestion>;
  dateCreated: Date;
  validForm: boolean;
  identifiers: Array<{identifier: string, value: string}>
};

