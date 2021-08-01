import { TFormQuestion, TFormQuestionValueType } from '@AuctorForm/core/form.core';
import { TValidateInputStatus } from '../../core/form.rules';
import * as actionTypes from './formActionTypes';

export interface IQuestionAction extends IAction {
  payload: TFormQuestion
}

export interface ISaveQuestionValueAction extends IAction {
  payload: { questionId: number, value: TFormQuestionValueType}
}

export interface IQuestionValidationStatus extends IAction {
  payload: { questionId: number, inputStatus: TValidateInputStatus, helpMessage: string}
}

export interface IUpdateValidFormAction extends IAction {
  payload: { validForm: boolean }
}

type TFormQuestionAction = IQuestionAction | ISaveQuestionValueAction | IQuestionValidationStatus | IUpdateValidFormAction;

export const clearForm = (): IAction => { return { type: actionTypes.CLEAR_FORM }; };
export const clearFormValues = (): IAction => { return { type: actionTypes.CLEAR_FORM_VALUES }; };
export const createForm = (): IAction => { return { type: actionTypes.CREATE_FORM };};
export const saveFormQuestion = (question: TFormQuestion): IQuestionAction => { return { type: actionTypes.SAVE_QUESTION, payload: question }; };
export const createFormQuestion = (question: TFormQuestion): IQuestionAction => { return { type: actionTypes.CREATE_QUESTION, payload: question }; };
export const saveFormQuestionValue = (questionId: number, value: TFormQuestionValueType): ISaveQuestionValueAction => { return {  type: actionTypes.SAVE_QUESTION_VALUE, payload: { questionId, value } }; };
export const updateValidForm = (validForm: boolean): IUpdateValidFormAction => { return { type: actionTypes.UPDATE_VALID_FORM, payload: { validForm } }; }; 

export type TFormActions = TFormQuestionAction;

const FormActions = {
  createForm,
  clearForm,
  clearFormValues,
  saveFormQuestion,
  createFormQuestion,
  saveFormQuestionValue,
  updateValidForm
};

export default FormActions;