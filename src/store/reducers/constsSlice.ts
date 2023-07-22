import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface constSliceState {
    G: number
    softeningConst: number
    dt: number
    scale: number
    radius: number
    trail: number
}

const initialState: constSliceState = {
    dt: 0.003,
    G: 39.5,
    radius: 4,
    scale: 70,
    softeningConst: 0.15,
    trail: 35
}

const constSlice = createSlice({
    name: 'consts',
    initialState,
    reducers: {
        setConsts(state, action: PayloadAction<constSliceState>) {
            state = action.payload
        }
    }
})

export default constSlice.reducer

export const {setConsts} = constSlice.actions


