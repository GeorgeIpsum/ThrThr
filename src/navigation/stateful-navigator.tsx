import * as React from 'react';
import { inject, observer } from 'mobx-react';
// @ts-ignore, getNavigation isn't updated yet
import { getNavigation, NavigationScreenProp, NavigationState } from 'react-navigation';
import { RootNavigator } from './root-navigator';
import { NavigationStore } from './navigation-store';

interface StatefulNavigatorProps {
  navigationStore?: NavigationStore
}

@inject("navigationStore")
@observer
export class StatefulNavigator extends React.Component<StatefulNavigatorProps, {}> {
  currentNavProp: NavigationScreenProp<NavigationState>;

  getCurrentNavigation = () => {
    return this.currentNavProp;
  }

  render() {
    const { state, dispatch, actionSubscribers} = this.props.navigationStore;

    this.currentNavProp = getNavigation(
      RootNavigator.router,
      state,
      dispatch,
      actionSubscribers(),
      {},
      this.getCurrentNavigation,
    );

    return <RootNavigator navigation={this.currentNavProp} />
  }
}