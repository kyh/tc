import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request, context }) => {
  const baseUrl = context.IEX_URL;
  const token = context.IEX_PUBLISHABLE_KEY;

  const url = new URL(request.url);
  const fragment = url.searchParams.get("q");
  const response = await fetch(`${baseUrl}/search/${fragment}?token=${token}`);
  const data: any[] = await response.json();

  const formatted = data
    .filter((d) => !!d.iexId)
    .map((d) => ({ ...d, label: d.name, value: d.iexId }));

  return json(formatted);
};
