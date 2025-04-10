import { Formik, Form, Field, ErrorMessage } from "formik";
import { HandleFormSubmit } from '../../utils/handleFormSubmit';
import * as Yup from 'yup';
import styles from './signUp.module.css'

const SignUp = () => {

	return (
			<div className={styles.container}>
				<div className={styles.form_wrap} >
					<h2 className={styles.title}>Введите данные для создания учетной записи</h2>
					<Formik
						initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
						validationSchema={
							Yup.object({
								name: Yup.string().required('Как к Вам можно обращаться?'),
								email: Yup.string().email('Неверный формат email').required('Email обязателен'),
								password: Yup.string()
									.min(6, 'Минимум 6 символов')
									.max(20, 'Максимум 20 символов')
									.required('Пароль обязателен'),
								confirmPassword: Yup.string()
									.oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
									.required('Подтверждение пароля обязательно'),
							})
						}
						onSubmit={HandleFormSubmit}
					>
						{({ errors, touched, isSubmitting }) => (
							<Form className={styles.form}>
								<div className={styles.input_wrap}>
									<label className={styles.label} htmlFor="email">Ваше имя</label>
									<Field
										className={styles.input}
										type="name"
										name="name"
										id="name"
										isinvalid={errors.name && touched.name ? "true" : "false"}
									/>
									<ErrorMessage className={styles.error} name="name" component="div" />
								</div>
								<div className={styles.input_wrap}>
									<label className={styles.label} htmlFor="email">Адрес электронной почты</label>
									<Field
										className={styles.input}
										type="email"
										name="email"
										id="email"
										autocomplete="email"
										isinvalid={errors.email && touched.email ? "true" : "false"}
									/>
									<ErrorMessage className={styles.error} name="email" component="div" />
								</div>
								<div className={styles.input_wrap}>
									<label className={styles.label} htmlFor="password">Пароль</label>
									<Field
										className={styles.input}
										type="password"
										name="password"
										id="password"
										isinvalid={errors.password && touched.password ? "true" : "false"}
									/>
									<ErrorMessage className={styles.error} name="password" component="div" />
								</div>
								<div className={styles.input_wrap}>
									<label className={styles.label} htmlFor="confirmPassword">Повторите пароль</label>
									<Field
										className={styles.input}
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										isinvalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
									/>
									<ErrorMessage className={styles.error} name="confirmPassword" component="div" />
								</div>
								<button className={styles.button} type="submit" disabled={isSubmitting}>
									Зарегистрироваться
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
	);
};

export default SignUp;
