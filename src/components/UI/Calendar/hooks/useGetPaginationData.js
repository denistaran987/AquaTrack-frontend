import { useCallback, useMemo, useState } from 'react';
import constans from '../../../../constans/constans';
// import i18next from 'i18next';

const LAST_MONTH_NUMBER = constans.LAST_MONTH_NUMBER;
const FIRST_MONTH_NUMBER = constans.FIRST_MONTH_NUMBER;

const useGetPaginationData = () => {
  const currentDate = new Date();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [monthNumber, setMonthNumber] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const monthForvards = useCallback(() => {
    if (monthNumber === LAST_MONTH_NUMBER) {
      setMonthNumber(FIRST_MONTH_NUMBER);
      setYear(prev => prev + 1);
    } else setMonthNumber(prev => prev + 1);
  }, [monthNumber]);

  const monthPrevios = useCallback(() => {
    if (monthNumber === FIRST_MONTH_NUMBER) {
      setMonthNumber(LAST_MONTH_NUMBER);
      setYear(prev => prev - 1);
    } else setMonthNumber(prev => prev - 1);
  }, [monthNumber]);

  const monthsName = useMemo(() => months[monthNumber], [monthNumber, months]);

  return [monthNumber, year, monthForvards, monthPrevios, monthsName];
};

export default useGetPaginationData;
