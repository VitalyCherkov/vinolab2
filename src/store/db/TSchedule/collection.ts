import {
  BaseCollectionItem,
  CollectionType, DateInterval,
  Id,
  normalizeCollection
} from '@store/types';
import { range } from '@utils/range';
import { jobCollection } from '@store/db/TJob';
import { ScheduleKindId, scheduleKindCollection } from '@store/db/TScheduleKind';

export type ESchedule = BaseCollectionItem & {
  jobId: Id;
  interval: DateInterval;
  kindId: ScheduleKindId;
}

const thisYear = new Date().getFullYear();

const eventDays: Record<ScheduleKindId, [number, number]> = {
  work: [2, 2],
  weekend: [3, 3],
  sickLeave: [4, 7],
  vacation: [8, 10],
  absence: [11, 11],
  lateness: [12, 12]
};

export const scheduleCollection: CollectionType<ESchedule> = normalizeCollection([
  ...jobCollection.ids.map(jobId =>
    range(12).map((month): ESchedule[] =>
      scheduleKindCollection.ids.map((kindId) => ({
        id: `${jobId}-${month}-${kindId}`,
        jobId,
        kindId: kindId as ScheduleKindId,
        interval: {
          from: new Date(thisYear, month, eventDays[kindId as ScheduleKindId][0]),
          to: new Date(thisYear, month, eventDays[kindId as ScheduleKindId][1]),
        },
      }))
    ).flat()
  ).flat()
]);
