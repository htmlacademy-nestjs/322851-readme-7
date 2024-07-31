import { Entity, EntityFactory, StorableEntity } from '@project/shared-core';
import { Repository } from './repository.interface';
import { PrismaClientService } from '@project/blog-models';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>> implements Repository<T> {

    constructor(
      protected entityFactory: EntityFactory<T>,
      protected readonly client: PrismaClientService
    ) {}

    protected createEntityFromDocument(document: DocumentType): T | null {
      if (!document) {
        return null;
      }

      return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
    }

    public async findById(id: T['id']): Promise<T | null> {
      console.log(id);
      throw new Error('Not implemented');
    }

    public async update(entity: T): Promise<void> {
      console.log(entity);
      throw new Error('Not implemented');
    }

    public async save(entity: T): Promise<void> {
      console.log(entity);
      throw new Error('Not implemented');
    }

    public async deleteById(id: T['id']): Promise<void> {
      console.log(id);
      throw new Error('Not implemented');
    }
}
