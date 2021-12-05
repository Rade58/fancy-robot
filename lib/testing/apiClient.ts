import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import type {
  /* NextApiHandler, */ NextApiRequest,
  NextApiResponse,
} from "next";
import supertest from "supertest";

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => any | void;

/**
 *
 * @param handler Your handler you created with next-connect
 * @param queryParameterName dynamic part of the route (optional (omit this for static paths))
 * @param queryParameterNameValue value dynamic part of the route (optional (omit this for static paths))
 * @returns client you can use to test result of your request
 * @description !!!! IMPORTANT !!!! For dynamic routes you must
 * do like this
 * `
 *  await tetstClient(handler, queryParameterName, queryParameterValue)
 *      this is important
 *                         .get(`/api/some/${queryPatrameterValue}`)
 *
 *        SO YOU NEED TO PASS PARAMETER ON TWO DIFFERENT PLACES
 *        WHEN WE CREATE CLIENT AND WE USE get post put delete
 *        AND SIMILAR
 * `
 */
export const testClient = (
  handler: HandlerType,
  queryParamName?: string,
  queryParamNameValue?: string
) => {
  const serverRequestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    // console.log({ REQUEST: req });

    // eslint-disable-next-line
    // @ts-ignore
    return apiResolver(
      req,
      res,
      queryParamName && queryParamNameValue
        ? { [queryParamName]: queryParamNameValue }
        : undefined,
      handler,
      // eslint-disable-next-line
      // @ts-ignore
      {},
      /* {previewModeEncryptionKey: "", previewModeId: "", previewModeSigningKey: ""} */
      undefined
    );
  };

  const server = createServer(serverRequestListener);

  return supertest(server);
};
