import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
  function ChangeDescription(event) {
    setDescription(event.target.value);
  }
  function ChangeTitle(event) {
    setTitle(event.target.value);
  }

  function cancellation() {
    setDescription(task[0].data.description);
    setTitle(task[0].data.title);
    setEdit(false);
  }
  useEffect(() => {
    if (task) {
      setDescription(task[0].data.description);
      setTitle(task[0].data.title);
    }
  }, [task]);
  const { id } = router.query;
  const upDateTask = async (data) => {
    try {
      const docRef = doc(db, "task", id);
      await updateDoc(docRef, {
        ...data,
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getTask = async () => {
    try {
      const collectionRef = collection(db, "task");
      const qry = query(collectionRef, where(documentId(), "==", id));

      await onSnapshot(qry, (querySnapshot) => {
        setTask(
          querySnapshot.docs.map((doc2) => ({
            id: doc2.id,
            data: doc2.data(),
          }))
        );
      });
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
          <p>{task[0].data.title}</p>
          <p>{task[0].data.description}</p>
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
