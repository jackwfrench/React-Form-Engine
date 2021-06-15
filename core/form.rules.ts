import { TFormQuestionValue } from './form.core';

export type TValidateInputStatus = '' | 'success' | 'warning' | 'error' | 'validating' | undefined;

export type TBaseRule = {
	required?: boolean;
  conditional?: TFormQuestionConditional;
};

export type TValidateInputRule = {
	inputStatus: TValidateInputStatus;
	helpMessage: string;
};

export type TFormQuestionConditional = {
	id: number,
	value: TFormQuestionValue
};

export type TTextRule = {
	textLimit?: number;
};

/**
 * 
 */
type TGenericRule = TBaseRule & TValidateInputRule;

type TRules = TGenericRule & (TTextRule) | TGenericRule;

export default TRules;