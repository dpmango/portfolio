import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import projectStore from '@/core/store/project.store'
import userStore from '@/core/store/user.store'
import widgetStore from '@/core/store/widget.store'

export const store = configureStore({
  reducer: {
    userStore,
    projectStore,
    widgetStore,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
