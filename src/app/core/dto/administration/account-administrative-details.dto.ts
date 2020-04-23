import { AccountRole } from '../../constants/account-role.enum';

export interface AccountAdministrativeDetailsDTO {
  id: string;
  name: string;
  password: string;
  email: string;
  role: AccountRole;
  creationDate: string;
}
