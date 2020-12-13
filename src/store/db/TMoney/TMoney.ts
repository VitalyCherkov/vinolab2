import { BaseTManager } from '@store/db/BaseTManager';
import { DateInterval, Id } from '@store/types';
import { EMoney, moneyCollection } from './collection';
import dayjs from 'dayjs';

class TMoney extends BaseTManager<EMoney> {
  getByJobId(jobId: Id): EMoney[] {
    return this.list.filter(e => e.jobId === jobId);
  }

  getByDateInterval(jobId: Id, dateInterval: DateInterval): EMoney[] {
    return this.getByJobId(jobId).filter(e =>
      dayjs(e.date).isBetween(dateInterval.from, dateInterval.to, 'day')
    );
  }
}

export const tMoney: TMoney = new TMoney(moneyCollection);
