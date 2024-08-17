import { Controller, Get, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderResponseDescription } from './file-uploader.const';
import { FileInterceptor } from '@nestjs/platform-express';
import { fillDto } from '@project/shared-helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { MongoIdValidationPipe } from '@project/pipes';


@ApiTags('File service')
@Controller('/files')
export class FileUploaderController {
  constructor(
    private readonly fileService: FileUploaderService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: FileUploaderResponseDescription.FileSaved
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: FileUploaderResponseDescription.SavingFailed
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FileUploaderResponseDescription.FileFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FileUploaderResponseDescription.FileNotFound
  })
  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile.toPOJO())
  }
}
