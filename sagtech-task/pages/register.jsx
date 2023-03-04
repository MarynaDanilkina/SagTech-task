import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "../styles/signin.module.css";

function Register() {
  const router = useRouter();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        reset();
        router.push("/calendar");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className={styles.authorization__container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Landscape picture"
          width={55}
          height={55}
        />
      </Link>

      <h2 className={styles.authorization__title}>Регистрация</h2>
      <form
        className={styles.form__container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`${styles.form__list} ${styles.email}`}>
          <label className={styles.authorization__label} htmlFor="email">
            <input
              id="email"
              className={styles.label__info}
              type="email"
              placeholder=" "
              {...register("email", {})}
            />
            <span className={styles.label__span}>Email:</span>
          </label>
          {errors?.email && (
            <p className={styles.authorization__error}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={`${styles.form__list} ${styles.password}`}>
          <label className={styles.authorization__label} htmlFor="password">
            <input
              id="password"
              className={styles.label__info}
              placeholder=" "
              type="password"
              {...register("password", {
                minLength: { value: 6, message: "Введите минимум 6 символов" },
              })}
            />
            <span className={styles.label__span}>Пароль:</span>
          </label>
          {errors?.password && (
            <p className={styles.authorization__error}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className={styles.form__button}>
          <button
            className={styles.submit}
            type="submit"
            disabled={Object.keys(errors).length !== 0 || !isDirty}
          >
            Регистрация
          </button>
        </div>
      </form>
      <button
        type="button"
        className={styles.button__register}
        onClick={() => router.push("/signIn")}
      >
        Войти
      </button>
    </div>
  );
}
export default Register;
