import { Instance, types } from 'mobx-state-tree';
import { RootNavigator } from './root-navigator';
import { NavigationActions, NavigationAction } from 'react-navigation';
import { NavigationEvents } from './navigation-events';

const DEFAULT_STATE = RootNavigator.router.getStateForAction(NavigationActions.init(), null);

function findCurrentRoute(navState) {
  const route = navState.routes[navState.index];
  if(route.routes) {
    return findCurrentRoute(route);
  } return route;
}

export const NavigationStoreModel = NavigationEvents.named("NavigationStore")
  .props({
    state: types.optional(types.frozen(), DEFAULT_STATE),
  })
  .preProcessSnapshot(snapshot => {
    if(!snapshot || !Boolean(snapshot.state)) return snapshot;

    try {
      RootNavigator.router.getPathAndParamsForState(snapshot.state);
      return snapshot;
    } catch(e) {
      return { ...snapshot, state: DEFAULT_STATE }
    }
  })
  .actions(self => ({
    actionSubscribers() {
      return self.subs;
    },
    dispatch(action: NavigationAction, shouldPush: boolean = true) {
      const previousNavState = shouldPush ? self.state : null;
      self.state = RootNavigator.router.getStateForAction(action, previousNavState) || self.state;
      self.fireSubscribers(action, previousNavState, self.state);
      return true;
    },
    reset() {
      self.state = DEFAULT_STATE;
    },
    findCurrentRoute() {
      return findCurrentRoute(self.state);
    },
  }))
  .actions(self => ({
    navigateTo(routeName: string) {
      self.dispatch(NavigationActions.navigate({ routeName }));
    },
  }));

export type NavigationStore = Instance<typeof NavigationStoreModel>;