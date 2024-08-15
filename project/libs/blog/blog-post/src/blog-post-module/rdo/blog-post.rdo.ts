import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TagRdo } from '@project/blog-tag';
import { VideoPostRdo } from './blog-video-post.rdo';
import { QuotePostRdo } from './blog-quote-post.rdo';
import { LinkPostRdo } from './blog-link-post.rdo';
import { PhotoPostRdo } from './blog-photo-post.rdo';
import { TextPostRdo } from './blog-text-post.rdo';

export class BlogPostRdo {
  @ApiProperty({
    description: 'One of the five type: video, photo, text, link, quote',
    example: 'Video'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Flag that shows if the post is published.',
    example: 'true'
  })
  @Expose()
  public isPublished: boolean;

  @ApiProperty({
    description: 'Repost flag',
    example: 'true'
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'If Repost flag is true, shows the original post ID. ',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b'
  })
  @Expose()
  public originalId?: string;

  @ApiProperty({
    description: 'If Repost flag is true, shows the original post author ID.',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  public originalAuthor?: string;

  @ApiProperty({
    description: 'Comments count',
    example: 10
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Likes count',
    example: 8
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'List of tags',
    example: [{title: '#js', id: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b'}, {title: '#helloworld', id: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b'}]
  })
  @Expose()
  @Type(() => TagRdo)
  public tags: TagRdo[];

  @ApiProperty({
    description: 'Url of the link or video',
    example: 'https://up.htmlacademy.ru/profession/fullstack/7/nodejs-2'
  })
  @Expose()
  public url?: string;

  @ApiProperty({
    description: 'Description of the link',
    example: 'This is wonderful course from HtmlAcademy'
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Path to the image',
    example: 'example.jpg'
  })
  @Expose()
  public path?: string;

  @ApiProperty({
    description: 'Author of the quote',
    example: 'Some ginger wildling girl'
  })
  @Expose()
  public author?: string;

  @ApiProperty({
    description: 'Text of the post',
    example: 'You know nothing, Jon Snow'
  })
  @Expose()
  public content?: string;

  @ApiProperty({
    description: 'Title of the post',
    example: 'Tset title'
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    description: 'Short description of the post',
    example: 'This post is about test'
  })
  @Expose()
  public preview?: string;

  @ApiProperty({
    description: 'Date of the post\'s creation in iso format',
    example: '2024-10-05'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of the last update in iso format',
    example: '2024-10-05'
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  @Type(() => VideoPostRdo)
  public video?: VideoPostRdo;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  @Type(() => QuotePostRdo)
  public quote?: QuotePostRdo;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  @Type(() => LinkPostRdo)
  public link?: LinkPostRdo;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  @Type(() => PhotoPostRdo)
  public photo?: PhotoPostRdo;

  @ApiProperty({
    description: 'Author of the post id',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  @Type(() => TextPostRdo)
  public text?: TextPostRdo;
}
