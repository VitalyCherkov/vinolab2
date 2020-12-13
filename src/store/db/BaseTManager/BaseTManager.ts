import { BaseCollectionItem, CollectionType, Id } from '@store/types';

export class BaseTManager<T extends BaseCollectionItem> {
  protected readonly _collection: CollectionType<T>;

  constructor(collection: CollectionType<T>) {
    this._collection = collection;
  }

  protected get list(): T[] {
    return this._collection.ids.map(id => this._collection.entities[id]);
  }

  get collection(): CollectionType<T> {
    return this._collection;
  }

  createOrUpdate(e: T): void {
    if (e.id in this._collection.entities) {
      this._collection.entities[e.id] = e;
      return;
    }

    this._collection.entities[e.id] = e;
    this._collection.ids.push(e.id);
  }

  read(id: Id): T | null {
    return this._collection.entities[id] || null;
  }

  delete(idToDelete: Id): void {
    this._collection.ids = this._collection.ids.filter(id => id !== idToDelete);
    delete this._collection.entities[idToDelete];
  }
}
