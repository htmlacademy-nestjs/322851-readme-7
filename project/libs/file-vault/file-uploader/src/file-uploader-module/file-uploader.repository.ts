import { FileUploaderEntity } from './file-uploader.entity';
import { BaseMongoRepository } from '@project/data-access';
import { FileUploaderFactory } from './file-uploader.factory';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';

@Injectable()
export class FileUploaderRepository extends BaseMongoRepository<FileUploaderEntity, FileModel> {
  constructor(
    fileFactory: FileUploaderFactory,
    @InjectModel(FileModel.name) fileModel: Model<FileModel>
  ) {
    super(fileFactory, fileModel);
  }
}
