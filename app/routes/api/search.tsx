import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request, context }) => {
  const baseUrl = context.env.IEX_URL;
  const iexToken = context.env.IEX_PUBLISHABLE_KEY;
  const proxyToken = context.env.PROXY_API_KEY;

  const url = new URL(request.url);
  const fragment = url.searchParams.get("q");

  if (!fragment) return json([]);

  const response = await fetch(
    `${baseUrl}/search/${fragment}?token=${iexToken}`,
    {
      headers: { "proxy-apiKey": proxyToken },
    }
  );
  const data: Record<string, string>[] = await response.json();

  const formatted = data.map((d) => ({ ...d, label: d.name, value: d.symbol }));

  return json(formatted);
};
