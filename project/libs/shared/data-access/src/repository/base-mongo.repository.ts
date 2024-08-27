import { StorableEntity, Entity, EntityFactory } from '@project/shared-core';
import { Repository } from './repository.interface';
import { NotFoundException } from '@nestjs/common'
import { Document, Model } from 'mongoose';

export abstract class BaseMongoRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document) {
      return null;
    }
    const plainObject = document.toObject({getters: true, versionKey: false, flattenObjectIds: true}) as ReturnType<T['toPOJO']>;

    return this.entityFactory.create(plainObject);
  }

  public async findById(id: T['id']): Promise<T | null> {
    const foundEntity = await this.model.findById(id).exec();

    if (! foundEntity) {
      return null;
    }

    return this.createEntityFromDocument(foundEntity);
  }

  public async save(entity: T): Promise<void> {
    const newEntity = new this.model(entity.toPOJO());
    entity.id = newEntity._id.toString();
    await newEntity.save();

  }

  public async update(entity: T): Promise<void> {
    const updatedDocument = await this.model.findByIdAndUpdate(entity.id, entity.toPOJO(), {new: true, runValidators: true});
    if (! updatedDocument) {
      throw new NotFoundException(`entity with id ${entity.id} not found`);
    }
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id);

    if (! deletedDocument) {
      throw new NotFoundException(`entity with id ${id} not found`);
    }
  }
}
