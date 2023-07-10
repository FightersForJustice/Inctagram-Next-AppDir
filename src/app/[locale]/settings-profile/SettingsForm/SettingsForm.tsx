import { useForm } from "react-hook-form";
import s from "./SettingsForm.module.scss";
import { PrimaryBtn } from "../../../../components/PrimaryBtn/PrimaryBtn";
import { DatePick } from "../../../../components/DatePicker/DatePick";
import React, { useState } from "react";
import { PutProfileBody, usePutProfileMutation } from "../../../../api/profile.api";
import { StatusCode } from "../../../../api/auth.api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  aboutMe: string | undefined;
};

const schema = yup
  .object({
    userName: yup.string().min(6).max(30).required(),
    firstName: yup.string().min(5).max(15).required(),
    lastName: yup.string().min(5).max(15).required(),
    city: yup.string().min(3).max(15).required(),
    aboutMe: yup.string().min(10).max(200),
  })
  .required();

export const SettingsForm = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [updateProfile] = usePutProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: async () => {
      let data;
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const response = await fetch("https://inctagram-api.vercel.app/api/users/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        data = await response.json();
      }

      return {
        userName: data?.userName!,
        firstName: data?.firstName!,
        lastName: data?.lastName!,
        city: data?.city!,
        aboutMe: data?.aboutMe!,
      };
    },
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const result: PutProfileBody = {
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          city: data.city,
          dateOfBirth: new Date(dateOfBirth),
          aboutMe: data.aboutMe,
        };

        updateProfile(result)
          .unwrap()
          .then(() => {
            toast.success("Profile successfully updated");
          })
          .catch((err) => {
            if (err.status === StatusCode.badRequest) {
              setError(err.data.messages[0]?.field, { message: err.data.messages[0]?.message });
            }
          });
      })}
      className={s.form}
    >
      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>Username</label>
        <input
          {...register("userName", { required: true, minLength: 5, maxLength: 15 })}
          className={`${errors.userName ? s.form__textInput__error : s.form__textInput}`}
        />
        {errors.userName && <p className={s.form__error}>{errors.userName.message}</p>}
      </div>

      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>Firstname</label>
        <input
          {...register("firstName", { required: true, minLength: 2, maxLength: 15 })}
          className={`${errors.firstName ? s.form__textInput__error : s.form__textInput}`}
        />
        {errors.firstName && <p className={s.form__error}>{errors.firstName.message}</p>}
      </div>

      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>Lastname</label>
        <input
          {...register("lastName", { required: true, minLength: 2, maxLength: 15 })}
          className={`${errors.lastName ? s.form__textInput__error : s.form__textInput}`}
        />
        {errors.lastName && <p className={s.form__error}>{errors.lastName.message}</p>}
      </div>

      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>Date of birthday</label>
        <DatePick setDate={setDateOfBirth} />
      </div>

      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>City</label>
        <input
          {...register("city", { required: true, minLength: 3, maxLength: 20 })}
          className={`${errors.city ? s.form__textInput__error : s.form__textInput}`}
        />
        {errors.city && <p className={s.form__error}>{errors.city.message}</p>}
      </div>

      <div className={s.form__itemWrapper}>
        <label className={s.form__label}>About me</label>
        <textarea
          {...register("aboutMe", { required: true, minLength: 10, maxLength: 100 })}
          className={`${errors.aboutMe ? s.form__textarea__error : s.form__textarea}`}
        />
        {errors.aboutMe && <p className={s.form__textareaError}>{errors.aboutMe.message}</p>}
      </div>

      <div className={s.form__btn}>
        <PrimaryBtn>Save Changes</PrimaryBtn>
      </div>
    </form>
  );
};
