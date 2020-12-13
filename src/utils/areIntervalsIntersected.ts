import { DateInterval } from '@store/types';
import dayjs from 'dayjs';

export const areIntervalsIntersected = (lI: DateInterval, rI: DateInterval): boolean =>
  dayjs(lI.from).isBetween(rI.from, rI.to, 'day') ||
  dayjs(lI.to).isBetween(rI.from, rI.to, 'day');
