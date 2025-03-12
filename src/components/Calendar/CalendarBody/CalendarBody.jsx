import { useEffect, useState } from 'react';
import CalendarButton from '../CalendarButton/CalendarButton';
import css from "./CalendarBody.module.css"
import { useSelector } from 'react-redux';
import { selectWaterNorm } from '../../../redux/user/selectors';
import { selectToken } from '../../../redux/auth/selectors';

const CalendarBody = ({ monthNumber, year }) => {
  const [foundWaterDayData1, setfoundWaterDayData] = useState([]);

  const date = new Date(year, monthNumber, 1, 0, 0, 0, 0);
  const dailyNorm = useSelector(selectWaterNorm);

  const token = useSelector(selectToken);


  const fetchMonthData = () => { fetch(`https://aquatrack-backend-1b8z.onrender.com/water/day?date=2024-03-03T00:00:00.000Z`,{headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  },}).then(res=>res.json().then(res=>setfoundWaterDayData(res))).catch(()=>{throw "Uncorrect response"})
  };
  console.log('object :>> ', foundWaterDayData1);
  console.log('token :>> ', token);

  useEffect(()=>{
    if(monthNumber&&year){fetchMonthData()}
  },[monthNumber, year])

  const getAllDaysMonth = (foundWaterDayData, monthNumber, year) => {
    const amountDays = new Date(year, monthNumber, 0).getDate();

    const allDaysOfMonth = Array.from({ length: amountDays }, (_, i) => i + 1);
    const allDaysWithPersents = allDaysOfMonth.map(day => {
      // if (foundWaterDayData.length>0){} щоб не падала при 0 масиві.
      const dayFromDB = foundWaterDayData?.find(someDayFromDb => new Date(someDayFromDb.date).getDate() === day);
      return dayFromDB ? { day, amount: dayFromDB.amount } : { day, amount: 0 };
    });
    return allDaysWithPersents;
  };

  const foundWaterDayData = [
    {
      _id: 'mock123',
      date: "2024-03-07T10:00:00.000Z",
      amount: 500,
    },
    {
      _id: 'mock124',
      date: "2024-03-06T10:00:00.000Z",
      amount: 300,
    },
  ];

  const days = getAllDaysMonth(foundWaterDayData, monthNumber + 1, year);
  console.log('days :>> ', days);

  return (
    <div className={css.calendarWrapper}>
      {days.map(day => (
        <CalendarButton key={day.day} day={day.day} amount={day.amount} />
      ))}
    </div>
  );
};

export default CalendarBody;
