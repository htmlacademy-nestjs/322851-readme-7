import { StorableEntity, Entity, EntityFactory } from '@project/shared-core';
import { Repository } from './repository.interface';
import { randomUUID } from 'crypto';

export abstract class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>> implements Repository<T> {
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: EntityFactory<T>
  ) {}

  public async findById(id: T['id']): Promise<T | null> {
    const found_entity = this.entities.get(id) || null;

    if (! found_entity) {
      return null;
    }

    return this.entityFactory.create(found_entity);
  }

  public async save(entity: T): Promise<void> {
    if (! entity.id) {
      entity.id = randomUUID();
    }
    this.entities.set(entity.id, entity.toPOJO())
  }

  public async update(entity: T): Promise<void> {
    if (! this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }
    this.entities.set(entity.id, entity.toPOJO())
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (! this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }
}
