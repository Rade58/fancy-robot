import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  closed = "closed",
  open = "open",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  TOGGLE = "TOGGLE",
  //
  SET_UPLOAD_IMAGE_URL = "SET_UPLOAD_IMAGE_URL",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  visible: boolean;
  imageUrl: string | undefined;
}

export type machineEventsGenericType =
  | {
      type: EE.TOGGLE;
    }
  | {
      type: EE.SET_UPLOAD_IMAGE_URL;
      payload: {
        url: string;
      };
    };

export type machineFiniteStatesGenericType =
  | {
      value: fse.closed;
      context: MachineContextGenericI;
    }
  | {
      value: fse.open;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const dropboxToggMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "drop-tog-mach",
  initial: fse.closed,
  context: {
    visible: false,
    imageUrl: undefined,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    [EE.SET_UPLOAD_IMAGE_URL]: {
      actions: [
        assign({
          imageUrl: (_, e) => {
            return e.payload.url;
          },
        }),
      ],
    },
  },
  // -------------------------------------------------------------------
  states: {
    [fse.closed]: {
      entry: [
        assign({
          visible: (_, __) => {
            return false;
          },
        }),
      ],
      on: {
        [EE.TOGGLE]: {
          target: fse.open,
        },
      },
    },
    [fse.open]: {
      entry: [
        assign({
          visible: (_, __) => {
            return true;
          },
        }),
      ],
      on: {
        [EE.TOGGLE]: {
          target: fse.closed,
        },
      },
    },
  },
});

export const dropboxToggService = interpret(dropboxToggMachine);

dropboxToggService.onTransition((state, event) => {
  //
  // console.log({ ctx: state.context });
  // console.log("TRANSITION");
});
