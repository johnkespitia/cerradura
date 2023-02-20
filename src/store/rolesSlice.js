import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roles: [] ,
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    get: (state, action) => {
      state.roles = action.payload
    },
    save: (state, action) => {
      let indexGuard = state.roles.findIndex((g)=>(g.id === action.payload.id))
      state.roles[indexGuard] = action.payload
    },
  },
})

export const { get, save } = rolesSlice.actions
export default rolesSlice.reducer