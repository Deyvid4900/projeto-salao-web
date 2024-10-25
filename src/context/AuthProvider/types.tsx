export interface IUser {
  email?: string;
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: any, password: any) => Promise<Boolean>;

  logout: () => void;
}

export interface IAuthProvider{
    children: JSX.Element;
}
