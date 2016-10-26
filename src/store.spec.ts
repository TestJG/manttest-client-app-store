"use strict";

import "jest";
require("babel-core/register");
require("babel-polyfill");
import { Observable } from "rxjs/Observable";
import { queue } from "rxjs/scheduler/queue";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/last";
import "rxjs/add/operator/map";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeLast";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/toPromise";
import * as deepEqual from "deep-equal";
import {
    reassign, Store, Action, StoreActions, logUpdates, startEffects,
    tunnelActions, ActionTunnel,
} from "rxstore";
import { testActions, expectedActions } from "rxstore-jest";
import {
    testUpdateEffects, testActionEffects, testStateEffects,
    expectAction, expectItem, testLastStateEffects,
} from "rxstore-jest";

import { defaultAppState, createAppStore, AppState, AppStore } from "./store";

describe("defaultAppState", () => {
  describe("Sanity checks", () => {
    it("Should be a function", () => expect(typeof defaultAppState).toBe("function"));
  });

  describe("Given no options", () => {
    it("The default state should have default values", () => {
      const state = defaultAppState();
      expect(typeof state.appTitleStore).toBe("object");
      expect(typeof state.settingsStore).toBe("object");
    });
  });
});

describe("createAppStore", () => {
    describe("Sanity checks", () => {
        it("should be a function", () => expect(typeof createAppStore).toBe("function"));
    });

    testLastStateEffects<AppState, AppStore>("Given a defaultAppState", createAppStore())
        ("When the store receives no actions", "The state should be as expected", [],
        state => {
            expect(typeof state.appTitleStore).toBe("object");
            expect(typeof state.settingsStore).toBe("object");
        });
});
