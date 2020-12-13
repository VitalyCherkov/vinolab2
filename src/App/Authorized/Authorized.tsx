import React from 'react';
import { Button, Layout, Menu, Popover, Space, Tag, Typography } from 'antd';
import { Route, Switch, useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { getFormattedName, userStore } from '@store/UserStore';
import { CalendarOutlined, CreditCardOutlined, HomeOutlined,
  LogoutOutlined,
  UserOutlined } from '@ant-design/icons';
import { PageDashboard } from './PageDashboard';
import { PageMoney } from './PageMoney';
import { PageSchedule } from './PageSchedule';
import { JobDD } from './JobDD';
import { jobStore } from '@store/JobStore';

const layoutContentStyle: React.CSSProperties = {
  padding: 20,
  boxSizing: 'border-box',
};

const jobNotSelectedStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

export const Authorized: React.FC = observer(() => {
  const history = useHistory();
  const [popoverOpened, setPopoverOpened] = React.useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <Layout.Header />
        <Menu theme="dark" onSelect={({ key }) => {
          history.push(String(key));
        }}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Десяточка
          </Menu.Item>
          <Menu.Item key="/money/" icon={<CreditCardOutlined />}>
            Деньги
          </Menu.Item>
          <Menu.Item key="/schedule/" icon={<CalendarOutlined />}>
            Расписание
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Popover
            content={(
              <Button onClick={() => userStore.logout()} icon={<LogoutOutlined />}>
                Выйти
              </Button>
            )}
            title={getFormattedName(userStore.user)}
            trigger="click"
            visible={popoverOpened}
            onVisibleChange={setPopoverOpened}
          >
            <Tag icon={<UserOutlined />}>
              {getFormattedName(userStore.user)}
            </Tag>
          </Popover>
          <JobDD />
        </Layout.Header>
        <Layout.Content style={layoutContentStyle}>
          {jobStore.activeJob ? (
            <Switch>
              <Route path="/" exact component={PageDashboard}/>
              <Route path="/money/" component={PageMoney}/>
              <Route path="/schedule/" component={PageSchedule}/>
            </Switch>
          ) : (
            <div style={jobNotSelectedStyle}>
              <Space direction="vertical" align="center">
                <Typography.Title>
                  Выберите табельный номер
                </Typography.Title>
                <JobDD />
              </Space>
            </div>
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
});
