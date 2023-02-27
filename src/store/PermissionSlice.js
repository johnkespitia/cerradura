import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  permissions: [],
}

export const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    get: (state, action) => {
      state.permissions = action.payload
    },
    save: (state, action) => {
      let index = state.permissions.findIndex((g)=>(g.id === action.payload.id))
      state.permissions[index] = action.payload
    },
  },
})

export const { get, save} = permissionSlice.actions
export default permissionSlice.reducer