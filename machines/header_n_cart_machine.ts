// THIS IS JUST A MACHINE THAT HANDLES CART OPEN AND CART CLOSE
// MAYBE IN FUTERE WE NEED TO BUILD SUB-MACHINE FOR CART (MAYBE I AM NOT GOING TO DO THAT
// IT IS BETTER TO BUILD SEPARATE MACHINE FOR CART STATE
// OUR CART IS NOT GOING TO BE IN LOCAL STORAGE
// I STILL DIDN'T DECIDE IF OUR REDIS OR OUR POSTGRES IS GOOD CHOICE FOR THAT)
import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  header_visible = "header_visible",
  cart_visible = "cart_viible",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  TOGGLE = "TOGGLE",

  // events not depending on finite state
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  random: number;
}

export type machineEventsGenericType = /* | {
      type: EE.CHECK_CURRENT_DARK_MODE;
      payload: {
        isDark: boolean;
      };
    }
  | */ {
  type: EE.TOGGLE;
};

export type machineFiniteStatesGenericType =
  | {
      value: fse.cart_visible;
      context: MachineContextGenericI;
    }
  | {
      value: fse.header_visible;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const headerNcartMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "h_n-c_machine",
  initial: fse.header_visible,
  context: {
    random: 666,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {

          return {random:  2}
          
        }),
      ],
    }, */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.header_visible]: {
      on: {
        [EE.TOGGLE]: {
          target: fse.cart_visible,
        },
      },
    },
    [fse.cart_visible]: {
      exit: [
        () => {
          document.documentElement.classList.add("header-visible");
          document.documentElement.classList.remove("cart-visible");
        },
      ],
      entry: [
        () => {
          setTimeout(() => {
            document.documentElement.classList.remove("header-visible");
            document.documentElement.classList.add("cart-visible");
          }, 450);
        },
      ],
      on: {
        [EE.TOGGLE]: {
          target: fse.header_visible,
        },
      },
    },
  },
});

export const headerNCartService = interpret(headerNcartMachine);

headerNCartService.onTransition((state, event) => {
  //
  // console.log({ state: state.value });
  // console.log("TRANSITION");
});
