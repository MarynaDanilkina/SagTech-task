import { useState } from "react";
import styles from "./labelTask.module.css";

function LabelTask({ task }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <label htmlFor={task.id} className={styles.label}>
      <input
        id={task.id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {task.data.title}
    </label>
  );
}
export default LabelTask;
