import React from 'react';
import { Divider } from 'antd';

class FormDivider extends React.Component {
  render(): JSX.Element {
    return (
      <Divider style={{
        backgroundColor: 'grey',
      }} />
    );
  }
}

export default FormDivider;