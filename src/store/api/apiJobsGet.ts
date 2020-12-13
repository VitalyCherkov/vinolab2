import { APIResp } from '@utils/response';
import { EJob, tJob } from '@store/db/TJob';
import { withDelay } from '@utils/delay';
import { tokenStorage } from '@store/api/token';

export const apiJobsGet = async (): Promise<APIResp<EJob[]>> =>
  await withDelay(
    async () =>
      await tokenStorage.withToken(async (session) => ({
        data: tJob.getByUserId(session.userId)
      })
    )
  );
