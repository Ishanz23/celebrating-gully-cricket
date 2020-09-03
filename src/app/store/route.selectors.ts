import { createFeatureSelector } from '@ngrx/store'
import { RouterReducerState, getSelectors, routerReducer } from '@ngrx/router-store'
import { routerKey, State } from '../store'
export const selectRouter = createFeatureSelector<State, RouterReducerState<any>>(routerKey)

export const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = getSelectors(selectRouter)
