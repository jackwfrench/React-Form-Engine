import React from 'react';
import { connect } from 'react-redux';
import { InputNumber, Form } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { TProps, mapStateToProps, mapDispatchToProps, questionInit, IStateProps, IActionProps, IBaseInputProps } from './baseInput';
import FormConditional from '../layout/formConditional';
import { TState } from '../../store/appState';
import UOM from '../core/uom/uom';
import { TFormQuestion, TFormQuestionValue, TFormQuestionValueType } from '../core/form.core';

interface IFormInputProps extends TProps {
    size?: SizeType;
    sideLabel?: string;
    units?: UOM,
    readonly?: boolean
}

/**
 * Form InputNumber Component
 */
class FormInputNumber extends React.Component<IFormInputProps> {

  constructor(props: IFormInputProps) {
    super(props);
    // pre fill question
    const fillQuestion: TFormQuestion = {
      id: this.props.id,
      valueType: TFormQuestionValueType.number,
      value: this.props.defaultValue || 0,
      rules: {
        required: this.props.required || false,
        conditional: this.props.conditional,
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

  getUnits(): string {
    return this.props.units || '';
  }

  inputNumberComponent() {
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
            <InputNumber 
              min={0} 
              size={this.props.size || 'middle'} 
              readOnly={this.props.readonly}
              onBlur={this.changeValue}
              style={{
                marginTop: 5,
                marginBottom: 10,
                width: '100%'
              }}/>
          </Form.Item>
        </div>
      </FormConditional>
    );
  }

  render(): JSX.Element {
    return questionInit(this.props) ? this.inputNumberComponent() : <></>;
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormInputNumber);