import { useSelector } from "react-redux";
import moment from "moment";
// import { useEffect } from "react";
// import store from "@/toolkitRedux";
// import { reduserSlice } from "@/toolkitRedux/calendarReducer";
import styles from "./dayItem.module.css";

function DayItem({ dayItem }) {
  const { selectedDay } = useSelector((state) => state.calendar);
  const selectedDaySame = moment.unix(selectedDay).isSame(dayItem, "day");
  return (
    <div className={styles.dayItem__container}>
      <button
        type="button"
        className={
          selectedDaySame ? styles.calendar__cellCurrent : styles.calendar__cell
        }
      >
        <p
          className={
            selectedDaySame
              ? `${styles.date__p} ${styles.orange}`
              : styles.date__p
          }
        >
          {dayItem.format("D")}
        </p>
      </button>
    </div>
  );
}
export default DayItem;
