import { createMachine, assign, interpret } from "xstate";

// TODO
//
//
//
// TRY CORRECTING TYPES AND DO ACORDING TO THAT
//
//
//
//

import type { PropsI } from "@/pages/order/[orderId]";

/**
 * @description finite states enum
 */
export enum fse {
  idle = "idle",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  GIVE_NEW_ORDER = "GIVE_NEW_ORDER",
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  updatedOrderRefetched: boolean;
  refetchedOrderAndPaymentRecord: PropsI | null;
}

export type machineEventsGenericType = {
  type: EE.GIVE_NEW_ORDER;
  payload: PropsI;
};
/* | {
      type: EE.PLACEHOLDING_ONE;
      payload: {
        placeholder: number;
      };
    } */

export type machineFiniteStatesGenericType = {
  value: fse.idle;
  context: MachineContextGenericI;
};
/* | {
      value: fse.non_idle;
      context: MachineContextGenericI;
    }; */

// -----------------  MACHINE --------------------

const orderMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "order_machine",
  initial: fse.idle,
  context: {
    updatedOrderRefetched: false,
    refetchedOrderAndPaymentRecord: null,
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
    [fse.idle]: {
      on: {
        [EE.GIVE_NEW_ORDER]: {
          actions: [
            assign({
              refetchedOrderAndPaymentRecord: (_, ev) => {
                return ev.payload;
              },
            }),
            assign({
              updatedOrderRefetched: (ctx, e) => {
                return true;
              },
            }),
          ],
        },
      },
    },
  },
});

export const orderService = interpret(orderMachine);

orderService.onTransition((state, event) => {
  //
});
