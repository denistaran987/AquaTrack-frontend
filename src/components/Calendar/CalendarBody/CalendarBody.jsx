import CalendarButton from '../CalendarButton/CalendarButton';

const CalendarBody = ({ monthNumber, year }) => {
  const getAllDaysMonth = (foundWaterDayData, monthNumber, year) => {
    const amountDays = new Date(year, monthNumber, 0).getDate();

console.log('foundWaterDayData :>> ', new Date(foundWaterDayData[0].date).getDate());

    console.log('monthNumber :>> ', monthNumber);

    const allDaysOfMonth = Array.from({ length: amountDays }, (_, i) => i + 1);
    const allDaysWithPersents = allDaysOfMonth.map(day=>{

      // if (day === new Date(foundWaterDayData[0].date).getDate())
    })
    return allDaysOfMonth; 
  };

  const foundWaterDayData = [
    {
      _id: 'mock123',
      date: new Date().toISOString(),
      amount: 500,
    },
    {
      _id: 'mock124',
      date: new Date().toISOString(),
      amount: 300,
    },
  ];

  const days = getAllDaysMonth(foundWaterDayData, monthNumber+1, year);

  console.log('days :>> ', days);



  return (
    <div>
      {days.map(day => (
        <CalendarButton key={day} day={day} />
      ))}
    </div>
  );
};

export default CalendarBody;
