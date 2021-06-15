import { TForm } from '../../../../core/form/form.core';
import { TFormActions, IQuestionAction, ISaveQuestionValueAction } from './formActions';
import * as actionTypes from './formActionTypes';
import { initialState } from '../../../store/appState';
import { IQuestionValidationStatus } from './formActions';

const formReducer = (state: TForm, action: TFormActions): TForm => {
  switch (action.type) {
  case actionTypes.SAVE_QUESTION: {
    const saveQuestionAction = action as IQuestionAction;
    return {
      ...state,
      questions: state.questions.map(question => 
        question.id === saveQuestionAction.payload.id ? saveQuestionAction.payload : question)
    };
  }
  case actionTypes.CREATE_QUESTION: {
    const createQuestionAction = action as IQuestionAction;
    return {
      ...state,
      questions: [...state.questions, createQuestionAction.payload]
    };
  }
  case actionTypes.SAVE_QUESTION_VALUE: {
    const createQuestionAction = action as ISaveQuestionValueAction;
    return {
      ...state,
      questions: [...state.questions.map(question => 
        question.id === createQuestionAction.payload.questionId ? {...question, value: createQuestionAction.payload.value} : question)]
    };
  }
  case actionTypes.UPDATE_QUESTION_VALIDATION_STATUS: {
    const updateValidationAction = action as IQuestionValidationStatus;
    return {
      ...state,
      questions: [...state.questions.map(question => {        
        if (question.id === updateValidationAction.payload.questionId) {
          return {
            ...question,
            rules: {
              ...question.rules,
              inputStatus: updateValidationAction.payload.inputStatus,
              helpMessage: updateValidationAction.payload.helpMessage
            }
          };
        } else {     
          return question;
        }
      })]
    };
  }
  case actionTypes.CLEAR_FORM: {
    return { ...initialState.form };
  }
  default: {
    return { ...state };
  }

  }

};

export default formReducer;