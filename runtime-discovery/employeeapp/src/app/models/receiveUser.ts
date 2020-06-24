import { Role } from './role';

export class ReceiveUser {
  name: string;
  username: string;
  role: Role;
  access_token?: string;
  refresh_token?: string;
  refresh_expires_in?: number;
  scope?: string;
  id_token?: string;
  token_type?: string;
  session_state?: string;
  expires_in?: number;
}
