export interface File {
  id?: string;
  originalName: string;
  size: number;
  mimeType: string;
  hashName: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  subDirectory: string;
}
