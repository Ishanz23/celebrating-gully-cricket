import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../../environments/environment'
import { RouterReducerState, routerReducer } from '@ngrx/router-store'
import { RouterStateUrl } from './route.serializer'

export const routerKey = 'router'

export interface State {
  router: RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
