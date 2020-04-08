import { AccountRole } from '../../constants/account-role.enum';

export interface AccountDTO {
  name: string;
  email: string;
  password: string;
  role: AccountRole;
}
