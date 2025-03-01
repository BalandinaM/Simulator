import { Formik, Form, Field, ErrorMessage } from "formik";
import { HandleFormSubmit } from '../../utils/handleFormSubmit';
import * as Yup from 'yup';
import styles from './signUp.module.css'

const SignUp = () => {

	return (
			<div className={styles.container}>
				<h2>Введите данные для создания учетной записи</h2>
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
						<Form>
							<div>
								<label htmlFor="email">Ваше имя</label>
								<Field
									type="name"
									name="name"
									id="name"
									isinvalid={errors.name && touched.name ? "true" : "false"}
								/>
								<ErrorMessage name="name" component="div" />
							</div>
							<div>
								<label htmlFor="email">Адрес электронной почты</label>
								<Field
									type="email"
									name="email"
									id="email"
									autocomplete="email"
									isinvalid={errors.email && touched.email ? "true" : "false"}
								/>
								<ErrorMessage name="email" component="div" />
							</div>
							<div>
								<label htmlFor="password">Пароль</label>
								<Field
									type="password"
									name="password"
									id="password"
									isinvalid={errors.password && touched.password ? "true" : "false"}
								/>
								<ErrorMessage name="password" component="div" />
							</div>
							<div>
								<label htmlFor="confirmPassword">Повторите пароль</label>
								<Field
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									isinvalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
								/>
								<ErrorMessage name="confirmPassword" component="div" />
							</div>
							<button type="submit" disabled={isSubmitting}>
								Зарегистрироваться
							</button>
						</Form>
					)}
				</Formik>
			</div>
	);
};

export default SignUp;
