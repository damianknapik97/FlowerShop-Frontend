import { AccountRole } from '../../constants/account-role.enum';

export interface UserDTO {
    accId: string;
    role: AccountRole;
    token?: string;
}
