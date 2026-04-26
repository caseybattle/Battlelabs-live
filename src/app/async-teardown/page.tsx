import { AsyncTeardownClient } from "./async-teardown-client";

type AsyncTeardownPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getSearchParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function AsyncTeardownPage({ searchParams }: AsyncTeardownPageProps) {
  const params = (await searchParams) ?? {};
  const source = getSearchParam(params.source).trim().toLowerCase() || "direct";

  return <AsyncTeardownClient source={source} />;
}
