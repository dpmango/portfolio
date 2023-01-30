import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

import { IGithubProfileDto, IGithubRepoDto } from '@/core/interface/Github'

export interface IWidgetsState {
  loading: boolean | null
  githubData: IGithubProfileDto | null
  githubRepos: IGithubRepoDto[]
}
const initialState: IWidgetsState = {
  loading: null,
  githubData: null,
  githubRepos: [],
}

// thunks
export const getGithubInfo = createAsyncThunk('widget/getGithubInfo', async () => {
  const { data } = await api('https://api.github.com/users/dpmango', {})

  return data
})

export const getGithubRepos = createAsyncThunk('widget/getGithubRepos', async () => {
  const { data } = await api('github/live', {})

  return data
})

// slice
export const widgetStore = createSlice({
  name: 'widget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGithubInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getGithubInfo.fulfilled, (state, action: PayloadAction<IUserDto>) => {
      state.loading = false

      if (action.payload) {
        state.githubData = {
          ...action.payload,
        }
      }
    })
    builder.addCase(getGithubRepos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getGithubRepos.fulfilled, (state, action: PayloadAction<IUserDto>) => {
      state.loading = false

      if (action.payload) {
        state.githubRepos = action.payload
      }
    })
  },
})

// export const { reducerAction } = userStore.actions

export default widgetStore.reducer
