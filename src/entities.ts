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

export interface fileI {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface imageUrls {
  public_id: string;
  secure_url: string;
}
