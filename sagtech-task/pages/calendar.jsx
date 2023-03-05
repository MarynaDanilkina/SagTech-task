import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { reduserSlice } from "@/toolkitRedux/calendarReducer";
import DayItem from "@/components/dayItem";
import styles from "../styles/calendar.module.css";
import { db } from "@/config/firebase";
import store from "@/toolkitRedux";
import TaskList from "@/components/TaskList";

function Calendar() {
  const router = useRouter();
  const { dispatch } = store;
  const { setTask } = reduserSlice.actions;
  const auth = getAuth();
  const user = auth.currentUser;
  const [calendar, setCalendar] = useState([]);
  moment.updateLocale("en", { week: { dow: 1 } });

  const today = moment();
  const startDay = today.clone();
  const endMonth = today.clone().endOf("month");
  const numberDaysMonthNow = endMonth.diff(startDay, "days");
  const dayPrev = startDay.clone().subtract(1, "day");
  const array = [...Array(numberDaysMonthNow + 1)].map(() =>
    dayPrev.add(1, "day").clone()
  );
  useEffect(() => {
    setCalendar(array);
  }, []);
  function endSlide() {
    if (calendar.length !== 0) {
      const startNewMonth = calendar.pop().clone().add(1, "day");
      const endNewMonth = startNewMonth.clone().add(1, "month");
      const numberDaysMonth = endNewMonth.diff(startNewMonth, "days");
      const dayPrevNew = startNewMonth.clone().subtract(2, "day");
      const newArrayMonth = [...Array(numberDaysMonth + 1)].map(() =>
        dayPrevNew.add(1, "day").clone()
      );
      const newCalendar = calendar.concat(newArrayMonth);
      setCalendar(newCalendar);
    }
  }
  const getAllTasks = async () => {
    try {
      const collectionRef = collection(db, "task");
      const qry = query(collectionRef, where("userID", "==", user.uid));
      await onSnapshot(qry, (querySnapshot) => {
        dispatch(
          setTask(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (user) {
      getAllTasks();
    }
  }, [user]);
  return (
    <div className={styles.calendar__container}>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        freeMode
        modules={[FreeMode]}
        className="mySwiper"
        onReachEnd={() => endSlide()}
      >
        {calendar.map((dayItem) => (
          <SwiperSlide key={dayItem}>
            <DayItem dayItem={dayItem} key={dayItem.format("DDMMYYYY")} />
          </SwiperSlide>
        ))}
      </Swiper>
      <TaskList />
    </div>
  );
}

export default Calendar;
