import { useState, useEffect } from "react";
import cookie from "js-cookie";

const useSetSomeBrowserCookie = () => {
  useEffect(() => {
    cookie.set("FOOBAR", "BUTCOIN VAULT");
  }, []);
};

export default useSetSomeBrowserCookie;
