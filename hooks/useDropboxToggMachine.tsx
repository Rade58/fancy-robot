/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { dropboxToggService } from "@/machines/dropbox_togg_machine";

const useCartService = () => {
  useEffect(() => {
    if (!dropboxToggService.initialized) {
      dropboxToggService.start();
    }

    return () => {
      console.log("unmounting");
      if (dropboxToggService.initialized) {
        dropboxToggService.stop();
      }
    };
  }, []);
};

export default useCartService;
