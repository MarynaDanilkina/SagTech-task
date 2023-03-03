// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, addDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import moment from "moment";
import { db } from "@/firebase";
import styles from "./taskList.module.css";

function TaskList() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { dayTaskSelected, selectedDay } = useSelector(
    (state) => state.calendar
  );
  const day = moment.unix(selectedDay);
  const AddTask = async () => {
    try {
      await addDoc(collection(db, "task"), {
        date: "1677878493",
        done: true,
        title: "124",
        userID: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.taskList__container}>
      <h2>
        На {day.format("D")}.{day.format("MM")} всего задач:{" "}
        {dayTaskSelected.length}
      </h2>
      <div className={styles.tasks__container}>
        <ul>
          {dayTaskSelected.map((task) => (
            <li key={task.id}>{task.data.title}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className={styles.button__addTask}
        onClick={() => AddTask()}
      >
        Добавить новую задачу
      </button>
    </div>
  );
}
export default TaskList;
