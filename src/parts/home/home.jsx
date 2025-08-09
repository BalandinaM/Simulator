import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./home.module.css";

const Home = () => {
	const dataHomePage = useSelector((state) => state.homePage.infoHomePage);

	const renderItem = (arr) => {
		return arr.map((elem) => (
			<li className={styles.list_item} key={nanoid(2)}>
				<h4 className={styles.h4}>{elem.title}</h4>
				<p className={styles.text}>{elem.description}</p>
			</li>
		));
	};

	const advantages = renderItem(dataHomePage.advantages);
	const principlesOfWork = renderItem(dataHomePage.principlesOfWork);

	return (
		<section className={styles.container}>
			<h1 className={styles.h1}>{dataHomePage.title}</h1>
			<p className={styles.text}>{dataHomePage.description}</p>
			<h3 className={styles.h3}>{dataHomePage.advantagesTitle}</h3>
			<ul className={styles.list}>{advantages}</ul>
			<h3 className={styles.h3}>{dataHomePage.principlesOfWorkTitle}</h3>
			<ul className={styles.list}>{principlesOfWork}</ul>
			<h2 className={styles.h2}>{dataHomePage.motivation.title}</h2>
			<p className={styles.text}>{dataHomePage.motivation.description}</p>
			<NavLink to="/signup" className={styles.link}>{dataHomePage.motivationAdd.textLink}</NavLink>
		</section>
	);
};

export default Home;
