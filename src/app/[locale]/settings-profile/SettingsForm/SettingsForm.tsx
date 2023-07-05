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

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(JSON.stringify(data));
            })}
            className={s.form}
        >
            <label className={s.form__label}>Username</label>
            <input {...register('username')} defaultValue="test" className={s.form__textInput}/>
            <label className={s.form__label}>Firstname</label>
            <input
                {...register('firstname', {required: true, maxLength: 10})}
                className={s.form__textInput}
            />
            <label className={s.form__label}>Lastname</label>
            <input
                {...register('lastname', {required: true, maxLength: 10})}
                className={s.form__textInput}
            />
            <label className={s.form__label}>City</label>
            <input
                {...register('city', {required: true, maxLength: 10})}
                className={s.form__textInput}
            />
            <label className={s.form__label}>About me</label>
            <textarea
                {...register('aboutMe', {required: true, minLength: 10})}
                className={s.form__textarea}
            />
            {errors.username && <p className={s.form__error}>This field is required</p>}
            <div className={s.form__btn}>
                <PrimaryBtn disabled={true}>Save Changes</PrimaryBtn>
            </div>
        </form>
    );
}
