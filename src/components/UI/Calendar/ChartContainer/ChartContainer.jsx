import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { selectMonthWaterData, selectWaterCurrentDate } from '../../../../redux/water/selectors';

const ChartContainer = () => {
  const currentDate = useSelector(selectWaterCurrentDate);
  const monthWaterData = useSelector(selectMonthWaterData);
  console.log('monthWaterData :>> ', monthWaterData);

  function getWeekDates(dateStr) {
    let date = new Date(dateStr);
    let dayOfWeek = date.getDay();

    let startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    let dates = [];
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      dates.push(currentDate.toISOString().split('T')[0]);
    }

    return dates;
  }

  const weekDates = getWeekDates(currentDate).map(date => {
    const findDayInfo = monthWaterData.find(monthData => {
      return monthData.date.split('T')[0] === date;
    });

    return { date: +date.split('-')[2], ml: findDayInfo ? findDayInfo.totalDayWater : 0 };
  });
  console.log('weekDates :>> ', weekDates);

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={weekDates}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="ml" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
