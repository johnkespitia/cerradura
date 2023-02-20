import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  guard: [] ,
}

export const guardSlice = createSlice({
  name: 'guard',
  initialState,
  reducers: {
    get: (state, action) => {
      state.guard = action.payload
    },
    save: (state, action) => {
      let indexGuard = state.guard.findIndex((g)=>(g.id === action.payload.id))
      state.guard[indexGuard] = action.payload
    },
  },
})

export const { get, save } = guardSlice.actions
export default guardSlice.reducer