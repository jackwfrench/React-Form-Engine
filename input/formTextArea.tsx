import React from 'react';
import { connect } from 'react-redux';
import { Input, Form } from 'antd';
import { RenderLabel, questionInit,IActionProps, IBaseInputProps, IStateProps, mapDispatchToProps, mapStateToProps, TProps } from './baseInput';
import FormConditional from '../layout/formConditional';
import { TState } from '../../store/appState';
import { TFormQuestion, TFormQuestionValueType } from '../../../core/form/form.core';

const { TextArea } = Input;

interface ITextAreaProps extends TProps {
  rows?: number
}

class FormTextArea extends React.Component<ITextAreaProps> {

  constructor(props: ITextAreaProps) {
    super(props);
    // pre fill question
    const fillQuestion: TFormQuestion = {
      id: this.props.id,
      valueType: TFormQuestionValueType.text,
      value: '',
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

  textAreaComponent() {
    return (
      <FormConditional {...this.props}>
        <div>
          <Form.Item
            validateStatus={this.props.selectors.getQuestion.rules.inputStatus}
            help={this.props.selectors.getQuestion.rules.helpMessage}
            style={{
              margin: 0
            }}
          >
            <RenderLabel label={this.props.label} />
            <TextArea rows={this.props.rows || 3} />
          </Form.Item>
        </div>
      </FormConditional>
    );
  }

  render(): JSX.Element {
    return questionInit(this.props) ? this.textAreaComponent() : <></>;
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormTextArea);