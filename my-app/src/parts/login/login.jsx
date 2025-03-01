import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { createValidationSchema } from '../../utils/createValidationSchema';
import { HandleFormSubmit } from '../../utils/handleFormSubmit';
import styles from './login.module.css'

const Login = () => {
	return (
			<div className={styles.container}>
				<h2>Авторизация</h2>
				<Formik
					initialValues={{ email: "", password: "", rememberMe: false }}
					validationSchema={createValidationSchema({ email: "", password: "", remembeMe: false })}
					onSubmit={HandleFormSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
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
									autocomplete="current-password"
									isinvalid={errors.password && touched.password ? "true" : "false"}
								/>
								<ErrorMessage name="password" component="div" />
							</div>
							<div>
								<label htmlFor="rememberMe">Запомнить меня</label>
								<Field type="checkbox" name="rememberMe" id="rememberMe"/>
							</div>
							<button type="submit" disabled={isSubmitting}>
								Авторизоваться
							</button>
						</Form>
					)}
				</Formik>
				<NavLink to="/signup">Впервые? Тогда зарегистрируйтесь.</NavLink>
			</div>
	);
};

export default Login;
