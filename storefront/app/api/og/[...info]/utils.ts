/**
 * Generates the endpoint URL for an Open Graph (OG) image.
 *
 * @param {string | string[]} args.handle - The handle or pathname used to fetch the resource.
 * @param {string} args.countryCode - The country code of the resource.
 * @param {string} args.type - The type of the OG image.
 * @returns The full URL to the OG image endpoint.
//  */
export const generateOgEndpoint = ({
  countryCode,
  handle,
  type,
}: {
  countryCode: string;
  handle: string | string[];
  type: string;
}) =>
  new URL(
    [
      // TODO: replace this by config.baseUrl
      "http://localhost:3000",
      "api/og",
      countryCode,
      type,
      Array.isArray(handle) ? handle.join("/") : handle,
    ].join("/"),
  ).toString();
