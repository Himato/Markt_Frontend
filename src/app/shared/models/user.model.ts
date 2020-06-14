export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public role: string,
    private tokenCode: string,
    private tokenExpirationDate: Date
  ) { }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.tokenCode;
  }
}

export class UserReport {
  name: string;
  email: string;
  type: string;
  createdDateTime: Date;
  numberOfProducts: number;
  numberOfFinishedPurchases: number;
  numberOfAwaitPurchases: number;
  totalPaidMoney: number;
  totalAwaitMoney: number;
  totalGainedMoney: number;
}
