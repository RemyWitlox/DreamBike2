import { Role } from './role';

export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: Role;
  token?: string;
  access_token?: string;
  refreshToken?: string;
  expiryDuration?: Date;
}
