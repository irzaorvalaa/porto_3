export type LoginType = "1" | "2"; // 1: Alumni | 2: Industry/BULC

export declare interface ILoginExternalFormData {
  username: string;
  password: string;
  loginType: LoginType;
}
