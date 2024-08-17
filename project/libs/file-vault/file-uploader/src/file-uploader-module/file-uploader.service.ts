import 'multer';
import dayjs from 'dayjs';
import { Logger, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FileVaultConfig } from '@project/file-vault-config';
import { join } from 'node:path';
import { extension } from 'mime-types';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import { FileUploaderRepository } from './file-uploader.repository';
import { StoredFile } from '@project/shared-core';
import multer from 'multer';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';



@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
    private readonly fileRepository: FileUploaderRepository
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getSubUploadDirectoryPath() {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        subDirectory,
        fileName,
        fileExtension,
        path
      };
    } catch(error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error('Can\'t save file');
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileUploaderEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileUploaderFactory().create({
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      hashName: storedFile.fileName,
      path: storedFile.path,
      createdAt: undefined,
      updatedAt: undefined,
      subDirectory: storedFile.subDirectory
    })

    this.fileRepository.save(fileEntity);

    return fileEntity;
  }

  public async getFile(fileId: string): Promise<FileUploaderEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (! existFile) {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }

    return existFile;
  }
}
