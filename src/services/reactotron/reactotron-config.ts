export interface ReactotronConfig {
  name?: string;
  host?: string;
  useAsyncStorage?: boolean;
  clearOnLoad?: boolean;
  state?: {
    initial?: boolean,
    snapshots?: boolean,
  };
};

export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  state: {
    initial: true,
    snapshots: true,
  },
};