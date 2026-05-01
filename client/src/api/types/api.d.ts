export interface ApiSuccessResponse<T> {
  data?: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    errors?: Record<string, Record<string, string>>;
  };
}

export interface User {
  id?: string;
  email: string;
  createdAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}

export interface File {
  id: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: Date;
  folderId: string;
}

export interface ShareLink {
  path: string;
  expiresAt: Date;
}

export interface SharedFolder extends Folder {
  id: never;
  files: File[];
}
