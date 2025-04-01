import { Formik, Form, Field, ErrorMessage } from "formik";
import { createValidationSchema } from '../../utils/createValidationSchema';
import { HandleFormSubmit } from '../../utils/handleFormSubmit';
import styles from './login.module.css'

const Login = () => {
	return (
			<div className={styles.container}>
				<h2 className={styles.title}>Авторизация</h2>
				<Formik
					initialValues={{ email: "", password: "", rememberMe: false }}
					validationSchema={createValidationSchema({ email: "", password: "", remembeMe: false })}
					onSubmit={HandleFormSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form}>
							<div className={styles.input_wrap}>
								<label className={styles.label} htmlFor="email">Адрес электронной почты</label>
								<Field className={styles.input}
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
								<Field className={styles.input}
									type="password"
									name="password"
									id="password"
									autocomplete="current-password"
									isinvalid={errors.password && touched.password ? "true" : "false"}
								/>
								<ErrorMessage className={styles.error} name="password" component="div" />
							</div>
							<div className={styles.input_wrap}>
								<label className={styles.label} htmlFor="rememberMe">Запомнить меня</label>
								<Field className={styles.checkbox} type="checkbox" name="rememberMe" id="rememberMe"/>
							</div>
							<button className={styles.button} type="submit" disabled={isSubmitting}>
								Авторизоваться
							</button>
						</Form>
					)}
				</Formik>
			</div>
	);
};

export default Login;
