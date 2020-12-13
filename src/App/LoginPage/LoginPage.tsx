import React, { CSSProperties } from 'react';
import { Button, Input, Layout, Space, Typography } from 'antd';
import { userStore } from '@store/UserStore';
import { observer } from 'mobx-react-lite';

const layoutStyle: CSSProperties = {
  minHeight: '100vh',
};

const layoutContentStyle: CSSProperties = {
  padding: 20,
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const LoginPage: React.FC = observer(() => {
  const [loading, setLoading] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClick = async () => {
    setLoading(true);

    await userStore.login(login, password);

    setLoading(false);
  };

  return (
    <Layout style={layoutStyle}>
      <Layout.Content style={layoutContentStyle}>
        <Space direction="vertical">
          <Typography.Title>Личный кабинет сотрудника Десяточки</Typography.Title>
          <Input
            placeholder="Логин"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <Input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {userStore.loginError.hasError && userStore.loginError.message.map(
            m => <Typography.Text type="danger" key={m}>{m}</Typography.Text>
          )}
          <Button loading={loading} onClick={handleClick}>Войти</Button>
        </Space>
      </Layout.Content>
    </Layout>
  );
});
