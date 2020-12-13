import { APIResp } from '@utils/response';
import { EUser, tSession, tUser } from '@store/db';
import { delay } from '@utils/delay';
import generateId from '@utils/generateId';
import { tokenStorage } from '@store/api/token';

const MSG_INVALID_CREDENTIALS = 'Неправильный логин или пароль';

export const apiUserLogin = async (login: string, password: string): Promise<APIResp<EUser>> => {
  await delay();

  const user = tUser.getByCredentials(login, password);
  if (!user) {
    return {
      error: {
        hasError: true,
        message: [MSG_INVALID_CREDENTIALS],
      },
    };
  }

  const sessionId = generateId();
  tSession.createOrUpdate({
    id: sessionId,
    userId: user.id,
  });
  tokenStorage.saveToken(sessionId);

  return {
    data: user,
  };
}
