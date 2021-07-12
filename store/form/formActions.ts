import { TFormQuestion, TFormQuestionValueType } from 'AuctorForm/core/form.core';
import { TValidateInputStatus } from 'AuctorForm/core/form.rules';
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

export interface ICreateFormAction extends IAction {
  payload: { formType: string}
}

type TFormQuestionAction = IQuestionAction | ISaveQuestionValueAction | IQuestionValidationStatus | ICreateFormAction;

export const clearForm = (): IAction => { return { type: actionTypes.CLEAR_FORM }; };
export const createForm = (formType: string): ICreateFormAction => { return { type: actionTypes.CREATE_FORM, payload: { formType: formType } };};
export const saveFormQuestion = (question: TFormQuestion): IQuestionAction => { return { type: actionTypes.SAVE_QUESTION, payload: question }; };
export const createFormQuestion = (question: TFormQuestion): IQuestionAction => { return { type: actionTypes.CREATE_QUESTION, payload: question }; };
export const saveFormQuestionValue = (questionId: number, value: TFormQuestionValueType): ISaveQuestionValueAction => { return {  type: actionTypes.SAVE_QUESTION_VALUE, payload: { questionId, value } }; };

export type TFormActions = TFormQuestionAction;

const FormActions = {
  clearForm,
  saveFormQuestion,
  createFormQuestion,
  saveFormQuestionValue
};

export default FormActions;