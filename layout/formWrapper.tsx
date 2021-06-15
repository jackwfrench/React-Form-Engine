import React from 'react';
import { ILayoutProps } from './baseLayout';

class formWrapper extends React.Component<ILayoutProps> {
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

export default formWrapper;