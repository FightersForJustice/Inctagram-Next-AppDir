import {useForm} from "react-hook-form";
import s from "./SettingsForm.module.scss";
import {PrimaryBtn} from "../../../../components/PrimaryBtn/PrimaryBtn";
import {DatePick} from "../../../../components/DatePicker/DatePick";
import React, {useState} from "react";
import {PutProfileBody, usePutProfileMutation} from "../../../../api/profile.api";
import {StatusCode} from "../../../../api/auth.api";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {Loader} from "../../../../components/Loader/Loader";
import {GetDefaultValuesForm} from "../../../../utils/GetDefaultValuesForm";
import {SettingsFormSchema} from "../../../../schemas/SettingsFormSchema";

export const SettingsForm = () => {
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [updateProfile, {isLoading}] = usePutProfileMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FormValues>({
        defaultValues: GetDefaultValuesForm,
        resolver: yupResolver(SettingsFormSchema),
    });

    const onSubmit = handleSubmit((data) => {
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
                    setError(err.data.messages[0]?.field, {message: err.data.messages[0]?.message});
                }
            });
    });

    if (isLoading) {
        return (
            <div className={"absolute top-[10%] right-[42%]"}>
                <Loader/>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className={s.form}>
            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Username</label>
                <input
                    id={'settings-profile-userName'}
                    {...register("userName", {required: true, minLength: 5, maxLength: 15})}
                    className={`${errors.userName ? s.form__textInput__error : s.form__textInput}`}
                />
                {errors.userName && <p className={s.form__error}>{errors.userName.message}</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Firstname</label>
                <input
                    id={'settings-profile-firstName'}
                    {...register("firstName", {required: true, minLength: 2, maxLength: 15})}
                    className={`${errors.firstName ? s.form__textInput__error : s.form__textInput}`}
                />
                {errors.firstName && <p className={s.form__error}>{errors.firstName.message}</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Lastname</label>
                <input
                    id={'settings-profile-lastName'}
                    {...register("lastName", {required: true, minLength: 2, maxLength: 15})}
                    className={`${errors.lastName ? s.form__textInput__error : s.form__textInput}`}
                />
                {errors.lastName && <p className={s.form__error}>{errors.lastName.message}</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Date of birthday</label>
                <DatePick setDate={setDateOfBirth}/>
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>City</label>
                <input
                    id={'settings-profile-city'}
                    {...register("city", {required: true, minLength: 3, maxLength: 20})}
                    className={`${errors.city ? s.form__textInput__error : s.form__textInput}`}
                />
                {errors.city && <p className={s.form__error}>{errors.city.message}</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>About me</label>
                <textarea
                    id={'settings-profile-aboutMe'}
                    {...register("aboutMe", {required: true, minLength: 10, maxLength: 100})}
                    className={`${errors.aboutMe ? s.form__textarea__error : s.form__textarea}`}
                />
                {errors.aboutMe && <p className={s.form__textareaError}>{errors.aboutMe.message}</p>}
            </div>

            <div className={s.form__btn} id={'settings-profile-btn-container'}>
                <PrimaryBtn>Save Changes</PrimaryBtn>
            </div>
        </form>
    );
};

type FormValues = {
    userName: string;
    firstName: string;
    lastName: string;
    city: string;
    aboutMe: string | undefined;
};
