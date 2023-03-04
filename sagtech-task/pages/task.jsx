import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, addDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { auth, db } from "@/firebase";
import styles from "../styles/signin.module.css";
import stylesTask from "../styles/task.module.css";

function Task() {
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
        done: true,
        userID: user.uid,
      });
      reset();
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (data) => {
    AddTask(data);
  };

  return (
    <div className={styles.authorization__container}>
      <button
        type="button"
        onClick={() => router.back()}
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
      <form
        className={styles.form__container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`${styles.form__list} ${styles.email}`}>
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
        <div className={`${styles.form__list} ${styles.password}`}>
          <label htmlFor="description">
            <textarea
              id="description"
              maxLength="1000"
              className={stylesTask.form__textarea}
              {...register("description", {
                required: "Поле обязательное для заполнения",
              })}
            />
            <span className={styles.label__span}>Описание:</span>
          </label>
        </div>
        <div className={styles.form__button}>
          <button
            className={styles.submit}
            type="submit"
            disabled={Object.keys(errors).length !== 0 || !isDirty}
          >
            Добавить задание
          </button>
        </div>
      </form>
    </div>
  );
}

export default Task;
