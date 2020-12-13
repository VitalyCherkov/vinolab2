import { userStore } from '@store/UserStore';
import { JobStore } from './JobStore';

export const jobStore = new JobStore(userStore);
export { JobStore };
