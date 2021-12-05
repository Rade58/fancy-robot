import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  closed = "closed",
  opened = "opened",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  // events not depending on finite state
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  dropdownFocused: boolean;
}

export type machineEventsGenericType =
  | {
      type: EE.OPEN;
    }
  | {
      type: EE.CLOSE;
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.opened;
      context: MachineContextGenericI;
    }
  | {
      value: fse.closed;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const profileDropdownMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "p_drop_machine",
  initial: fse.closed,
  context: {
    // NO OP
    dropdownFocused: false,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {
          const {  } = event.payload;

          return {

          };
        }),
      ],
    }, */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.opened]: {
      on: {
        [EE.CLOSE]: {
          target: fse.closed,
        },
      },
    },
    [fse.closed]: {
      //
      on: {
        [EE.OPEN]: {
          target: fse.opened,
        },
      },
    },
  },
});

export const profileDropdownService = interpret(profileDropdownMachine);

profileDropdownService.onTransition((state, event) => {
  // console.log("TRANSITION");
});
