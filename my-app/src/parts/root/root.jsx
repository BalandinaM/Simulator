import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./root.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../../components/navigation/navigation";
// import { getWords } from "../../forStorage";

// export async function loader() {
// 	const words = await getWords();
// 	return {words};
// }

const Root = () => {
	const isAuth = false;
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate('/simulator')
		} else {
			//navigate('/home')
			navigate('/listWords') //временно пока разрабатываю страницу эту
		}
	}, [isAuth, navigate])

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.wrap_content}>
				<Navigation />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Root;
