import React from 'react';
import { ILayoutProps } from './baseLayout';

interface ILabelProps {
  label: string
  required?: boolean;
}

class FormLabel extends React.Component<ILabelProps & ILayoutProps> {
  render(): JSX.Element {
    return (
      <label style={{
        fontSize: 'large',
        paddingBottom: 10
      }}>{this.props.label} {this.props.required ? '*' : ''}</label>
    );
  }
}

export default FormLabel;