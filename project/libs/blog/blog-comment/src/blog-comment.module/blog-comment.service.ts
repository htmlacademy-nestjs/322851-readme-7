import { Injectable, NotImplementedException } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor (
    private readonly repository: BlogCommentRepository
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.repository.findByPostId(postId);
  }

  public async createComment(dto: CreateCommentDto, postId: string): Promise<BlogCommentEntity> {
    throw new NotImplementedException();
  }

  public async deleteComment(id: string): Promise<void> {
    await this.repository.deleteById(id);
  }
}
