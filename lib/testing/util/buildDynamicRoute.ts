/**
 *
 * @param routeWithBracket "/foo/[bar]/foo" or "/foo/[bar]"
 * @param valueToBePassedToBracket string to be passed as [bar]
 */
const buildDynamicRoute = (
  routeWithBracket: string,
  valueToBePassedToBracket: string
) => {
  if (!routeWithBracket.startsWith("/")) {
    throw new Error("route needs to start with a '/'");
  }
  if (routeWithBracket.endsWith("/")) {
    throw new Error("route cant end with '/'");
  }

  const routeArr = routeWithBracket.split("/");

  let indexOfBracketed: number | null = null;

  let err = false;

  let bracketedName = "";

  routeArr.forEach((item, i) => {
    if (item.startsWith("[")) {
      indexOfBracketed = i;
      const itemNamePart = item.slice(1, item.length);
      const itemNamePartArr = itemNamePart.split("");
      itemNamePartArr.pop();

      bracketedName = itemNamePartArr.join("");
      if (!item.endsWith("]")) {
        err = true;
      }
    }
  });

  if (indexOfBracketed === null) {
    throw new Error("invalid template");
  }

  if (err) {
    throw new Error("invalid path template");
  }

  const newArr = routeArr.concat([]);

  newArr[indexOfBracketed] = valueToBePassedToBracket;

  const builtRoute = newArr.join("/");

  // console.log({ builtRoute, routeWithBracket });

  return {
    parsedRoute: builtRoute,
    bracketedName,
    val: valueToBePassedToBracket,
  };
};

export default buildDynamicRoute;
