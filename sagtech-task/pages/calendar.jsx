import {useState } from "react";
import styles from "../styles/calendar.module.css";
import moment from 'moment';
import DayItem from "@/components/dayItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper";
import { FreeMode } from "swiper";
import "swiper/css/free-mode";


function Calendar() {
  const [today, setToday] = useState(moment());

  const endMonth = today.clone().endOf('month');
  const day = today.clone();

  moment.updateLocale('ru', { week: { dow: 1 } })
  const calendar= [];
    while (!day.isAfter(endMonth)) {
      calendar.push(day.clone());
      day.add(1, 'day');
    }
  
  console.log(calendar);
  
  return (
    <div className={styles.calendar__container}>
      <Swiper
        slidesPerView={"auto"}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
      >
        {calendar.map((dayItem, index) => (
          <SwiperSlide key={index}><DayItem index={index} dayItem={dayItem} key={dayItem.format('DDMMYYYY')} today={today} /></SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default Calendar;