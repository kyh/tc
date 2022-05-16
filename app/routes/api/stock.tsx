import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request, context }) => {
  const baseUrl = context.IEX_URL;
  const token = context.IEX_PUBLISHABLE_KEY;

  const url = new URL(request.url);
  const fragment = url.searchParams.get("s");

  if (!fragment) return json([]);

  const queries = fragment.split(",");
  const promises = queries.map((q) =>
    fetch(`${baseUrl}/stock/${q}/advanced-stats?token=${token}`)
      .then((r) => r.json())
      .catch(() => ({}))
  );

  const data: any[] = await Promise.all(promises);

  return json(data);
};
