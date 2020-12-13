import { observer } from 'mobx-react-lite';
import React from 'react';
import { LoginPage } from './LoginPage';
import { userStore } from '@store/UserStore';
import { Authorized } from './Authorized';

export const App: React.FC = observer(() => {
  return (
    !userStore.authorized ? <LoginPage /> : <Authorized />
  );
});
