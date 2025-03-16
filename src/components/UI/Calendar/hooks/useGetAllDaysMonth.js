const useGetAllDaysMonth =(monthWaterData, monthNumber, year) => {
  const amountDays = new Date(year,monthNumber+1, 0).getDate();
  const allDaysOfMonth = Array.from({ length: amountDays }, (_, i) => i + 1);

  const allDaysWithPersents = allDaysOfMonth.map(day => {
    let dayFromDB = [];
    if (monthWaterData.length > 0) {
      dayFromDB = monthWaterData?.find(
        someDayFromDb => new Date(someDayFromDb.date).getDate() === day
      );
    }
    return dayFromDB
      ? { day, totalDayWater: dayFromDB.totalDayWater }
      : { day, totalDayWater: 0 };
  });
  return [allDaysWithPersents];
};

export default useGetAllDaysMonth;