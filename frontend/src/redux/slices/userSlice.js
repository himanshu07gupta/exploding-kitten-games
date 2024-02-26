import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    highscores: [],
    isScoreUpdated: true
}


export const fetchHighscore = createAsyncThunk('fetchHighscore', async (_, { getState }) => {
  const { user } = getState().user; // Accessing user state from Redux store

  // Use user.token in your API request
  const response = await fetch('http://localhost:5000/users/highest', {
  headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });

  return response.json();
})

export const updateScore = createAsyncThunk('updatescore', async (_, { getState }) => {
  const { user } = getState().user; // Accessing user state from Redux store

  // Use user.token in your API request
  const response = await fetch('http://localhost:5000/users/updatescore', {
  headers: {
      'Authorization': `Bearer ${user.token}`
    }
  });
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    logoutUser: (state) => {
        state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHighscore.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.highscores = action.payload
    })
    builder.addCase(fetchHighscore.rejected, (state, action) => {
        // state.isLoading = false;
        state.highscores = action.payload
    })

    builder.addCase(updateScore.fulfilled, (state, action) => {
        state.isScoreUpdated = true;
        // state.highscores = action.payload
    })

  }
})


export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer