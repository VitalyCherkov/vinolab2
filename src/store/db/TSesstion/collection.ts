import { BaseCollectionItem, CollectionType, Id } from '@store/types';

export type ESession = BaseCollectionItem & {
  userId: Id;
};

export const sessionCollection: CollectionType<ESession> = {
  ids: [],
  entities: {},
};
