import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accounts: [],
}

export const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    get: (state, action) => {
      state.accounts = action.payload
    },
    save: (state, action) => {
      let indexAccount = state.accounts.findIndex((g)=>(g.id === action.payload.id))
      state.accounts[indexAccount] = action.payload
    },
  },
})

export const { get, save} = accountSlice.actions
export default accountSlice.reducer