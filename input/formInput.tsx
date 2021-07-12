import React from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { TProps, mapStateToProps, mapDispatchToProps, IStateProps, IActionProps, IBaseInputProps, questionInit } from './baseInput';
import FormConditional from '../layout/formConditional';
import { TState } from '../../store/appState';
import { TFormQuestion, TFormQuestionValueType } from 'AuctorForm/core/form.core';
import { TFormQuestionValue } from 'AuctorForm/core/form.core';

interface IFormInputProps extends TProps {
    size?: SizeType,
    defaultValue?: string,
    readonly?: boolean,
    textLimit?: number
}

/**
 * Form Input Component
 */
class FormInput extends React.Component<IFormInputProps> {

  constructor(props: IFormInputProps) {
    super(props);
    // pre fill question
    const fillQuestion: TFormQuestion = {
      id: this.props.id,
      valueType: TFormQuestionValueType.text,
      value: this.props.defaultValue || '',
      rules: {
        required: this.props.required || false,
        conditional: this.props.conditional,
        textLimit: this.props.textLimit || Number.MAX_SAFE_INTEGER,
        inputStatus: '',
        helpMessage: ''
      }
    };
    this.props.actions.createQuestion(fillQuestion);

    // bind methods
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: TFormQuestionValue = event.target.value;
    this.props.actions.saveQuestionValue(this.props.id, value);
  }

  inputComponent() {
    return (
      <FormConditional {...this.props}>
        <div>
          <Form.Item
            required={this.props.required}
            label={this.props.label}
            validateStatus={this.props.selectors.getQuestion.rules.inputStatus}
            help={this.props.selectors.getQuestion.rules.helpMessage}
            style={{
              margin: 0
            }}
          >
            <Input 
              size={this.props.size || 'middle'} 
              value={this.props.defaultValue}
              onBlur={this.changeValue}
            />
          </Form.Item>
        </div>
      </FormConditional>
    );
  }

  render(): JSX.Element {
    return questionInit(this.props) ? this.inputComponent() : <></>;
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormInput);