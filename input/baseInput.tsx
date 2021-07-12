import React from 'react';
import { Dispatch } from 'redux';
import { store, TState } from '../../store/appState';
import { TFormQuestion, TForm, TFormQuestionValue } from 'AuctorForm/core/form.core';
import { TFormQuestionConditional } from 'AuctorForm/core/form.rules';
import * as actionTypes from '../store/form/formActionTypes';
import * as FormSelectors from '../store/form/formSelectors';

/**
 * Action Props
 */
export interface IActionProps {
  actions: {
    saveQuestion: (question: TFormQuestion) => void;
    createQuestion: (question: TFormQuestion) => void;
    saveQuestionValue: (questionId: number, value: TFormQuestionValue) => void;
    clearForm: () => void;
  };
}

/**
 * Selector Props
 */
export interface ISelectorProps {
  getQuestion: TFormQuestion;
}

/**
 * State Props
 */
export interface IStateProps {
  form: TForm
  selectors: ISelectorProps
}


/**
 * Base Input Props
 */
export interface IBaseInputProps {
  id: number,
  label?: string,
  defaultValue?: TFormQuestionValue
  required?: boolean
  conditional?: TFormQuestionConditional,
  children?: JSX.Element,
}

/**
 * Combination of all Props
 */
export type TProps = IBaseInputProps & IStateProps & IActionProps;

/**
 * Maps the form state to the props
 * @param state 
 * @returns 
 */
export const mapStateToProps = (state: TState, props: IBaseInputProps): IStateProps => {
  return { 
    form: state.form,
    selectors: {
      getQuestion: FormSelectors.getQuestionSelector(state.form, props.id),
    }
  };
};

/**
 * Maps the form dispatch to the props
 * @param dispatch 
 * @returns 
 */
export const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
  return {
    actions: {
      clearForm: () => dispatch({ type: actionTypes.CLEAR_FORM }),
      saveQuestion: (question: TFormQuestion) => dispatch({ type: actionTypes.SAVE_QUESTION, payload: question }),
      createQuestion: (question: TFormQuestion) => dispatch({ type: actionTypes.CREATE_QUESTION, payload: question }),
      saveQuestionValue: (questionId: number, value: TFormQuestionValue) => dispatch({ type: actionTypes.SAVE_QUESTION_VALUE, payload: {questionId, value}})
    }
  };
};

/**
 *
 * HELPER FUNCTIONS FOR QUESTION COMPONENTS
 *  
**/

/**
 * Evaluates the coniditional of a question
 * @param props 
 * @returns 
 */
export const evaluateConditional = (conditional: TFormQuestionConditional | undefined): boolean => {
  // check that question is defined and not a section
  if (conditional === undefined) {
    return true;
  }

  // unpack condititonal properties
  const { id, value } = conditional;

  // retrieve question to compare
  const conditionalQuestionValue: TFormQuestion = store.getState().form.questions.filter(q => q.id === id)[0];

  // check question is defined & for equality of conditional and value
  if (conditionalQuestionValue === undefined || conditionalQuestionValue.value !== value) {
    return false;
  }

  return true;
};

/**
 * Renders a label
 * @param props 
 * @returns 
 */
export const RenderLabel = (props: { label?: string, required?: boolean }): JSX.Element => {
  if (props.label) {
    return (
      <label style={{ fontSize: 'large' }}> {props.label} {props.required ? '*' : ''} </label>    
    );
  } else return (<></>);
};

/**
 * Returns whether the store is ready for render of a component
 * @param props 
 * @returns 
 */
export const questionInit = (props: TProps): boolean => {
  // test to see if this question is init
  if (props.selectors.getQuestion === undefined) {
    return false;
  }

  // check to see if a conditional is init
  if (props.conditional !== undefined ) {
    if (props.form.questions.filter(q => q.id === props.conditional?.id).length === 0) {
      return false;
    }
  }

  return true;
};