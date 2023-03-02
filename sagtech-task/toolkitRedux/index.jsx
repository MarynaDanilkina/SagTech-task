import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarReducer';
import userReducer from './toolkitReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer,
  },
});
export default store;
