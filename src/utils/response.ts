import { HasErrorType } from '@utils/error';

export type APIResp<T> = { error: HasErrorType } | { data: T };
