import React from 'react';
import { connect } from 'react-redux';
import FormConditional from './formConditional';
import { TProps, IStateProps, IActionProps, IBaseInputProps, mapStateToProps, mapDispatchToProps } from '../input/baseInput';
import { TState } from '../../store/appState';
import Form from 'antd/lib/form/Form';

interface ISectionProps {
  layout?: 'horizontal' | 'vertical';
}

class FormSection extends React.Component<TProps & ISectionProps> {
  render(): JSX.Element {
    return (
      <FormConditional {...this.props}>
        <div style={{
          border: '1px solid silver',
          borderRadius: '3px',
          backgroundColor: 'white',
          padding: 30,
          marginBottom: 30
        }}>
          <Form layout={this.props.layout || 'vertical'}>
            {this.props.children}
          </Form>
        </div>
      </FormConditional>
    );
  }
}

export default connect<IStateProps, IActionProps, IBaseInputProps, TState>(mapStateToProps, mapDispatchToProps)(FormSection);