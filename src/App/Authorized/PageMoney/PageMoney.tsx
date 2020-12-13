import { Avatar,
  Card,
  Divider, List, PageHeader, Skeleton, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { moneyStore } from '@store/MoneyStore';
import { DatePicker } from '@components/DatePicker';
import { isMeta } from '@utils/meta';
import { EMoney, MoneyKind } from '@store/db/TMoney';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { colors } from '@utils/constants';
import { formatDateDDMMYYYY } from '@utils/formatDateDDMMYYYY';
import { formatMoney } from '@utils/formatMoney';
import dayjs, { Dayjs } from 'dayjs';

const loadingMockMoney: EMoney[] =  [
  { id: '1', title: '--', kind: MoneyKind.payout, date: new Date(), jobId: '-', amount: 0 },
  { id: '2', title: '--', kind: MoneyKind.payout, date: new Date(), jobId: '-', amount: 0 },
  { id: '3', title: '--', kind: MoneyKind.payout, date: new Date(), jobId: '-', amount: 0 },
];

const listStyle: React.CSSProperties = {
  width: '100%',
};

export const PageMoney = observer(() => {
  React.useEffect(() => {
    moneyStore.forceLoadData();
  }, []);

  const handleIntervalChange = (dates: null | [Dayjs | null, Dayjs | null]) => {
    if (!dates) {
      moneyStore.setSelectedInterval(null);
      return;
    }

    moneyStore.setSelectedInterval({ from: dates[0]?.toDate?.() || null, to: dates[1]?.toDate?.() || null });
  };

  const isLoading = isMeta.loading(moneyStore.meta);

  return (
    <Space direction="vertical" style={listStyle}>
      <PageHeader title="Деньги" />
      <DatePicker.RangePicker
        value={
          moneyStore.selectedInterval && moneyStore.selectedInterval.from && moneyStore.selectedInterval.to
            ? [dayjs(moneyStore.selectedInterval.from), dayjs(moneyStore.selectedInterval.to)]
            : null}
        onChange={handleIntervalChange}
      />

      <List
        style={listStyle}
        itemLayout="vertical"
        size="large"
        dataSource={isLoading ? loadingMockMoney : moneyStore.money}
        renderItem={item => (
          <List.Item key={item.id}>
            <Skeleton loading={isLoading} active avatar>
              <List.Item.Meta
                avatar={(
                  <Avatar
                    icon={item.kind === MoneyKind.payout ? <PlusOutlined /> : <MinusOutlined />}
                    style={{
                      backgroundColor: item.kind === MoneyKind.payout ? colors.cyan : colors.red,
                    }}
                  />
                )}
                title={formatMoney(item.amount)}
                description={`${item.title} / ${formatDateDDMMYYYY(item.date)}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {moneyStore.selectedInterval && moneyStore.selectedInterval.from && moneyStore.selectedInterval.to && (
        <>
          <Divider orientation="left">
            Статистика с {formatDateDDMMYYYY(moneyStore.selectedInterval.from)} по {formatDateDDMMYYYY(moneyStore.selectedInterval.to)}
          </Divider>
          <Card>
            <Skeleton loading={isLoading} avatar={true}>
              <Card.Meta
                avatar={(
                    <Avatar
                      icon={moneyStore.moneyStats >= 0 ? <PlusOutlined /> : <MinusOutlined />}
                      style={{
                        backgroundColor: moneyStore.moneyStats >= 0 ? colors.cyan : colors.red,
                      }}
                    />
                )}
                title={formatMoney(moneyStore.moneyStats)}
                description={<>
                  Всего за {dayjs(moneyStore.selectedInterval.to).diff(moneyStore.selectedInterval.from, 'day')} дней
                </>}
              />
            </Skeleton>
          </Card>
        </>
      )}
    </Space>
  );
});
