import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../styles/calendar.module.css";
import store from "@/toolkitRedux";
import { useSelector } from 'react-redux';
import { auth } from "../firebase";
import { reduserSlice } from "@/toolkitRedux/toolkitReducer";


function Calendar() {

  const { error, user } = useSelector((state) => state.user);
  const dispatch = store.dispatch;
  const { setUser} = reduserSlice.actions;
  return (
    <div className={styles.calendar__container}>
      <p>салеедарь</p>
    </div>
  );
}

export default Calendar;