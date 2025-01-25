export type SignInArgs = {
  email: string;
  password: string;
};

export type SignInResponse = {
  resultCode: number;
  httpCode: number;
  messages: 'string';
  data: 'string';
};
