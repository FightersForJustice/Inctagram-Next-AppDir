import {useForm} from 'react-hook-form';
import s from './SettingsForm.module.scss'
import {PrimaryBtn} from '../../../../components/PrimaryBtn/PrimaryBtn';

export const SettingsForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            firstname: '',
            lastname: '',
            city: '',
            aboutMe: ''
        }
    });
    console.log(errors)

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(JSON.stringify(data));
            })}
            className={s.form}
        >
            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Username</label>
                <input {...register('username', {required: true, minLength: 5,  maxLength: 15})} className={s.form__textInput}/>
                {errors.username && <p className={s.form__error}>Min 5, max 15 symbols</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Firstname</label>
                <input
                    {...register('firstname', {required: true, minLength: 2,  maxLength: 15})}
                    className={s.form__textInput}
                />
                {errors.firstname && <p className={s.form__error}>Min 2, max 15 symbols</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>Lastname</label>
                <input
                    {...register('lastname', {required: true, minLength: 2,  maxLength: 15})}
                    className={s.form__textInput}
                />
                {errors.lastname && <p className={s.form__error}>Min 2, max 15 symbols</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>City</label>
                <input
                    {...register('city', {required: true, minLength: 3,  maxLength: 20})}
                    className={s.form__textInput}
                />
                {errors.city && <p className={s.form__error}>Min 3, max 20 symbols</p>}
            </div>

            <div className={s.form__itemWrapper}>
                <label className={s.form__label}>About me</label>
                <textarea
                    {...register('aboutMe', {required: true, minLength: 10,  maxLength: 100})}
                    className={s.form__textarea}
                />
                {errors.aboutMe && <p className={s.form__textareaError}>Min 10, max 100 symbols</p>}
            </div>

            <div className={s.form__btn}>
                <PrimaryBtn >Save Changes</PrimaryBtn>
            </div>
        </form>
    );
}
