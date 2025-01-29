export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    private _password: string,
  ) {}

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
