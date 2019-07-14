import * as React from 'react';
import { observer } from 'mobx-react';
import { ViewStyle, Text } from 'react-native';
import { color } from '../../theme';
import { Screen } from '../../dummies/screen';
import { NavigationScreenProps } from 'react-navigation';

export interface HomeScreenProps extends NavigationScreenProps<{}> {
  entries: any;
};

const ROOT: ViewStyle = {
  backgroundColor: color.background,
};

@observer
export class HomeScreen extends React.Component<HomeScreenProps, {}> {
  render() {
    return(
      <Screen style={ROOT} preset="fixed">
        <Text>how'd you get here?</Text>
      </Screen>
    );
  }
}