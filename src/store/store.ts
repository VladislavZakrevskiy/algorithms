import { configureStore, combineReducers } from '@reduxjs/toolkit'
import canvasSlice from './reducers/canvasSlice'
import constSlice from './reducers/constsSlice'

const reducer = combineReducers({
	canvasSlice,
	constSlice,
})

export const store = configureStore({
	reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
