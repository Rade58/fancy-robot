/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { hamburgerService } from "@/machines/hamburger_machine";

const useHamburgerMachine = () => {
  useEffect(() => {
    if (!hamburgerService.initialized) {
      hamburgerService.start();
    }

    return () => {
      console.log("unmounting");
      if (hamburgerService.initialized) {
        hamburgerService.stop();
      }
    };
  }, []);
};

export default useHamburgerMachine;
