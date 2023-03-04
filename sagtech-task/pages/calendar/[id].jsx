import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import styles from "../../styles/id.module.css";

function Id() {
  const router = useRouter();
  const [task, setTask] = useState();
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const { id } = router.query;
  function ChangeDescription(event) {
    setDescription(event.target.value);
  }
  function ChangeTitle(event) {
    setTitle(event.target.value);
  }

  function cancellation() {
    setDescription(task.description);
    setTitle(task.title);
    setEdit(false);
  }
  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setTitle(task.title);
    }
  }, [task]);
  const getTask = async () => {
    try {
      const docRef = doc(db, "task", id);
      const docSnap = await getDoc(docRef);
      setTask(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };
  const upDateTask = async (data) => {
    try {
      const docRef = doc(db, "task", id);
      await updateDoc(docRef, {
        ...data,
      });
      setEdit(false);
      getTask();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  const onSubmit = (data) => {
    upDateTask(data);
  };
  return (
    <div>
      {task ? (
        <>
          <button
            className={styles.button_goBack}
            type="button"
            onClick={() => router.back()}
          >
            назад
          </button>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <button
            className={styles.submit}
            type="button"
            onClick={() => setEdit(true)}
          >
            Редактировать
          </button>
          {edit && (
            <>
              <form
                className={styles.form__container}
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className={styles.label__description} htmlFor="title">
                  <textarea
                    onInput={(event) => ChangeTitle(event)}
                    value={title}
                    id="title"
                    className={styles.form__textarea}
                    {...register("title")}
                  />
                </label>
                <label
                  className={styles.label__description}
                  htmlFor="description"
                >
                  <textarea
                    onInput={(event) => ChangeDescription(event)}
                    value={description}
                    id="description"
                    className={styles.form__textarea}
                    {...register("description")}
                  />
                </label>

                <button className={styles.submit} type="submit">
                  Сахранить
                </button>
              </form>
              <button
                className={styles.submit}
                type="submit"
                onClick={cancellation}
              >
                Отмена
              </button>
            </>
          )}
        </>
      ) : (
        <p>404</p>
      )}
    </div>
  );
}
export default Id;
