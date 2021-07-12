import React from 'react';
import { connect } from 'react-redux';
import { TFormQuestion, TFormQuestionValue, TFormQuestionValueType } from '../core/form.core';
import { TProps, mapDispatchToProps, mapStateToProps, questionInit, IStateProps, IActionProps, IBaseInputProps } from './baseInput';
import FormConditional from '../layout/formConditional';
import { Radio, Form } from 'antd';
import { TState } from '@Store/appState';
import { RadioChangeEvent } from 'antd/lib/radio';

interface IFormRadioButtonProps extends TProps {
  options: Array<string>,
  default?: number
  inline?: boolean
}

/**
 * Form RadioButtons Component
 */
class FormRadioButtons extends React.Component<IFormRadioButtonProps> {

  constructor(props: IFormRadioButtonProps) {
    super(props);
    // pre fill question
    const fillQuestion: TFormQuestion = {
      id: this.props.id,
      valueType: TFormQuestionValueType.radioGroup,
      value: this.props.default !== undefined ? this.props.options[this.props.default] : '',
      rules: {
        required: this.props.required || false,
        conditional: this.props.conditional,
        inputStatus: '',
        helpMessage: ''
      }
    };

    if (!questionInit(this.props)) {
      this.props.actions.createQuestion(fillQuestion);
    }
  }

  changeButton = (event: RadioChangeEvent) => {
    const value: TFormQuestionValue = event.target.value;
    this.props.actions.saveQuestionValue(this.props.id, value);
  };

  radioButtonComponent() {
    return (
      <FormConditional {...this.props}>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Form.Item
            required={this.props.required}
            label={this.props.label}
            validateStatus={this.props.selectors.getQuestion.rules.inputStatus}
            help={this.props.selectors.getQuestion.rules.helpMessage}
            style={{
              margin: -10,
              fontSize: 24
            }}
          >
            {/**<RenderLabel label={ this.props.label } required={this.props.required} />**/}
            {/**<RenderNewLine inline={ this.props.inline || false }/>**/}
            <Radio.Group 
              defaultValue={ this.props.default !== undefined ? this.props.options[this.props.default] : '' }
              options={ this.props.options }
              onChange={ this.changeButton }
              optionType="button"
              buttonStyle="solid"
              size="large"
              style={{
                fontSize: '24px',
                marginLeft: 20,
                float: 'right'
              }}
            />
          </Form.Item>
        </div>
      </FormConditional>
    );
  }

  render(): JSX.Element {
    return questionInit(this.props) ? this.radioButtonComponent() : <></>;
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormRadioButtons);