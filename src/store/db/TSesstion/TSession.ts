import { BaseTManager } from '@store/db/BaseTManager';
import { ESession, sessionCollection } from './collection';

class TSession extends BaseTManager<ESession> {}

export const tSession: TSession = new TSession(sessionCollection);
