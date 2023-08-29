import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import counterReducer from "./modules/counter";
import recommendSlice from "@/views/discover/c-views/recommend/store/recommend"
import playerReducer from "@/views/player/store/player"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        recommend: recommendSlice,
        player: playerReducer
    }
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispathType = typeof store.dispatch

/* useapp的hook */
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispathType = useDispatch

export default store    