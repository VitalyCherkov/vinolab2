import { BaseTManager } from '@store/db/BaseTManager';
import { EScheduleKind, scheduleKindCollection } from './collection';

class TScheduleKind extends BaseTManager<EScheduleKind> {}

export const tScheduleKind: TScheduleKind = new TScheduleKind(scheduleKindCollection);
