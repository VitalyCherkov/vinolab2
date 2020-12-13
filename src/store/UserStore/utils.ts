import { EUser } from '@store/db';

export const getFormattedName = (user: EUser | null): string => {
  if (!user) {
    return '';
  }

  return `${user.firstName} ${user.secondName} ${user.lastName}`;
}
