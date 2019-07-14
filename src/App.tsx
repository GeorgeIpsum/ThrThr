/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import { StatefulNavigator } from './navigation';
import { RootStore, setupRootStore } from './models/root-store';
import { Provider } from 'mobx-react';
import { contains } from './utils/helpers';
import { DEFAULT_NAVIGATION_CONFIG } from './navigation/navigation-config';
import { BackButtonHandler } from './navigation/back-button-handler';

interface AppState {
  rootStore?: RootStore;
};

export class App extends React.Component<{}, AppState> {
  async componentDidMount() {
    this.setState({
      rootStore: await setupRootStore(),
    });
  }

  canExit(routeName: string) {
    return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes);
  }

  render() {
    const rootStore = this.state && this.state.rootStore;

    if(!rootStore) {
      return null;
    }

    const otherStores = {};

    return (
      <Provider rootStore={rootStore} navigationStore={rootStore.navigationStore} {...otherStores}>
        <BackButtonHandler canExit={this.canExit}>
          <StatefulNavigator />
        </BackButtonHandler>
      </Provider>
    );
  }
};

export default App;
