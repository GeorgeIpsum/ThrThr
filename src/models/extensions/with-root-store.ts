import { IStateTreeNode, getRoot } from 'mobx-state-tree';
import { RootStore } from '../root-store';

export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    get rootStore() {
      return getRoot(self) as RootStore;
    },
  },
});