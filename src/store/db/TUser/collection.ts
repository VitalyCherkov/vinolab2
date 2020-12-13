import {
  BaseCollectionItem,
  CollectionType,
  normalizeCollection
} from '@store/types';

export type EUser = BaseCollectionItem & {
  firstName: string;
  secondName: string;
  lastName: string;

  login: string;
  password: string;
}

export const userCollection: CollectionType<EUser> = normalizeCollection([
  {
    id: '1',
    firstName: 'Виталий',
    secondName: 'Викторович',
    lastName: 'Черков',
    login: 'Vitaly.Cherkov',
    password: '1111',
  },
  {
    id: '2',
    firstName: 'Сергей',
    secondName: 'Викторович',
    lastName: 'Чернобровкин',
    login: 'Sergey.Chernobrovkin',
    password: '2222',
  },
  {
    id: '3',
    firstName: 'Ксения',
    secondName: 'Юрьевна',
    lastName: 'Казанцева',
    login: 'Ksenia.Kazantseva',
    password: '3333',
  },
]);
