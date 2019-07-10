import { types } from 'mobx-state-tree';
import { EventType, NavigationEventCallback } from 'react-navigation';

export const NavigationEvents = types.model("NavigationEvents").volatile(() => {
  const subs = new Set<NavigationEventCallback>();

  const fireSubscribers = (action: any, oldState: any, newState: any) => {
    subs.forEach(subscriber => {
      subscriber({
        type: "action",
        action,
        state: newState,
        lastState: oldState
      });
    });
  };

  const addListener = (eventName: EventType, handler: NavigationEventCallback) => {
    if(eventName !== "action") {
      return { remove: () => {} };
    }

    subs.add(handler);

    return {
      remove: () => subs.delete(handler)
    };
  };

  return { addListener, fireSubscribers, subs };
});