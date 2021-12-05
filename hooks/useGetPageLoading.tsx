import { useEffect } from "react";
import { useRouter } from "next/router";
import { useActor } from "@xstate/react";
import {
  pageLoadingProgressService,
  EE,
  fse,
} from "@/machines/page_loading_progress_machine";

const usePageLoadingService = () => {
  const router = useRouter();
  const [state, dispatch] = useActor(pageLoadingProgressService);

  const { context } = state;

  // EVENT LISTENERS FOR ROUTE CHANGING
  useEffect(() => {
    if (!dispatch) return;

    if (router) {
      const onRouteChangeStart = () => {
        // console.log("ROUTE CHANGE START")
        dispatch({
          type: EE.START,
        });
      };
      const onRouteChangeComplete = () => {
        dispatch({
          type: EE.STOP,
        });
      };
      const onRouteChangeError = () => {
        dispatch({
          type: EE.STOP,
        });
      };

      router.events.on("routeChangeStart", onRouteChangeStart);
      router.events.on("routeChangeComplete", onRouteChangeComplete);
      router.events.on("routeChangeError", onRouteChangeError);

      return () => {
        router.events.off("routeChangeStart", onRouteChangeStart);
        router.events.off("routeChangeComplete", onRouteChangeComplete);
        router.events.off("routeChangeError", onRouteChangeError);
      };
    }
  }, [router, dispatch]);

  // GROWING VALUE OF PROGRESS
  useEffect(() => {
    if (context && context.timeoutsAllowed) {
      let timeoutId: NodeJS.Timeout;

      let step = 10;

      const { progressValue: val } = context;

      if (val < 10) {
        step = step;
      } else if (val < 20) {
        step = step - 2;
      } else if (val < 30) {
        step = step - 3;
      } else if (val < 40) {
        step = step - 4;
      } else if (val < 50) {
        step = step - 5;
      } else if (val < 60) {
        step = step - 6;
      } else if (val < 70) {
        step = step - 7;
      } else if (val < 80) {
        step = step - 8;
      } else {
        step = step - 9;
      }

      if (val < 98) {
        timeoutId = setTimeout(() => {
          dispatch({
            type: EE.GROW_PROGRESS_VALUE,
            payload: {
              progressValue: val + step >= 100 ? 100 : val + step,
            },
          });
        }, 500);
      }

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [context, dispatch]);

  return { state, dispatch };
};

export default usePageLoadingService;
