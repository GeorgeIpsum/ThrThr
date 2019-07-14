import * as env from '../../env';

export interface ApiConfig {
  url: string;
  timeout: number;
};

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: env.API || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
};