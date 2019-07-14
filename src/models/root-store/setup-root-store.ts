import { onSnapshot } from 'mobx-state-tree';
import { RootStoreModel, RootStore } from './root-store';
import { Environment } from '../environment';
import * as storage from '../../utils/storage';
import { Reactotron } from '../../services/reactotron';
import { Api } from '../../services/api';

const ROOT_STATE_STORAGE_KEY = "root";

export async function createEnvironment() {
  const env = new Environment();

  env.reactotron = new Reactotron();
  env.api = new Api();

  await env.reactotron.setup();
  await env.api.setup();

  return env;
}

export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;

  const env = await createEnvironment();
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch(e) {
    rootStore = RootStoreModel.create({}, env);
    if(__DEV__) {
      console.error(e.message, null);
      console.tron.error(e.message, null);
    }
  }

  if(__DEV__) {
    env.reactotron.setRootStore(rootStore, data);
  }

  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot));

  return rootStore;
}