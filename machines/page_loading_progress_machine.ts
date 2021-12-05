import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  // progress bar invisible
  idle = "idle",
  // progres bar is visible and it is growing
  // you can hide scroll indicator (we don;t have one)
  started = "started",
  // progress bar went to the end, we should hide it
  done = "done",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  START = "START",
  STOP = "STOP",
  GROW_PROGRESS_VALUE = "GROW_PROGRESS_VALUE",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  progressValue: number;
  progressBarVisible: boolean;
  scrollIndicatorVisible: boolean;
  timeoutsAllowed: boolean;
}

export type machineEventsGenericType =
  | {
      type: EE.START;
    }
  | {
      type: EE.STOP;
    }
  | {
      type: EE.GROW_PROGRESS_VALUE;
      payload: {
        progressValue: number;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.idle;
      context: MachineContextGenericI;
    }
  | {
      value: fse.started;
      context: MachineContextGenericI;
    }
  | {
      value: fse.done;
      context: MachineContextGenericI;
    };

// ------------------ HELPER ENUMS ----------------

enum Actions {
  resetProgressValue = "resetProgressValue",
  setProgressValueTo100 = "setProgressValueTo100",
  hideProgressBar = "hideProgressBar",
  showProgressBar = "showProgressBar",
  showScrollIndicator = "showScrollIndicator",
  hideScrollIndicator = "hideScrollIndicator",
  allowTiemeouts = "allowTiemeouts",
  disallowTiemouts = "disallowTiemouts",
}

// -----------------  MACHINE ---------------------

const pageLoadingProgressMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>(
  {
    id: "page_loading_progress_machine",
    initial: fse.idle,
    context: {
      progressValue: 0,
      progressBarVisible: false,
      scrollIndicatorVisible: true,
      timeoutsAllowed: false,
    },
    // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
    /* on: {
    [EE.]: {
      actions: [
      ],
    },
  }, */
    // -------------------------------------------------------------------
    states: {
      [fse.idle]: {
        entry: [
          Actions.hideProgressBar,
          Actions.showScrollIndicator,
          Actions.resetProgressValue,
        ],
        exit: [Actions.showProgressBar, Actions.hideScrollIndicator],
        on: {
          [EE.START]: {
            target: fse.started,
          },
        },
      },
      [fse.started]: {
        entry: [Actions.allowTiemeouts],

        // A NA EXIT, PROGRES MORA DOCI DO 100,
        // I MORAS ONEMOGUCITI TIMEOUTS
        exit: [Actions.disallowTiemouts, Actions.setProgressValueTo100],
        //
        on: {
          [EE.STOP]: {
            target: fse.done,
          },
          // OVDE SE MORA OMOGUCITI POSTEPENI RAST ZA
          // progressValue, PODESAVANJEM TIMER-A
          //
          [EE.GROW_PROGRESS_VALUE]: {
            actions: [
              assign((_, e) => {
                return {
                  progressValue: e.payload.progressValue,
                };
              }),
            ],
          },
        },
      },
      [fse.done]: {
        after: {
          1000: {
            target: fse.idle,
          },
        },
      },
    },
  },
  // ACTIONS, GUARDS...
  // FOR REFERENCING

  {
    actions: {
      [Actions.resetProgressValue]: assign((_, __) => {
        return {
          progressValue: 0,
        };
      }),
      [Actions.setProgressValueTo100]: assign((_, __) => {
        return {
          progressValue: 100,
        };
      }),
      [Actions.showProgressBar]: assign((_, __) => {
        return {
          progressBarVisible: true,
        };
      }),
      [Actions.hideProgressBar]: assign((_, __) => {
        return {
          progressBarVisible: false,
        };
      }),
      [Actions.showScrollIndicator]: assign((_, __) => {
        return {
          scrollIndicatorVisible: true,
        };
      }),
      [Actions.hideScrollIndicator]: assign((_, __) => {
        return {
          scrollIndicatorVisible: false,
        };
      }),
      [Actions.allowTiemeouts]: assign((_, __) => {
        return {
          timeoutsAllowed: true,
        };
      }),
      [Actions.disallowTiemouts]: assign((_, __) => {
        return {
          timeoutsAllowed: false,
        };
      }),
    },
  }
);

export const pageLoadingProgressService = interpret(pageLoadingProgressMachine);

pageLoadingProgressService.onTransition((state, event) => {
  //
  // console.log("TRANSITION");
});
