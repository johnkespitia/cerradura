import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    mydata: (state, action) => {
      state.user.data = action.payload
    },
    permissions: (state, action) => {
      state.user.permissions = action.payload
    },
    logout: (state,action ) => {
      state.user = null
    },
  },
})

export const { login, logout, mydata, permissions } = userSlice.actions
export default userSlice.reducer