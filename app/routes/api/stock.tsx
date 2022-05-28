import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request, context }) => {
  const baseUrl = context.env.IEX_URL;
  const iexToken = context.env.IEX_PUBLISHABLE_KEY;
  const proxyToken = context.env.PROXY_API_KEY;

  const url = new URL(request.url);
  const fragment = url.searchParams.get("s");

  if (!fragment) return json([]);

  const queries = fragment.split(",");
  const promises = queries.map((q) =>
    fetch(`${baseUrl}/stock/${q}/advanced-stats?token=${iexToken}`, {
      headers: { "proxy-apiKey": proxyToken },
    })
      .then((r) => r.json())
      .catch(() => ({}))
  );

  const data: unknown[] = await Promise.all(promises);

  return json(data);
};
