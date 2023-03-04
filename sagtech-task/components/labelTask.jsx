/* eslint-disable import/no-extraneous-dependencies */
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "@/firebase";
import styles from "./labelTask.module.css";

function LabelTask({ task }) {
  const router = useRouter();
  const UpdatesetChecked = async (checked) => {
    try {
      const docRef = doc(db, "task", task.id);
      await updateDoc(docRef, {
        done: checked,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleChange = () => {
    if (task.data.done) {
      UpdatesetChecked(false);
    } else {
      UpdatesetChecked(true);
    }
  };
  return (
    <div className={styles.checkbox__container}>
      <label htmlFor={task.id} className={styles.label}>
        <input
          className={styles.input}
          id={task.id}
          type="checkbox"
          checked={task.data.done}
          onChange={handleChange}
        />
        <span className={styles.span}> </span>
      </label>
      <button
        type="button"
        className={styles.button__title}
        onClick={() => router.push(`/calendar/${task.id}`)}
      >
        {task.data.title}
      </button>
    </div>
  );
}
export default LabelTask;
