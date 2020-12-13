import { APIResp } from '@utils/response';
import { withDelay } from '@utils/delay';
import { tokenStorage } from '@store/api/token';
import { DateInterval, Id } from '@store/types';
import { ESchedule, tSchedule } from '@store/db/TSchedule';

export const apiScheduleGet = async (jobId: Id, dateInterval: DateInterval): Promise<APIResp<ESchedule[]>> =>
  await withDelay(
    async () =>
      await tokenStorage.withToken(async () => ({
          data: tSchedule.getByDateInterval(jobId, dateInterval)
        })
      )
  );
