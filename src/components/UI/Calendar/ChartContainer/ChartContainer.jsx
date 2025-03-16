import React from 'react';
import css from './ChartContainer.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartContainer = () => {
  const data = [
    { name: 1, pv: 2400 },
    { name: 2, pv: 2210 },
    { name: 3, pv: 2290 },
    { name: 4, pv: 2000 },
    { name: 5, pv: 2181 },
    { name: 6, pv: 2500 },
    { name: 7, pv: 2100 },
  ];

  return (
    <div className={css.container}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false}/>
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;



