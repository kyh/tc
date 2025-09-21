import type { NextApiRequest, NextApiResponse } from "next";

type SearchResult = Record<string, string> & {
  label: string;
  value: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult[] | ErrorResponse>
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

  const fragmentParam = req.query.q;
  const fragment = Array.isArray(fragmentParam)
    ? fragmentParam[0]
    : fragmentParam;

  if (!fragment) {
    res.status(200).json([]);
    return;
  }

  try {
    const response = await fetch(
      `${baseUrl}/search/${encodeURIComponent(fragment)}?token=${iexToken}`,
      {
        headers: {
          "proxy-apiKey": proxyToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`IEX responded with ${response.status}`);
    }

    const data: Record<string, string>[] = await response.json();
    const formatted = data.map((d) => ({
      ...d,
      label: d.name,
      value: d.symbol,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(200).json([]);
  }
}
