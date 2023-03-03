import moment from "moment";
import { useSelector } from "react-redux";
import styles from "./dayItem.module.css";

function DayItem({ dayItem }) {
  const { tasks } = useSelector((state) => state.calendar);
  const selectedDay = moment().isSame(dayItem, "day");
  const start = dayItem.format("X");
  const end = dayItem.clone().endOf("day").format("X");
  const dayTasks = tasks.filter(
    (task) => task.data.date >= start && task.data.date <= end
  );
  return (
    <div className={styles.dayItem__container}>
      <button
        type="button"
        className={
          selectedDay ? styles.calendar__cellCurrent : styles.calendar__cell
        }
      >
        <p
          className={
            selectedDay ? `${styles.date__p} ${styles.orange}` : styles.date__p
          }
        >
          {dayItem.format("D")}
        </p>
        {dayTasks.map(() => (
          <p>задача</p>
        ))}
      </button>
    </div>
  );
}
export default DayItem;
