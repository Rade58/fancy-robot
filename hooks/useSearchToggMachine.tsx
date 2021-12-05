/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { searchToggService } from "@/machines/search_togg_machine";

const useSearchToggMachine = () => {
  useEffect(() => {
    if (!searchToggService.initialized) {
      searchToggService.start();
    }

    return () => {
      console.log("unmounting");
      if (searchToggService.initialized) {
        searchToggService.stop();
      }
    };
  }, []);
};

export default useSearchToggMachine;
