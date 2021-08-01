import { put, takeEvery, select, call } from 'redux-saga/effects';
import { ISaveQuestionValueAction }from './formActions';
import { validateForm, validateQuestion } from '../../core/form.validate';
import * as FormActionTypes from './formActionTypes';
import { store } from '@Store/appState';
import { TForm, TFormQuestion } from '../../core/form.core';
import FormActions from './formActions';
import { getForm } from './formSelectors';
import * as FormService from '@Service/form.service';

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

function* createForm() {

  // retrieve formState
  const formState: TForm = yield select(getForm);

  // validate Form
  const validForm = validateForm(formState);

  yield put(FormActions.updateValidForm(validForm));

  if (validForm) {
    // save form
    yield call(FormService.createForm, formState);
  }
}

  

function* formSaga(): Generator {
  yield takeEvery(FormActionTypes.SAVE_QUESTION_VALUE, questionValidate);
  yield takeEvery(FormActionTypes.CREATE_FORM, createForm);
}

export default formSaga;