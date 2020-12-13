import {
  BaseCollectionItem,
  CollectionType,
  Id,
  normalizeCollection
} from '@store/types';

export type EJob = BaseCollectionItem & {
  userId: Id;
  positionName: string;
}

export const jobCollection: CollectionType<EJob> = normalizeCollection([
  {
    id: 'job-1',
    userId: '1',
    positionName: 'Должность 1',
  },
  {
    id: 'job-2',
    userId: '1',
    positionName: 'Должность 2',
  },
  {
    id: 'job-3',
    userId: '2',
    positionName: 'Должность 3',
  },
  {
    id: 'job-4',
    userId: '2',
    positionName: 'Должность 4',
  },
  {
    id: 'job-5',
    userId: '3',
    positionName: 'Должность 5',
  },
  {
    id: 'job-6',
    userId: '3',
    positionName: 'Должность 6',
  },
]);
