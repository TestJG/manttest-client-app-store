import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/timeout";
import * as deepEqual from "deep-equal";
import {
  reassign, reassignif,
  actionCreator, TypedActionDescription, EmptyActionDescription,
  reducerFromActions, Reducer, StateUpdate,
  createStore, Store, StoreMiddleware,
  withEffects, defineStore, ICreateStoreOptions, logUpdates,
  tunnelActions, extendWithActions, extendWith, Action,
} from "rxstore";

import { AppTitleStore, createAppTitleStore, AppTitleActions } from "manttest-client-app-title-store";
import { SettingsStore, createSettingsStore, SettingsActions } from "manttest-client-settings-store";

/* MODELS */

export interface AppState {
  appTitleStore: AppTitleStore;
  // requesterStore: RequesterStore;
  settingsStore: SettingsStore;
}

// export interface SetUserPayload {
//   name: string;
// }

/* ACTIONS */

export interface AppEvents {}

const newEvent = actionCreator<AppState>("MantTest.App/");

export const AppActions = {};

/* STORE */

const AppReducer = reducerFromActions<AppState>(AppActions);

export type AppStore = Store<AppState> & AppEvents;

export const defaultAppState = (): AppState => ({
  appTitleStore: createAppTitleStore()(),
  settingsStore: createSettingsStore()(),
  // requesterStore: ,
});

export const createAppStore = () => defineStore<AppState, AppStore>(
  AppReducer,
  defaultAppState,
  extendWithActions(AppActions),
  tunnelActions({
    actions: {
      toggleSettings: (a: Action) => AppTitleActions.toggleSettings(),
    },
    dispatchFactory: (store: AppStore) => store.state$.map(s => s.settingsStore.dispatch),
  }),
);
