import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import * as Types from './api-types';

export class Api {
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    
  }

  async getUsers(): Promise<Types.GetUsersResult> {
    return { kind: "ok", users: [] };
  }

  async getUser(id: string): Promise<Types.GetUserResult> {
    return { kind: "ok", user: { id: 0, name: "test" } };
  }
};