import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./home.module.css";

const Home = () => {
	const dataHomePage = useSelector((state) => state.homePage.infoHomePage);
	console.log(dataHomePage.title);

	const renderItem = (arr) => {
		return arr.map((elem) => (
			<li key={nanoid(2)}>
				<h4>{elem.title}</h4>
				<p>{elem.description}</p>
			</li>
		));
	};

	const advantages = renderItem(dataHomePage.advantages);
	const principlesOfWork = renderItem(dataHomePage.principlesOfWork);

	return (
		<section className={styles.container}>
			<div>
				<h1>{dataHomePage.title}</h1>
				<p>{dataHomePage.description}</p>
				<h3>{dataHomePage.advantagesTitle}</h3>
				<ul className={styles.list}>{advantages}</ul>
				<h3>{dataHomePage.principlesOfWorkTitle}</h3>
				<ul className={styles.list}>{principlesOfWork}</ul>
				<h2>{dataHomePage.motivation.title}</h2>
				<p>{dataHomePage.motivation.description}</p>
				<span>{dataHomePage.motivation.slogan}</span>
				<h3>{dataHomePage.motivationAdd.title}</h3>
				<p>{dataHomePage.motivationAdd.description}</p>
				<NavLink to="/signup">{dataHomePage.motivationAdd.textLink}</NavLink>
				<span>{dataHomePage.slogan}</span>
			</div>
		</section>
	);
};

export default Home;
