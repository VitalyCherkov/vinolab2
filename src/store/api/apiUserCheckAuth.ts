import { APIResp } from '@utils/response';
import { ESession, EUser, tUser } from '@store/db';
import { tokenStorage } from '@store/api/token';
import { withDelay } from '@utils/delay';

const MSG_INVALID_SESSION = 'Сессия не валидна';

export const apiUserCheckAuth = async (): Promise<APIResp<EUser>> =>
  await withDelay(
    async () => await tokenStorage.withToken(
      async (session: ESession): Promise<APIResp<EUser>> => {
        const user = tUser.read(session.userId);
        if (user) {
          return {
            data: user,
          };
        }

        return {
          error: {
            hasError: true,
            message: [MSG_INVALID_SESSION],
          },
        };
      }
    )
  );
