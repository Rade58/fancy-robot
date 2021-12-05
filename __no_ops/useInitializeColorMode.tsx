import { useEffect, useState } from "react";

// import { setInitialColorMode } from "@/lib/color-mode";

/**
 * @description I'LL USE THIS ONLI INSIDE _app
 */
const useInitializeColorMode = () => {
  const [calledIt, setCalledIt] = useState<boolean>(false);

  // IT SHOULD BE CALLED ONCE, ONLY ON MOUNTING OF OUR APP
  useEffect(() => {
    if (calledIt) return;
    // setInitialColorMode();
    setCalledIt(true);
  }, [calledIt, setCalledIt]);
};

export default useInitializeColorMode;
