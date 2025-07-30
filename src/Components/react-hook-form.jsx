import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", {required: true})} placeholder="Name"/>
            {errors.name && <p>{errors.name.message}</p>}
            <input{...register('email',
                {required: true, pattern: { value: /^\S+@\S+$/, message: "Неверный формат email"}}
            )}
                  placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input {...register("password",
                {required: true,
                minLength: { value: 8, message: 'Минимальная длина пароля 8 символов'},
                })}
                   placeholder="Password"/>
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Register</button>
        </form>

    )
}