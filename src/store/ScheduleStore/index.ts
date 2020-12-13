import { jobStore } from '@store/JobStore';
import { userStore } from '@store/UserStore';
import { ScheduleStore } from './ScheduleStore';

export const scheduleStore = new ScheduleStore(userStore, jobStore);
export { ScheduleStore };
