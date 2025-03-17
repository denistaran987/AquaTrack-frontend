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
import CustomTooltip from '../CastomTooltip/ CustomTooltip.jsx';

const ChartContainer = () => {
  const currentDate = useSelector(selectWaterCurrentDate);
  const monthWaterData = useSelector(selectMonthWaterData);

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

    return {
      date: +date.split('-')[2],
      ml: findDayInfo ? findDayInfo.totalDayWater : 0,
    };
  });

  const renderDot = props => {
    const { cx, cy, key } = props;
    return (
      <g key={key}>
        <circle cx={cx} cy={cy} r={6} fill="#FFFFFF" stroke="#4CAF50" strokeWidth={2} />
      </g>
    );
  };

  let chartHeight;
  let padding;
  let margin = 0;

  const width = window.innerWidth;

  if (width >= 1440) {
    chartHeight = 251;
    padding = 25;
    margin = 49;
  } else if (width >= 768) {
    chartHeight = 251;
    padding = 45;
  } else {
    chartHeight = 268;
    padding = 20;
  }

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer
        width="100%"
        height={chartHeight}
        style={{ marginTop: margin, paddingTop: 5 }}
      >
        <AreaChart
          data={weekDates}
          syncId="anyId"
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} padding={{ left: padding }} />
          <YAxis
            tick={{ stroke: 'black', strokeWidth: 0.2 }}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 10 }}
          />
          <Tooltip cursor={false} content={<CustomTooltip />}/>
          <Area
            type="monotone"
            dataKey="ml"
            stroke="#4CAF50"
            fill="url(#colorUv)"
            dot={renderDot}
            activeDot={{ r: 8 }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={1} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
