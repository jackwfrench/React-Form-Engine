import { TFormQuestion, TForm } from '../../core/form.core';
import { TValidateInputStatus } from '../../core/form.rules';

/**
 * Get Question Selector
 * @param state 
 * @param props 
 * @returns 
 */
export const getQuestionSelector = (form: TForm, id: number): TFormQuestion => {
  const question = form.questions.filter(q => q.id === id);
  return question[0];
};

/**
 * Get Question Input State Selector
 */
export const getQuestionInputStatusSelector = (form: TForm, id: number): TValidateInputStatus => {
  return form.questions.filter(q => q.id === id)[0].rules.inputStatus || '';
};