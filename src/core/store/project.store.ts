import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

import { IProject } from '@/core/interface/Project'

export interface IProjectStore {
  loading: boolean | null
  projectList: IProject[]
}

const initialState: IProjectStore = {
  loading: null,
  projectList: [],
}

export const getProjects = createAsyncThunk('projects/const', async () => {
  const { data } = await api('projects', {})

  return data
})

// slice
export const projectState = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // resetUser(state, action: PayloadAction) {
    //   Cookies.remove('auth')
    //   state.loading = false
    //   state.userData = null
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProjects.fulfilled, (state, action: PayloadAction<IUserDto>) => {
      state.loading = false
      console.log(action.payload)
      if (action.payload) {
        state.projectList = [...action.payload]
      }
    })
  },
})

// export const { resetUser } = userStore.actions

export default projectState.reducer
