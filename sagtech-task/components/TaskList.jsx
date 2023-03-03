// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, addDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import styles from "./taskList.module.css";

function TaskList() {
  const auth = getAuth();
  const user = auth.currentUser;
  const AddTask = async () => {
    try {
      await addDoc(collection(db, "task"), {
        date: "1677948973",
        done: true,
        title: "122",
        userID: user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.taskList__container}>
      <h2>Задач на день: </h2>
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
