import React from 'react';
import { ILayoutProps } from './baseLayout';

interface IFormHeaderProps {
  header: string
}

class FormHeader extends React.Component<ILayoutProps & IFormHeaderProps> {
  render(): JSX.Element {
    return (
      <h1> <b>{this.props.header}</b> </h1>
    );
  }
}

export default FormHeader;