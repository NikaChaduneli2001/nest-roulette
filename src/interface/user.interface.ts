export class UsersInterface {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  balance: number;
  role: string;
  active: boolean;
}
export function createUserInterface(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    balance: user.balance,
    password: user.password,
    phone: user.phone,
    active: user.active,
  };
}
