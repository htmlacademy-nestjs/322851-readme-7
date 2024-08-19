import { Entity, StorableEntity, File } from '@project/shared-core';

export class FileUploaderEntity extends Entity implements StorableEntity<File> {
  public originalName: string;
  public size: number;
  public mimeType: string;
  public hashName: string;
  public path: string;
  public createdAt: Date;
  public updatedAt: Date;
  public subDirectory: string;

  constructor(file?: File) {
    super();

    this.populate(file);
  }

  public populate(file: File) {
    if (file) {
      this.id = file.id ?? '';
      this.originalName = file.originalName;
      this.size = file.size;
      this.mimeType = file.mimeType;
      this.hashName = file.hashName;
      this.path = file.path;
      this.createdAt = file.createdAt;
      this.updatedAt = file.updatedAt;
      this.subDirectory = file.subDirectory;
    }
  }

  public toPOJO(): File {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimeType: this.mimeType,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory
    }
  }
}
