import { configureStore } from '@reduxjs/toolkit';
import  homePageReducer from '../parts/home/homePageSlice';

export const store = configureStore({
	reducer: {
		homePage: homePageReducer,
	},
})
