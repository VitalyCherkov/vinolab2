import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Badge, Card, Divider, PageHeader, Skeleton, Space } from 'antd';
import { scheduleStore } from '@store/ScheduleStore';
import { Calendar } from '@components/Calendar';
import { Dayjs } from 'dayjs';

export const PageSchedule = observer(() => {
  React.useEffect(() => {
    scheduleStore.loadScheduleKind();
  }, []);

  return <>
    <PageHeader title="Расписание" />
      <Card>
        <Calendar
          value={scheduleStore.selectedDate}
          onSelect={(value) => scheduleStore.setSelectedDate(value)}
          dateCellRender={(day: Dayjs) => (
            <Space direction="vertical">
              {scheduleStore.getScheduleByDay(day).map(item => {
                const scheduleKind = scheduleStore.getScheduleKindById(item.kindId);
                if (!scheduleKind) {
                  return null;
                }

                return (
                  <Badge key={item.id} color={scheduleKind.color} text={scheduleKind.title} />
                );
              })}
            </Space>
          )}
        />
      </Card>
      <>
        <Divider orientation="left">
          Типы событий
        </Divider>
        <Card>
          <Skeleton loading={scheduleStore.isLoading}>
            <Space direction="vertical">
              {scheduleStore.scheduleKindList.map(item => (
                <Badge key={item.id} color={item.color} text={item.title} />
              ))}
            </Space>
          </Skeleton>
        </Card>
      </>
  </>;
});
