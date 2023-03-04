import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import styles from "./labelTask.module.css";

function LabelTask({ task }) {
  const UpdatesetChecked = async (checked) => {
    try {
      const docRef = doc(db, "task", task.id);
      await updateDoc(docRef, {
        done: checked,
      });
    } catch (error) {
      console.log(error);
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
    <label htmlFor={task.id} className={styles.label}>
      <input
        className={styles.input}
        id={task.id}
        type="checkbox"
        checked={task.data.done}
        onChange={handleChange}
      />
      <span>{task.data.title}</span>
    </label>
  );
}
export default LabelTask;
