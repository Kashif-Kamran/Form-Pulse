export const UserRoles = {
  Admin: 'ADMIN',
  Nutritionist: 'NUTRITIONIST',
  Veterinarian: 'VETERINARIAN',
  Caretaker: 'CARE_TAKER',
} as const;

export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: UserRolesType;
  private _password: string;

  constructor({
    id,
    name,
    email,
    password,
    role,
  }: {
    id: User['id'];
    name: User['name'];
    email: User['email'];
    password: User['_password'];
    role: User['role'];
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this._password = password;
    this.role = role;
  }

  getPassword() {
    return this._password;
  }

  getPublicFeils(): Omit<User, '_password'> {
    return {
      ...this,
      _password: undefined,
    };
  }
}
