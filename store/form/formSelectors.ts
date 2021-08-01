import { TState } from '@Store/appState';
import { TFormQuestion, TForm, TFormQuestionValue } from '../../core/form.core';
import { TValidateInputStatus } from '../../core/form.rules';

/**
 * Get Question Selector
 * @param state 
 * @param props 
 * @returns 
 */
export const getQuestion = (form: TForm, id: number): TFormQuestion => {
  const question = form.questions.filter(q => q.id === id);
  return question[0];
};

/**
 * Get Question Value Selector
 * @param form 
 * @param id 
 * @returns 
 */
export const getQuestionValue = (form: TForm, id: number): TFormQuestionValue => {
  return getQuestion(form, id).value;
};

/**
 * Get Question Input State Selector
 */
export const getQuestionInputStatusSelector = (form: TForm, id: number): TValidateInputStatus => {
  return form.questions.filter(q => q.id === id)[0].rules.inputStatus || '';
};

/**
 * Get Form Selector
 */
export const getForm = (state: TState): TForm => state.form;