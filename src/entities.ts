export interface CreateUserI {
  email: string;
  password: string;
  displayName: string;
}

export interface noteI {
  id?: string;
  title: string;
  body: string;
  date: number;
}

export interface noteActiveI {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
}
