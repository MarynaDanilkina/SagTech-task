import { useForm } from "react-hook-form";
import { collection, addDoc, doc, updateDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import styles from "../styles/signin.module.css";
import stylesTask from "./modal.module.css";

function Task({ close, type, id, task, upDate }) {
  const user = auth.currentUser;
  const { selectedDay } = useSelector((state) => state.calendar);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
  });
  function ChangeDescription(event) {
    setDescription(event.target.value);
  }
  function ChangeTitle(event) {
    setTitle(event.target.value);
  }
  const AddTask = async (data) => {
    try {
      await addDoc(collection(db, "task"), {
        ...data,
        date: selectedDay,
        done: false,
        userID: user.uid,
      });
      reset();
      close(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const upDateTask = async (data) => {
    try {
      const docRef = doc(db, "task", id);
      await updateDoc(docRef, {
        ...data,
      });
      close(false);
      upDate();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmit = (data) => {
    if (type === "save") {
      AddTask(data);
    }
    if (type === "update") {
      upDateTask(data);
    }
  };
  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setTitle(task.title);
    }
  }, []);
  return (
    <div className={stylesTask.task__container}>
      <div className={stylesTask.modal}>
        <div className={stylesTask.buttonClose__container}>
          <button
            type="button"
            onClick={() => close(false)}
            className={stylesTask.button__close}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L1 13M1 1L13 13"
                stroke="#2D2D2E"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form
          className={stylesTask.form__container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={stylesTask.form__list}>
            <label className={styles.authorization__label} htmlFor="Title">
              <input
                id="Title"
                className={styles.label__info}
                type="text"
                placeholder={title || ""}
                value={title || ""}
                onInput={(event) => ChangeTitle(event)}
                {...register("title", {
                  required: true,
                })}
              />
              <span className={styles.label__span}>Заголовок:</span>
            </label>
          </div>
          <div className={stylesTask.form__list}>
            <label
              className={stylesTask.label__description}
              htmlFor="description"
            >
              <textarea
                placeholder={description || ""}
                value={description || ""}
                onInput={(event) => ChangeDescription(event)}
                id="description"
                className={stylesTask.form__textarea}
                {...register("description", {
                  required: true,
                })}
              />
              <span className={stylesTask.label__span}>Описание:</span>
            </label>
          </div>
          <div className={stylesTask.form__button}>
            <button
              className={stylesTask.submit}
              type="submit"
              disabled={Object.keys(errors).length !== 0 || !isDirty}
            >
              {type === "save" ? "Сохранить" : "Обновить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Task;
