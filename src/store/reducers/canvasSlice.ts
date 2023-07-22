import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface canvasSliceState {
    canvasHTML: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
}

const initialState: canvasSliceState = {
    canvasHTML: null,
    ctx: null,
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvas: (state, action: PayloadAction<HTMLCanvasElement>) => {
            state.canvasHTML = action.payload
        },
        setContext: (state, action: PayloadAction<CanvasRenderingContext2D>) => {
            state.ctx = action.payload
        }
    }
})

export default canvasSlice.reducer

export const {setCanvas, setContext} = canvasSlice.actions