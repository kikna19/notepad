export interface User {
  email: string,
  uid: string,
  authed: boolean
}

export interface Note {
  key: any;
  note: any;
  time: any;
  lock?: any;
  locked?: boolean;
}
