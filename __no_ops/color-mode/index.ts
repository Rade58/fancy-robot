import Cook from "js-cookie";

import isSSR from "@/util/isSSR";

// REMINDER: FOR JAVASCRIPT USE COLOR MODE HOOK, USE
// MUTATION OBSERVER FOR html ELEMENT
// AND USE MACHINE (MUTATION OBSERVER SHOULD CALL MACHINE)
// AND MACHINE SHOULD BE INITIALIZED INSIDE
// useInitializerColorMode (BELLOW OTHER LOGIC (MAYBE))
// WHEN THAT BOOLEAN CHANGES

/**
 * @description color mode enum
 */
export enum CME {
  light = "light",
  dark = "dark",
  COOKIE_KEY = "color_mode",
}
export type colorModeType = CME.dark | CME.light;

// DON'T FORGET TO USE THIS COOKIE SERVER SIDE ALSO
// (NO WE WON'T DO THIS BECAUSE XSS ATTACKS)

/**
 * @description USE THIS ONLY INSIDE React.useEffect
 * OR ANWHERE WHERE WE KNOW WE ARE NOT ON THE SERVER
 */
export const setInitialColorMode = (): colorModeType | undefined => {
  if (isSSR()) return;

  const mode = Cook.get(CME.COOKIE_KEY);
  const documentElementClasses = document.documentElement.classList;

  if (
    mode &&
    (documentElementClasses.contains(CME.dark) ||
      documentElementClasses.contains(CME.light))
  ) {
    return;
  }

  let colorModeClass: colorModeType | undefined;

  for (const item in documentElementClasses) {
    if (item === CME.dark || item === CME.light) {
      colorModeClass = item;
    }
  }

  // IF WE DON'T HAVE COLOR MODE, TAKE IT FROM THE html TAG
  if (!mode && !colorModeClass) {
    // AND IF WE DON'T HAVE COLOR MODE ON HTML
    // I THINK THIS SHOULD BE light, BECAUSE MAYBE THE DEFAULT IS LIGHT
    // colorModeClass = CME.dark;
    colorModeClass = CME.light;
    // NOW WE ARE GOING TO SET MODE BACK TO THE COOKIE
    Cook.set(CME.COOKIE_KEY, colorModeClass);
    // AND WE SHOULD ADD IT TO THE HTML ELEMENT
    document.documentElement.classList.add(colorModeClass);

    // IN THIS INSTANCE WE SETTED BOTH VALUES TO BE THE SAME
    return;
  }

  // IF ONLY WE DON'T HAVE CLASS ON HTML
  if (!colorModeClass && mode) {
    document.documentElement.classList.add(mode);
    return;
  }

  // IF MODE FROM COOKIE IS MISSING

  if (colorModeClass && !mode) {
    Cook.set(CME.COOKIE_KEY, colorModeClass);
    return;
  }

  // IF WE HAVE A MISSMACH (CLASS FROM THE HTML SHOULD HAVE THE ADVANTAGE)

  if (colorModeClass && mode) {
    if (colorModeClass !== mode) {
      // JUST CHANGE THE COOKIE
      Cook.set(CME.COOKIE_KEY, colorModeClass);
      return;
    }
  }
};

/**
 * @description TO dark MODE
 */
export const toDarkMode = () => {
  if (isSSR()) return;

  const mode = Cook.get(CME.COOKIE_KEY);
  const documentElementClasses = document.documentElement.classList;

  let colorModeClass: colorModeType | undefined;

  for (const item in documentElementClasses) {
    if (item === CME.dark || item === CME.light) {
      colorModeClass = item;
    }
  }

  // WE DON'T WANT TO CHANGE ANYTHING IF EVERYTHING IS DARK
  if (colorModeClass === CME.dark && mode === CME.dark) {
    return;
  }

  // BEST CASE SCENARIO, WE ARE IN light COLOR MODE BOTH IN
  // COOKIE NAD FROM HTML CLASS

  if (colorModeClass === CME.light && mode === CME.light) {
    Cook.set(CME.COOKIE_KEY, CME.dark);
    // HERE WE REMOVE LIGHT CLASS
    document.documentElement.classList.remove(CME.light);
    // WE ADD DARK
    document.documentElement.classList.add(CME.dark);

    // WE SWITCH TO DARK
    return;
  }

  // IF WE ARE MISSING COLOR MODE ON HTML
  if (!colorModeClass) {
    Cook.set(CME.COOKIE_KEY, CME.dark);
    document.documentElement.classList.remove(CME.light);
    document.documentElement.classList.add(CME.dark);
    return;
  }

  // SO IN ANY CASE FROM NOW ON ADVANTAGE SHOULD HAVE VALUE ON
  // html ELEMENT

  if (colorModeClass && colorModeClass === CME.dark) {
    // ONLY SET COOKIE
    Cook.set(CME.COOKIE_KEY, CME.dark);
    return;
  }

  if (colorModeClass && colorModeClass === CME.light) {
    Cook.set(CME.COOKIE_KEY, CME.dark);
    document.documentElement.classList.remove(CME.light);
    document.documentElement.classList.add(CME.dark);
    return;
  }
};

/**
 * @description TO light MODE
 */
export const toLightMode = () => {
  if (isSSR()) return;

  const mode = Cook.get(CME.COOKIE_KEY);
  const documentElementClasses = document.documentElement.classList;

  let colorModeClass: colorModeType | undefined;

  for (const item in documentElementClasses) {
    if (item === CME.dark || item === CME.light) {
      colorModeClass = item;
    }
  }

  // WE DON'T WANT TO CHANGE ANYTHING IF EVERYTHING IS LIGHT
  if (colorModeClass === CME.light && mode === CME.light) {
    return;
  }

  // BEST CASE SCENARIO
  if (mode === CME.dark && colorModeClass === CME.dark) {
    // SWITCHING TO LIGHT
    Cook.set(CME.COOKIE_KEY, CME.light);
    document.documentElement.classList.remove(CME.dark);
    document.documentElement.classList.add(CME.light);

    return;
  }

  // IF WE ARE MISSING COLOR MODE ON HTML
  if (!colorModeClass) {
    Cook.set(CME.COOKIE_KEY, CME.light);
    document.documentElement.classList.remove(CME.dark);
    document.documentElement.classList.add(CME.light);
    return;
  }

  if (colorModeClass && colorModeClass === CME.light) {
    // ONLY SET COOKIE
    Cook.set(CME.COOKIE_KEY, CME.light);
    return;
  }

  if (colorModeClass && colorModeClass === CME.dark) {
    Cook.set(CME.COOKIE_KEY, CME.light);
    document.documentElement.classList.remove(CME.dark);
    document.documentElement.classList.add(CME.light);
    return;
  }
};

/**
 * @description toggle between two modes
 */
export const toggleMode = () => {
  // LET CLASS DETERMINE WHAT MODE SHOULD BE CALLED
  if (document.documentElement.classList.contains(CME.light)) {
    toDarkMode();
  } else {
    toLightMode();
  }
};
