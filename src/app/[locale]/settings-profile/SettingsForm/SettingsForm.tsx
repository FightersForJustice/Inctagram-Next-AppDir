import { useForm } from "react-hook-form";
import s from "./SettingsForm.module.scss";
import { PrimaryBtn } from "src/components/Buttons/PrimaryBtn";
import { DatePick } from "@/components/DatePicker";
import React, { useState } from "react";
import { PutProfileBody, useLazyGetProfileQuery, usePutProfileMutation } from "@/api/profile.api";
import { StatusCode } from "@/api/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";
import { GetDefaultValuesForm, handleApiError } from "@/utils";
import { SettingsFormSchema } from "@/features/schemas";
import { SettingsFormItem } from "./SettingsFormItem";

type Props = {
  userBirthday: string;
  translate: any;
};
type FormValues = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string | null | undefined;
  aboutMe: string | null | undefined;
};

export const SettingsForm: React.FC<Props> = ({ userBirthday, translate }) => {
  const [dateOfBirth, setDateOfBirth] = useState(userBirthday);
  const [ageError, setAgeError] = useState("");

  const [updateProfile, { isLoading }] = usePutProfileMutation();
  const [getUserProfile, { error }] = useLazyGetProfileQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: GetDefaultValuesForm,
    resolver: yupResolver(SettingsFormSchema()),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    let parts = dateOfBirth.split(".");
    let birthdayDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);

    const result: PutProfileBody = {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      dateOfBirth: dateOfBirth ? String(birthdayDate) : userBirthday,
      aboutMe: data.aboutMe,
    };

    updateProfile(result)
      .unwrap()
      .then(() => {
        getUserProfile();
        toast.success("Profile successfully updated");
      })
      .catch((err) => {
        if (err.status === StatusCode.badRequest) {
          setError(err.data.messages[0]?.field, { message: err.data.messages[0]?.message });
        }
        toast.error(err.error);
      });
  });

  if (error) {
    handleApiError(error);
  }

  return (
    <>
      <form onSubmit={onSubmit} className={s.form}>
        <SettingsFormItem
          translate={translate}
          id={"settings-profile-userName"}
          register={register}
          error={errors.userName}
          errorMessage={errors?.userName?.message}
          registerName={"userName"}
          translateName={"username"}
          minLength={5}
          maxLength={15}
        />

        <SettingsFormItem
          translate={translate}
          id={"settings-profile-firstName"}
          register={register}
          error={errors.firstName}
          errorMessage={errors?.firstName?.message}
          registerName={"firstName"}
          translateName={"firstname"}
          minLength={2}
          maxLength={15}
        />

        <SettingsFormItem
          translate={translate}
          id={"settings-profile-lastName"}
          register={register}
          error={errors.lastName}
          errorMessage={errors?.lastName?.message}
          registerName={"lastName"}
          translateName={"lastname"}
          minLength={2}
          maxLength={15}
        />

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("birthday")}</label>
          <DatePick
            setDate={setDateOfBirth}
            userBirthday={userBirthday}
            ageError={ageError}
            setAgeError={setAgeError}
          />
        </div>

        <SettingsFormItem
          translate={translate}
          id={"settings-profile-city"}
          register={register}
          error={errors.city}
          errorMessage={errors?.city?.message}
          registerName={"city"}
          translateName={"city"}
          minLength={3}
          maxLength={20}
        />

        <div className={s.form__itemWrapper}>
          <label className={s.form__label}>{translate("aboutMe")}</label>
          <textarea
            id={"settings-profile-aboutMe"}
            {...register("aboutMe", { required: true, minLength: 10, maxLength: 100 })}
            className={`${errors.aboutMe ? s.form__textarea__error : s.form__textarea}`}
          />
          {errors.aboutMe && (
            <p
              className={`${s.form__textareaError} ${
                errors.aboutMe.message?.length! > 90 ? `${s.form__textareaError__bottom}` : ""
              } `}
            >
              {errors.aboutMe.message}
            </p>
          )}
        </div>

        <div className={s.form__btn} id={"settings-profile-btn-container"}>
          <PrimaryBtn disabled={!!ageError}>{translate("saveBtn")}</PrimaryBtn>
        </div>
      </form>
      {isLoading && <Loader />}
    </>
  );
};
