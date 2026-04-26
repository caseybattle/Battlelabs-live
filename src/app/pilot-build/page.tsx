import { PilotBuildClient } from "./pilot-build-client";

type PilotBuildPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function PilotBuildPage({ searchParams }: PilotBuildPageProps) {
  const params = (await searchParams) ?? {};
  const source = getSearchParam(params.source).trim().toLowerCase() || "direct";
  return <PilotBuildClient source={source} />;
}
