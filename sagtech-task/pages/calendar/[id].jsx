import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { db } from "@/config/firebase";
import styles from "../../styles/id.module.css";
import Task from "@/components/modal";

function Id() {
  const router = useRouter();
  const [task, setTask] = useState();
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const close = useCallback((value) => {
    setEdit(value);
  }, []);
  const { id } = router.query;
  const getTask = async () => {
    try {
      const docRef = doc(db, "task", id);
      const docSnap = await getDoc(docRef);
      setTask(docSnap.data());
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setTitle(task.title);
    }
  }, [task]);
  return (
    <div className={styles.id__container}>
      {task ? (
        <>
          <div className={styles.button__container}>
            <button
              className={styles.button_goBack}
              type="button"
              onClick={() => router.back()}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 7L7 1"
                  stroke="#2D2D2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className={styles.p__title}>{title}</p>
          <p className={styles.p__description}>{description}</p>
          <div className={styles.button__submitContainer}>
            <button
              className={styles.submit}
              type="button"
              onClick={() => setEdit(true)}
            >
              Редактировать
            </button>
          </div>

          {edit && (
            <Task
              close={close}
              type="update"
              id={id}
              task={task}
              upDate={getTask}
            />
          )}
        </>
      ) : (
        <p>404</p>
      )}
    </div>
  );
}
export default Id;
