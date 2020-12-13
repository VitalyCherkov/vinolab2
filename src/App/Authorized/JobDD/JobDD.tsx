import { Button, Dropdown, Menu } from 'antd';
import * as React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { jobStore } from '@store/JobStore';
import { isMeta } from '@utils/meta';

export const JobDD: React.FC = observer(() => {
  React.useEffect(() => {
    jobStore.loadJobs();
  }, []);

  const menu = (
    <Menu>
      {jobStore.jobs.map(j => (
        <Menu.Item key={j.id} onClick={() => jobStore.setActiveJob(j)} icon={<UserOutlined />}>
          {j.positionName}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button loading={isMeta.loading(jobStore.meta)}>
        {jobStore.activeJob?.positionName || 'Табельный номер не выбран'} <DownOutlined />
      </Button>
    </Dropdown>
  );
});
