import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UploadedFileRdo {
  @ApiProperty({
    description: 'Id of the file',
    example: 'ffgdgdfgdfg45456'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Original nmae of the file',
    example: 'exampleFile'
  })
  @Expose()
  originalName: string;

  @ApiProperty({
    description: 'Size of the file',
    example: '232323'
  })
  @Expose()
  size: number;

  @ApiProperty({
    description: 'Mimitype of the file',
    example: 'image/jpeg'
  })
  @Expose()
  mimeType: string;

  @ApiProperty({
    description: 'unique hashName of the file',
    example: 'c7d3f791-cdc2-4d1f-9e8e-7cd9a8be5f33.jpeg'
  })
  @Expose()
  hashName: string;

  @ApiProperty({
    description: 'Directory where file is located on the server',
    example: '2024/08'
  })
  @Expose()
  subDirectory: string;

}
