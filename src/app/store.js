import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../handlenotification/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})