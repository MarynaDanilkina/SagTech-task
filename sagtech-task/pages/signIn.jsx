import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, createContext } from "react";
import { useToast } from "@chakra-ui/core";
import styles from "../styles/signin.module.css";

const authContext = createContext();
const useAuth = () => useContext(authContext);

function SignIn() {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = ({ email, password }) => {
    reset();
    console.log(email);
    console.log(password);
    auth
      .signin(email, pass)
      .then(() => {
        router.push("/deals");
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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

      <h2 className={styles.authorization__title}>Авторизация пользователя</h2>
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
            {isDirty && (
              <p className={styles.email__clue}>
                Введите e-mail, указанный при регистрации
              </p>
            )}
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
              {...register("password", {})}
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
            Войти
          </button>
        </div>
      </form>
      <button
        type="button"
        className={styles.button__register}
        onClick={() => router.push("/register")}
      >
        Создать новый аккаунт
      </button>
    </div>
  );
}

export default SignIn;
