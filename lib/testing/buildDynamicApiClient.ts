// import supertest from "supertest";
import buildDynamicRoute from "./util/buildDynamicRoute";
import { testClient } from "./apiClient";
import type {
  /* NextApiHandler, */ NextApiRequest,
  NextApiResponse,
} from "next";

// type OptionType = supertest.SuperTest<supertest.Test>;

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => any | void;

/**
 *
 * @param bracketedPath "/foo/[bar]/foo" or "/foo/[bar]"
 */
export const buildDynamicClient = (
  bracketedPath: string,
  handler: HandlerType
) => {
  /**
   * * @param pathItem string to be passed into [bar]
   * * @param methodOrOption usually --> get post put delete ...
   */
  return async (
    pathItem: string,
    method: "get" | "put" | "post" | "delete" | "patch",
    body?: Record<string, any>,
    headers?: Record<string, string>
  ) => {
    const values = buildDynamicRoute(bracketedPath, pathItem);

    // NOW WE CALL apiClient

    if (method === "get" || method === "delete") {
      if (headers) {
        const client = testClient(handler, values.bracketedName, values.val);

        return client[method](values.parsedRoute).set(headers);
      }

      const client = testClient(handler, values.bracketedName, values.val);

      return client[method](values.parsedRoute);
    }

    if (headers) {
      const client = testClient(handler, values.bracketedName, values.val);

      return client[method](values.parsedRoute).set(headers).send(body);
    }

    const client = testClient(handler, values.bracketedName, values.val);

    // client.post("");

    return client[method](values.parsedRoute).send(body);
  };
};
