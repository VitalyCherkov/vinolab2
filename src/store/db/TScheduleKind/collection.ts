import { CollectionType, normalizeCollection } from '@store/types';

export enum ScheduleKindId {
  work = 'work',
  weekend = 'weekend',
  sickLeave = 'sickLeave',
  vacation = 'vacation',
  absence = 'absence',
  lateness = 'lateness',
}

export type EScheduleKind = {
  id: ScheduleKindId;
  color: string;
  title: string;
}

export const scheduleKindCollection: CollectionType<EScheduleKind> = normalizeCollection([
  {
    id: ScheduleKindId.work,
    color: '#a0d911',
    title: 'Работа по расписанию',
  },
  {
    id: ScheduleKindId.weekend,
    color: '#722ed1',
    title: 'Выходной день',
  },
  {
    id: ScheduleKindId.sickLeave,
    color: '#eb2f96',
    title: 'Больничный',
  },
  {
    id: ScheduleKindId.vacation,
    color: '#13c2c2',
    title: 'Отпуск',
  },{
    id: ScheduleKindId.absence,
    color: '#f5222d',
    title: 'Пропуск',
  },
  {
    id: ScheduleKindId.lateness,
    color: '#fadb14',
    title: 'Опоздание',
  },
]);
