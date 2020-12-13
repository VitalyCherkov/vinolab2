import { APIResp } from '@utils/response';
import { withDelay } from '@utils/delay';
import { tokenStorage } from '@store/api/token';
import { CollectionType } from '@store/types';
import { EScheduleKind, tScheduleKind } from '@store/db/TScheduleKind';

export const apiScheduleKindListGet = async (): Promise<APIResp<CollectionType<EScheduleKind>>> =>
  await withDelay(
    async () =>
      await tokenStorage.withToken(async () => ({
          data: tScheduleKind.collection
        })
      )
  );
