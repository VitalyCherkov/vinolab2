import dayjs from 'dayjs';

export const formatDateDDMMYYYY = (date: Date) => dayjs(date).format('DD.MM.YYYY');
