import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ILayoutProps } from './baseLayout';
import FormActions from '@AuctorForm/store/form/formActions';
import { TState } from '@Store/appState';

interface IDispatchProps {
  clearForm: () => void
}

interface IStateProps {
  formType: string
}

type IComponentProps = IDispatchProps & ILayoutProps & IStateProps;

class formWrapper extends React.Component<IComponentProps> {

  constructor(props: IComponentProps) {
    super(props);
    this.props.clearForm();
  }

  componentDidUpdate(prevProps: IComponentProps) {
    if (prevProps.formType !== this.props.formType) {
      this.forceUpdate();
    }
  }

  render(): JSX.Element {
    return (
      <div style={{
        padding: 30,
        maxWidth: 1200,
        margin: 'auto'
      }}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: TState): IStateProps => {
  return {
    formType: state.form.formType
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    clearForm: () => dispatch(FormActions.clearForm())
  };
};

export default connect<IStateProps, IDispatchProps, unknown, TState>(mapStateToProps, mapDispatchToProps)(formWrapper);