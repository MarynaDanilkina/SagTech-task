import { useSelector } from "react-redux";
import moment from "moment";
// import { useEffect } from "react";
// import store from "@/toolkitRedux";
// import { reduserSlice } from "@/toolkitRedux/calendarReducer";
import styles from "./dayItem.module.css";
import store from "@/toolkitRedux";
import { reduserSlice } from "@/toolkitRedux/calendarReducer";

function DayItem({ dayItem }) {
  const { selectedDay, tasks } = useSelector((state) => state.calendar);
  const { dispatch } = store;
  const { getSelectedDay } = reduserSlice.actions;
  const selectedDaySame = moment.unix(selectedDay).isSame(dayItem, "day");
  return (
    <div className={styles.dayItem__container}>
      <button
        type="button"
        onClick={() =>
          dispatch(getSelectedDay({ today: dayItem.format("X"), tasks }))
        }
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
