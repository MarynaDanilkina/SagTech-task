import { useSelector } from "react-redux";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./taskList.module.css";
import LabelTask from "./labelTask";

function TaskList() {
  const router = useRouter();
  const { dayTaskSelected, selectedDay } = useSelector(
    (state) => state.calendar
  );
  const day = moment.unix(selectedDay);
  return (
    <div className={styles.taskList__container}>
      <h2>
        На {day.format("D")}.{day.format("MM")} всего задач:{" "}
        {dayTaskSelected.length}
      </h2>
      <div className={styles.tasks__container}>
        <ul className={styles.ul}>
          {dayTaskSelected.map((task) => (
            <li key={task.id}>
              <LabelTask task={task} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className={styles.button__addTask}
        onClick={() => router.push("/task")}
      >
        Добавить новую задачу
      </button>
    </div>
  );
}
export default TaskList;
