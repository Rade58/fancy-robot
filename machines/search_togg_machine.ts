import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  open = "open",
  closed = "closed",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  TOGGLE = "TOGGLE",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  open: boolean;
}

export type machineEventsGenericType = {
  type: EE.TOGGLE;
};

export type machineFiniteStatesGenericType =
  | {
      value: fse.open;
      context: MachineContextGenericI;
    }
  | {
      value: fse.closed;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const searchToggMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.closed,
  context: {
    open: false,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.]: {
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
    [fse.open]: {
      entry: [assign({ open: (_, __) => true })],
      on: {
        [EE.TOGGLE]: {
          target: fse.closed,
        },
      },
    },
    [fse.closed]: {
      entry: [assign({ open: (_, __) => false })],
      on: {
        [EE.TOGGLE]: {
          target: fse.open,
        },
      },
    },
  },
});

export const searchToggService = interpret(searchToggMachine);

searchToggService.onTransition((state, event) => {
  //
  // console.log({ isDarkMode: state.context. });
  // console.log("TRANSITION");
});
