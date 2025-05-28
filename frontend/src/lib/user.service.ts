import { ApiService } from './api.service';

export interface User {
  id: number;
  username: string;
}

export class UserService extends ApiService {
  static async getCurrentUser(): Promise<User> {
    return this.fetchApiJson('/users/me');
  }
}
