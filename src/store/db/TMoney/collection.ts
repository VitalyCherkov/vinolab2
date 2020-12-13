import {
  BaseCollectionItem,
  CollectionType,
  Id,
  normalizeCollection
} from '@store/types';
import { jobCollection } from '@store/db/TJob';
import { range } from '@utils/range';

export enum MoneyKind {
  payout = 'payout',
  retention = 'retention',
}

export type EMoney = BaseCollectionItem & {
  jobId: Id;
  amount: number;
  date: Date;
  kind: MoneyKind;
  title: string;
}

const now = new Date();

export const moneyCollection: CollectionType<EMoney> = normalizeCollection([
  ...jobCollection.ids.map(jobId => {
    return range(12).map((i): EMoney[] => [
      {
        id: `${jobId}-${i}-payout`,
        jobId,
        amount: Math.floor(Math.random() * 100000),
        date: new Date(now.getFullYear(), i, 10),
        kind: MoneyKind.payout,
        title: 'Зарплата',
      },
      {
        id: `${jobId}-${i}-retention`,
        jobId,
        amount: -Math.floor(Math.random() * 10000),
        date: new Date(now.getFullYear(), i, 16),
        kind: MoneyKind.retention,
        title: 'Штраф'
      }
    ]).flat()
  }).flat(),
]);
