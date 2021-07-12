import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DatePicker, Form} from 'antd';
import * as Date from '../../core/helpers/date';
import { TProps, mapStateToProps, questionInit, mapDispatchToProps, RenderLabel, IStateProps, IActionProps, IBaseInputProps } from './baseInput';
import FormConditional from '../layout/formConditional';
import { TState } from '../../store/appState';
import { TFormQuestion, TFormQuestionValueType } from '../core/form.core';

/**
 * Form DatePicker Component
 */
class FormDatePicker extends React.Component<TProps> {

  constructor(props: TProps) {
    super(props);

    // initialise question and store in state
    const fillQuestion: TFormQuestion = {
      id: this.props.id,
      valueType: TFormQuestionValueType.date,
      value: this.props.defaultValue || Date.dateToString(Date.getDate()),
      rules: {
        required: this.props.required || false,
        conditional: this.props.conditional,
        inputStatus: '',
        helpMessage: ''
      }
      
    };

    this.props.actions.createQuestion(fillQuestion);

    // method bindings
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(value: moment.Moment | null, dateString: string) {
    this.props.actions.saveQuestionValue(this.props.id, dateString);
  }

  datePickerComponent() {
    return (
      <FormConditional {...this.props}>
        <div style={{padding: 5}}>
          <Form.Item
            validateStatus={this.props.selectors.getQuestion.rules.inputStatus}
            help={this.props.selectors.getQuestion.rules.helpMessage}
            style={{
              margin: 0
            }}
          >
            <RenderLabel label={this.props.label} required={this.props.required} />
            <DatePicker 
              defaultValue={ Date.stringToDate(this.props.defaultValue as string) || undefined }
              onChange={ this.changeValue }
              style={{marginTop: 10}} 
            />
          </Form.Item>
        </div>
      </FormConditional>
    );
  }

  render(): JSX.Element {
    return questionInit(this.props) ? this.datePickerComponent() : <></>;
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormDatePicker);