import React from 'react';
import { connect } from 'react-redux';
import { TState } from '../../store/appState';
import { ILayoutProps } from './baseLayout';
import { mapStateToProps, mapDispatchToProps, TProps, IBaseInputProps, IActionProps, IStateProps, evaluateConditional } from '../input/baseInput';

class FormConditional extends React.Component<TProps & ILayoutProps> {

  constructor(props: TProps & ILayoutProps) {
    super(props);

    this.evaluateComponentConditional = this.evaluateComponentConditional.bind(this);
  }

  /**
   * Evaluates the conditional of the question
   * @props conditional = { id: number, value: TFormQuestionValue }
   * @returns true as default or true or fault if conditional prop is provided
   */
  evaluateComponentConditional(): boolean {
    return evaluateConditional(this.props.conditional);
  }

  renderConditional(): JSX.Element {
    if (this.evaluateComponentConditional()) {
      return (this.props.children) || <></>;
    } else {
      return <></>;
    }
  }

  render(): JSX.Element {
    return this.renderConditional();
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormConditional);