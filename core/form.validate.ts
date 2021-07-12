import { TForm, TFormQuestion, TFormQuestionValueType } from './form.core';
import { TTextRule, TValidateInputStatus } from './form.rules';
import parsePhoneNumber from 'libphonenumber-js';
import AppStore from '@Store/appState';
import * as ActionTypes from '../store/form/formActionTypes';
import { evaluateConditional } from '../input/baseInput';

interface IValidateQuestion {
	success: boolean,
	inputStatus: TValidateInputStatus,
	helpMessage: string
}

export const validateQuestion = (question: TFormQuestion): IValidateQuestion => {
  if (!evaluateConditional(question.rules.conditional)) {
    return { success: true, inputStatus: '', helpMessage: ''};
  }

  // question rules
  const rules = question.rules;

  // assert required field
  if (rules.required) {
    if (question.value === undefined || 
			question.value === '' ||
			question.value === 0) {
      return { success: false, inputStatus: 'error', helpMessage: 'This is a required field'};
    }
  }

  // text question
  if (question.valueType === TFormQuestionValueType.text) {
    const textValue = question.value as string;
    const textRules = rules as TTextRule;
    // check length of text
    if (textRules.textLimit !== undefined) {
      if (textValue.length > textRules.textLimit) {
        return { success: false, inputStatus: 'error', helpMessage: `You exceeded your max characters for this field ${textValue.length}/${textRules.textLimit}`};
      }
    }
  }

  // email question
  if (question.valueType === TFormQuestionValueType.email) {
    const emailValue = question.value as string;
    const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailValue);
    if (!emailTest) {
      return { success: false, inputStatus: 'error', helpMessage: 'Not a valid email address'};
    }
  }

  // phone number question 
  if (question.valueType === TFormQuestionValueType.phone) {
    const phoneNumber = parsePhoneNumber(question.valueType as string);
    if (phoneNumber) {
      if (!phoneNumber.isValid()) {
        return { success: false, inputStatus: 'error', helpMessage: 'Not a valid phone number'};
      }
    }
  }

  // radio group question 
  if (question.valueType === TFormQuestionValueType.radioGroup) {
    return { success: true, inputStatus: 'success', helpMessage: '' };
  }

  // valid question value
  return { success: true, inputStatus: 'success', helpMessage: ''};
};

/**
 * v
 * @param questions 
 * @returns 
 */
export const validateForm = (store: typeof AppStore): boolean => {
	
  // extract questions from state
  const questions = store.getState().form.questions;

  let isValidForm = true;

  // check that questions array is not empty 
  if (questions.length === 0) {
    isValidForm = false;
  }

  // loop over questions and validate
  questions.forEach(question => {
    const { success, inputStatus, helpMessage } = validateQuestion(question);
    if (!success) {
      isValidForm = false;
    }
    store.dispatch({type: ActionTypes.UPDATE_QUESTION_VALIDATION_STATUS, payload: {questionId: question.id, inputStatus, helpMessage}});
  });

  return isValidForm;
};

export interface IFormQuestionSubmit {
	id: number,
	value: string
}



/**
 * Prepares the form to be submitted to DB
 * @returns IFormQuestionSubmit[]
 */
export const formPrepareSubmit = (formState: TForm): IFormQuestionSubmit[] => {

  // array to hold questions
  const reducedQuestions: Array<IFormQuestionSubmit> = [];

  // extract questions from state
  const questions = formState.questions;

  questions.forEach(question => {

    if (evaluateConditional(question.rules.conditional)) {
      // convert value to string value 

      let stringValue = '';

      if (question.value !== undefined) {
        stringValue = String(question.value);
      }

      reducedQuestions.push({id: question.id, value: stringValue});
    }
  });

  return reducedQuestions;
};