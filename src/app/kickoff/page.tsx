import { normalizeOffer } from "@/lib/payment-flow";
import { KickoffClient } from "./kickoff-client";

type KickoffPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getSearchParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function KickoffPage({ searchParams }: KickoffPageProps) {
  const params = (await searchParams) ?? {};
  const offer = normalizeOffer(getSearchParam(params.offer));

  return <KickoffClient offer={offer} />;
}
