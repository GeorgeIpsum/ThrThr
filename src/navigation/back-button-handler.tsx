import * as React from 'react';
import { BackHandler } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import { NavigationStore } from './navigation-store';

interface BackButtonHandlerProps {
  navigationStore?: NavigationStore;
  canExit(routeName: string): Boolean;
};

@inject("navigationStore")
@observer
export class BackButtonHandler extends React.Component<BackButtonHandlerProps, {}> {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const routeName = this.props.navigationStore.findCurrentRoute().routeName;

    if(this.props.canExit(routeName)) {
      return false;
    } else {
      this.props.navigationStore.dispatch(NavigationActions.back());
      return true;
    }
  }

  render() {
    return this.props.children;
  }
}