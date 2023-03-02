import styles from './dayItem.module.css';
import moment from 'moment';
import { useState } from 'react';

const DayItem = ({ index, dayItem, today }) => {
  const currentDay = moment().isSame(dayItem, 'day');
  const [selectedDay, setSelectedDay] = useState(currentDay);
  console.log('currentDay', currentDay)
  
  const currentMonth = today.isSame(dayItem, 'month');
  function tab(e) {
    console.log(e.target);
  }
  return (
    <div className={selectedDay ? styles.calendar__cellCurrent : styles.calendar__cell} onClick={(e) => tab(e)}>
      <p className={selectedDay ? styles.date__p + " " + styles.orange : styles.date__p}>{dayItem.format('D')}</p>
    </div>
  );
};
export default DayItem;