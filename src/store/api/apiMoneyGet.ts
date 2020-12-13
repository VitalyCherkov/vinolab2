import { APIResp } from '@utils/response';
import { withDelay } from '@utils/delay';
import { tokenStorage } from '@store/api/token';
import { DateInterval, Id } from '@store/types';
import { EMoney, tMoney } from '@store/db/TMoney';

export const apiMoneyGet = async (jobId: Id, dateInterval: DateInterval): Promise<APIResp<EMoney[]>> =>
  await withDelay(
    async () =>
      await tokenStorage.withToken(async () => ({
          data: tMoney.getByDateInterval(jobId, dateInterval)
        })
      )
  );
