import * as React from 'react';
import { observer } from 'mobx-react';
import { ViewStyle, Text } from 'react-native';
import { color } from '../../theme';
import { Screen } from '../../dummies/screen';
import { NavigationScreenProps } from 'react-navigation';

export interface LoginScreenProps extends NavigationScreenProps<{}> {
  entries: any;
};

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

@observer
export class LoginScreen extends React.Component<LoginScreenProps, {}> {

  render() {
    return (
      <Screen style={ROOT} preset="fixed">
        <Text>welcome to zombocom dot com</Text>
      </Screen>
    );
  }
}