import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./dayItem.module.css";
import store from "@/toolkitRedux";
import { reduserSlice } from "@/toolkitRedux/calendarReducer";

function DayItem({ dayItem }) {
  const [done, setDone] = useState(false);
  const [notDone, setNotDone] = useState(false);
  const [result, setResult] = useState([]);
  const { selectedDay, tasks } = useSelector((state) => state.calendar);
  const { dispatch } = store;
  const { getSelectedDay } = reduserSlice.actions;
  const selectedDaySame = moment.unix(selectedDay).isSame(dayItem, "day");
  const start = dayItem.clone().startOf("day").format("X");
  const end = dayItem.clone().endOf("day").format("X");
  useEffect(() => {
    setDone(false);
    setNotDone(false);
    const newResult = tasks.filter(
      (event) => event.data.date >= start && event.data.date <= end
    );
    setResult(newResult);
  }, [tasks]);

  useEffect(() => {
    if (result !== 0) {
      result.forEach((element) => {
        if (element.data.done === true) {
          setDone(true);
        }
        if (element.data.done === false) {
          setNotDone(true);
        }
      });
    }
  }, [result]);

  return (
    <div className={styles.dayItem__container}>
      <button
        type="button"
        onClick={() => dispatch(getSelectedDay(dayItem.format("X")))}
        className={
          selectedDaySame ? styles.calendar__cellCurrent : styles.calendar__cell
        }
      >
        <p
          className={
            selectedDaySame
              ? `${styles.date__pWeek} ${styles.orange}`
              : styles.date__pWeek
          }
        >
          {dayItem.format("ddd")}
        </p>
        <p
          className={
            selectedDaySame
              ? `${styles.date__p} ${styles.orange}`
              : styles.date__p
          }
        >
          {dayItem.format("D")}.{dayItem.format("MM")}
        </p>
      </button>
      <div className={styles.status__container}>
        {notDone && <div className={styles.status__notDone}> </div>}
        {done && <div className={styles.status__done}> </div>}
      </div>
    </div>
  );
}
export default DayItem;
