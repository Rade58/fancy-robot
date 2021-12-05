// import { toDarkMode, toLightMode, toggleMode } from "@/lib/color-mode";
// import type { colorModeType } from "@/lib/color-mode";

const useColorModeSwitcher = () => {
  enum T {
    dark = "dark",
    light = "light",
  }

  const toggleDark = () => {
    // toDarkMode();
  };

  const toggleLight = () => {
    // toLightMode();
  };

  const toggle = () => {
    // toggleMode();
  };

  return { toggle, toggleDark, toggleLight };
};

export default useColorModeSwitcher;
