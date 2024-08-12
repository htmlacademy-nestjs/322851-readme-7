import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BlogTagRepository } from "./blog-tag.repository";
import { BlogTagEntity } from "./blog-tag.entity";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  public async getTag(id: string): Promise<BlogTagEntity> {
    return this.blogTagRepository.findbyId(id);
  }

  public async createTag(dto: CreateTagDto): Promise<BlogTagEntity> {
    const existTag = (await this.blogTagRepository.find({ title: dto.title})).at(0);

    if (existTag) {
      throw new ConflictException(`Tag '${dto.title}' already exist`);
    }

    const newTag = new BlogTagEntity(dto);
    await this.blogTagRepository.save(newTag);

    return newTag;
  }


  public async getTagsByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.findByIds(ids);

    if (tags.length != ids.length) {
      const foundTags = tags.map((tag) => tag.id);
      const notFoundTags = ids.filter((id) => !foundTags.includes(id));

      if (notFoundTags.length > 0) {
        throw new NotFoundException(`Tags with ids ${notFoundTags} not found.`);
      }

    }

    return tags;
  }
}
