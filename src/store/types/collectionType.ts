export type Id = string;

export type BaseCollectionItem = {
  id: Id;
};

export type CollectionType<T extends BaseCollectionItem> = {
  ids: Id[];
  entities: Record<Id, T>
};

export const normalizeCollection = <T extends BaseCollectionItem>(list: T[]): CollectionType<T> => ({
  ids: list.map(e => e.id),
  entities: list.reduce((acc, e) => ({
    ...acc,
    [e.id]: e,
  }), {}),
});
