import { APIResp } from '@utils/response';
import { ESession, tSession } from '@store/db';

const MSG_NOT_AUTHORIZED = 'Пользователь не авторизован';

class TokenStorage {
  _token: string | null = null;

  saveToken(token: string): void {
    this._token = token;
  }

  removeToken(): void {
    this._token = null;
  }

  withToken = async <T>(func: (session: ESession) => Promise<APIResp<T>>): Promise<APIResp<T>> => {
    const session = this._token && tSession.read(this._token);

    if (!session) {
      return {
        error: {
          hasError: true,
          message: [MSG_NOT_AUTHORIZED],
        },
      };
    }

    return await func(session);
  };
}

export const tokenStorage = new TokenStorage();
