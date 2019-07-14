import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { NavigationStoreModel } from '../../navigation/navigation-store';

export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
});

export type RootStore = Instance<typeof RootStoreModel>;

export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;