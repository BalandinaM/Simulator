import { configureStore } from '@reduxjs/toolkit';
import  homePageReducer from '../components/home/homePageSlice';

export const store = configureStore({
	reducer: {
		homePage: homePageReducer,
	},
})
