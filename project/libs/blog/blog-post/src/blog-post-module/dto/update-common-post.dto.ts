import { UpdateLinkPostDto } from './update-link-post.dto';
import { UpdatePhotoPostDto } from './update-photo-post.dto';
import { UpdateQuotePostDto } from './update-quote-post.dto';
import { UpdateTextPostDto } from './update-text-post.dto';
import { UpdateVideoPostDto } from './update-video-post.dto';

export type UpdateCommonPostDto = UpdateVideoPostDto | UpdatePhotoPostDto | UpdateLinkPostDto | UpdateQuotePostDto | UpdateTextPostDto;
