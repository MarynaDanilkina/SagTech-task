import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { collection, addDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth, db } from "@/firebase";
import styles from "../styles/signin.module.css";
import stylesTask from "./task.module.css";

function Task({ close }) {
  const router = useRouter();
  const user = auth.currentUser;
  const { selectedDay } = useSelector((state) => state.calendar);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const AddTask = async (data) => {
    try {
      await addDoc(collection(db, "task"), {
        ...data,
        date: selectedDay,
        done: false,
        userID: user.uid,
      });
      reset();
      router.back();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmit = (data) => {
    AddTask(data);
  };

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
                placeholder=" "
                {...register("title", {
                  required: "Поле обязательное для заполнения",
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
                id="description"
                maxLength="1000"
                className={stylesTask.form__textarea}
                {...register("description", {
                  required: "Поле обязательное для заполнения",
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
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Task;
