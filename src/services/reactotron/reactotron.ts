import { RootStore } from '../../models/root-store/root-store';
import { onSnapshot } from 'mobx-state-tree';
import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from './reactotron-config';
import { clear } from '../../utils/storage';
import Tron from 'reactotron-react-native';
import { mst } from 'reactotron-mst';

declare global {
  interface Console {
    tron: typeof Tron;
  }
};

const noop = () => undefined;

if(__DEV__) {
  console.tron = Tron;
} else {
  // @ts-ignore since this breaks everything
  console.tron = {
    benchmark: noop,
    clear: noop,
    close: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    overlay: noop,
    reportError: noop,
    use: noop,
    useReactNative: noop,
    warn: noop,
  };
}

export class Reactotron {
  config: ReactotronConfig;
  rootStore: any;

  constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
    this.config = {
      host: "localhost",
      useAsyncStorage: true,
      ...config,
      state: {
        initial: false,
        snapshots: false,
        ...(config && config.state),
      },
    };
  }

  setRootStore(rootStore: any, initialData: any) {
    if(__DEV__) {
      rootStore = rootStore as RootStore; //this is allegedly a typescript hack. no idea how or why
      this.rootStore = rootStore;

      const { initial, snapshots } = this.config.state;
      const name = "ROOT STORE";

      if(initial) {
        console.tron.display({ name, value: initialData, preview: "Initial State" });
      }

      if(snapshots) {
        onSnapshot(rootStore, snapshot => {
          console.tron.display({ name, value: snapshot, preview: "New State" });
        });
      }

      // @ts-ignore
      console.tron.trackMstNode(rootStore);
    }
  }

  async setup() {
    if(__DEV__) {
      Tron.configure({
        name: this.config.name || require('../../../package.json'),
        host: this.config.host,
      });

      Tron.useReactNative({
        asyncStorage: this.config.useAsyncStorage ? undefined : false,
      });

      const RX = /postProcessingSnapshot|@APPLY_SNAPSHOT/;

      Tron.use(
        mst({
          filter: event => RX.test(event.name) === false,
        }),
      );

      Tron.connect();

      Tron.onCustomCommand({
        title: 'Reset Root Store',
        description: 'Resets the MST store',
        command: 'resetStore',
        handler: () => {
          console.tron.log("resetting store");
          clear();
        },
      });

      if(this.config.clearOnLoad) {
        Tron.clear();
      }
    }
  }
};