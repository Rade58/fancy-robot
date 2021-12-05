/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { cartService } from "@/machines/cart_machine";

const useCartService = () => {
  useEffect(() => {
    if (!cartService.initialized) {
      cartService.start();
    }

    return () => {
      console.log("unmounting");
      if (cartService.initialized) {
        cartService.stop();
      }
    };
  }, []);
};

export default useCartService;
