/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { orderService } from "@/machines/order_machine";

const useCartService = () => {
  useEffect(() => {
    if (!orderService.initialized) {
      orderService.start();
    }

    return () => {
      console.log("unmounting");
      if (orderService.initialized) {
        orderService.stop();
      }
    };
  }, []);
};

export default useCartService;
