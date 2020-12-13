import { jobStore } from '@store/JobStore';
import { userStore } from '@store/UserStore';
import { MoneyStore } from './MoneyStore';

export const moneyStore = new MoneyStore(userStore, jobStore);
export { MoneyStore };
