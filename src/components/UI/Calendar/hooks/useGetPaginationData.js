import { useCallback, useMemo, useState } from 'react';
import constants from '../../../../constants/constants';
import { useTranslation } from 'react-i18next';

const LAST_MONTH_NUMBER = constants.LAST_MONTH_NUMBER;
const FIRST_MONTH_NUMBER = constants.FIRST_MONTH_NUMBER;

const useGetPaginationData = () => {
  const { t } = useTranslation();
  const currentDate = new Date();

  const [monthNumber, setMonthNumber] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const monthForwards = useCallback(() => {
    if (monthNumber === LAST_MONTH_NUMBER) {
      setMonthNumber(FIRST_MONTH_NUMBER);
      setYear(prev => prev + 1);
    } else setMonthNumber(prev => prev + 1);
  }, [monthNumber]);

  const monthPrevious = useCallback(() => {
    if (monthNumber === FIRST_MONTH_NUMBER) {
      setMonthNumber(LAST_MONTH_NUMBER);
      setYear(prev => prev - 1);
    } else setMonthNumber(prev => prev - 1);
  }, [monthNumber]);

  const monthsName = useMemo(() => {
    const months = [
      t('months.January'),
      t('months.February'),
      t('months.March'),
      t('months.April'),
      t('months.May'),
      t('months.June'),
      t('months.July'),
      t('months.August'),
      t('months.September'),
      t('months.October'),
      t('months.November'),
      t('months.December'),
    ];

    return months[monthNumber];
  }, [monthNumber, t]);

  return [monthNumber, year, monthForwards, monthPrevious, monthsName];
};

export default useGetPaginationData;
