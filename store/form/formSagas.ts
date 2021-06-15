import { put, takeEvery } from 'redux-saga/effects';
import { ICreateFormAction, ISaveQuestionValueAction } from './formActions';
import { validateQuestion } from '../../../../core/form/form.validate';
import * as FormActionTypes from './formActionTypes';
import { store } from '../../../store/appState';
import { TFormQuestion } from '../../../../core/form/form.core';

/**
 * Question validate saga is run every time 'form/saveQuestionValue' is dispatched
 * @param action 
 */
function* questionValidate(action: ISaveQuestionValueAction) {
  // continue the action
  put({ type: FormActionTypes.SAVE_QUESTION_VALUE, payload: action.payload });
  
  // retrieve the question
  const question: TFormQuestion = store.getState().form.questions.filter(q => q.id === action.payload.questionId)[0];
  const validQuestion = validateQuestion(question);

  // unpack valid question results
  const inputStatus = validQuestion.inputStatus;
  const helpMessage = validQuestion.helpMessage;

  yield put({ 
    type: FormActionTypes.UPDATE_QUESTION_VALIDATION_STATUS, 
    payload: {questionId: question.id, inputStatus, helpMessage}
  });
}

function* createForm(action: ICreateFormAction) {
  yield action.payload;
}

function* formSaga(): Generator {
  yield takeEvery(FormActionTypes.SAVE_QUESTION_VALUE, questionValidate);
  yield takeEvery(FormActionTypes.CREATE_FORM, createForm);
}

export default formSaga;