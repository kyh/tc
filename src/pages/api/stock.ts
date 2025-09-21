import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown[] | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const baseUrl = process.env.IEX_URL;
  const iexToken = process.env.IEX_PUBLISHABLE_KEY;
  const proxyToken = process.env.PROXY_API_KEY;

  if (!baseUrl || !iexToken || !proxyToken) {
    res.status(500).json({ error: "Missing IEX configuration" });
    return;
  }

  const fragmentParam = req.query.s;
  const fragment = Array.isArray(fragmentParam)
    ? fragmentParam[0]
    : fragmentParam;

  if (!fragment) {
    res.status(200).json([]);
    return;
  }

  const queries = fragment.split(",").filter(Boolean);

  try {
    const promises = queries.map(async (q) => {
      try {
        const response = await fetch(
          `${baseUrl}/stock/${encodeURIComponent(q)}/advanced-stats?token=${iexToken}`,
          {
            headers: {
              "proxy-apiKey": proxyToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`IEX responded with ${response.status}`);
        }

        return response.json();
      } catch (error) {
        console.error(error);
        return {};
      }
    });

    const data = await Promise.all(promises);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(200).json([]);
  }
}
