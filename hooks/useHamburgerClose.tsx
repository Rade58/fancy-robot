import { useActor } from "@xstate/react";

import { EE, hamburgerService, fse } from "@/machines/hamburger_machine";

import isSSR from "@/util/isSSR";

const useHamburgerClose = () => {
  const [ham, dispatch] = useActor(hamburgerService);

  const handleHamburgerClose = () => {
    if (isSSR()) return;
    //

    setTimeout(() => {
      if (ham.value === fse.open) {
        dispatch({
          type: EE.CLOSE,
        });
      }

      if (ham.value === fse.closed) {
        dispatch({
          type: EE.OPEN,
        });
      }
    }, 166);
  };

  return {
    handleHamburgerClose,
  };
};

export default useHamburgerClose;
