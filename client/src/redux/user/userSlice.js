import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        userUpdateStart: (state) => {
            state.isLoading = true
        },
        userUpdateSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.error = null
        },
        userUpdateFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, userUpdateStart, userUpdateSuccess, userUpdateFailure } = userSlice.actions
export default userSlice.reducer