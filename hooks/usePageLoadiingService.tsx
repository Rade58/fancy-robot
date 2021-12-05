/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useEffect } from "react";
import { pageLoadingProgressService } from "@/machines/page_loading_progress_machine";

const usePageLoadingService = () => {
  useEffect(() => {
    if (!pageLoadingProgressService.initialized) {
      pageLoadingProgressService.start();
    }

    return () => {
      console.log("unmounting");
      if (pageLoadingProgressService.initialized) {
        pageLoadingProgressService.stop();
      }
    };
  }, []);
};

export default usePageLoadingService;
