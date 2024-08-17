import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BlogTagRepository } from "./blog-tag.repository";
import { BlogTagEntity } from "./blog-tag.entity";
import { TagDto } from "./dto/create-tag.dto";

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  public async getTag(id: string): Promise<BlogTagEntity> {
    return this.blogTagRepository.findbyId(id);
  }

  public async createTag(dto: TagDto): Promise<BlogTagEntity> {
    const existTag = (await this.blogTagRepository.find({ title: dto.title})).at(0);

    if (existTag) {
      throw new ConflictException(`Tag '${dto.title}' already exist`);
    }

    const newTag = new BlogTagEntity(dto);
    await this.blogTagRepository.save(newTag);

    return newTag;
  }

  public async findOrCreate(dtos: string[]): Promise<BlogTagEntity[]> {
    const titles = dtos.map((title) => title);
    const tags = await this.blogTagRepository.findByTitles(titles);

    if (tags.length != titles.length) {
      const foundTags = tags.map((tag) => tag.title);
      const notFoundTags = titles.filter((title) => !foundTags.includes(title));

      if (notFoundTags.length > 0) {
        const newTitles = notFoundTags.map((title) => ({title}));
        const documents = await this.blogTagRepository.createMany(newTitles);
        return [...tags, ...documents];
      }
    }
    return tags;
  }


  public async getTagsByTitles(titles: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.findByTitles(titles);

    if (tags.length != titles.length) {
      const foundTags = tags.map((tag) => tag.id);
      const notFoundTags = titles.filter((id) => !foundTags.includes(id));

      if (notFoundTags.length > 0) {
        throw new NotFoundException(`Tags with ids ${notFoundTags} not found.`);
      }
    }

    return tags;
  }
}
