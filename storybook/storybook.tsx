import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';

configure(() => {
  require('./storybook-registry');
}, module);

const StorybookUI = getStorybookUI({ port: 9001, host: 'localhost', onDeviceUI: true });

export class StorybookUIRoot extends React.Component {
  componentDidMount() {
    if(typeof __TEST__ === 'undefined' || !__TEST__) {

    }
  }

  render() {
    return <StorybookUI />
  }
}