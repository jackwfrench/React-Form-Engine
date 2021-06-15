import React from 'react';
import { ILayoutProps } from './baseLayout';

class FormSectionHeader extends React.Component<ILayoutProps> {
  render(): JSX.Element {
    return (
      <h2> {this.props.children} </h2>
    );
  }
}

export default FormSectionHeader;