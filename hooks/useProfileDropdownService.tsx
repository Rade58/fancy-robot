/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { profileDropdownService } from "@/machines/profile_dropdown_machine";

const useCartService = () => {
  useEffect(() => {
    if (!profileDropdownService.initialized) {
      profileDropdownService.start();
    }

    return () => {
      console.log("unmounting");
      if (profileDropdownService.initialized) {
        profileDropdownService.stop();
      }
    };
  }, []);
};

export default useCartService;
