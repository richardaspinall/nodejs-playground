export default class User {
  constructor(public username: string, public image: string, private _password: string) {}
  getPassword(): string {
    return this._password;
  }
  getJsonObject(): Object {
    return {
      username: this.username,
      image: this.image,
    };
  }
}
