const BASE_URL =
  "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/";

interface VersionInfo {
  version: string;
  url: string;
}

interface ArtifactVersions {
  recommended: VersionInfo;
  optional: VersionInfo;
  latest: VersionInfo;
  list: VersionInfo[];
}

async function fetchHtml(): Promise<string> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.text();
}

function parseVersionList(html: string): VersionInfo[] {
  const pattern = /class="panel-block[^"]*"\s+href="\.\/((\d+)-[^"]+)"/g;
  const results: VersionInfo[] = [];
  for (const m of html.matchAll(pattern)) {
    results.push({ version: m[2], url: BASE_URL + m[1] });
  }
  return results;
}

async function getVersions(): Promise<ArtifactVersions> {
  const html = await fetchHtml();

  const recText = html.match(/LATEST RECOMMENDED \((\d+)\)/);
  const optText = html.match(/LATEST OPTIONAL \((\d+)\)/);
  if (!recText) throw new Error("LATEST RECOMMENDED not found");
  if (!optText) throw new Error("LATEST OPTIONAL not found");

  const recVersion = recText[1];
  const optVersion = optText[1];

  const recHref = html.match(
    new RegExp(`href=\\s*["'](\\.\\/${recVersion}-[^"']+)["']`)
  );
  const optHref = html.match(
    new RegExp(`href=\\s*["'](\\.\\/${optVersion}-[^"']+)["']`)
  );
  if (!recHref) throw new Error(`URL for RECOMMENDED (${recVersion}) not found`);
  if (!optHref) throw new Error(`URL for OPTIONAL (${optVersion}) not found`);

  const list = parseVersionList(html);
  if (list.length === 0) throw new Error("No builds found in list");

  const toAbsolute = (rel: string) =>
    BASE_URL + rel.replace(/^\.\//, "");

  return {
    recommended: { version: recVersion, url: toAbsolute(recHref[1]) },
    optional: { version: optVersion, url: toAbsolute(optHref[1]) },
    latest: list[0],
    list,
  };
}

async function getVersionUrl(version: string): Promise<string> {
  const html = await fetchHtml();
  const m = html.match(
    new RegExp(`class="panel-block[^"]*"\\s+href="\\./((${version})-[^"]+)"`)
  );
  if (!m) throw new Error(`Version ${version} not found`);
  return BASE_URL + m[1];
}

const arg = process.argv[2] as "recommended" | "optional" | "latest" | "list" | string | undefined;
const namedArgs = ["recommended", "optional", "latest", "list"];

if (!arg) {
  const versions = await getVersions();
  console.log(`LATEST RECOMMENDED : ${versions.recommended.version}`);
  console.log(`  ${versions.recommended.url}`);
  console.log(`LATEST OPTIONAL    : ${versions.optional.version}`);
  console.log(`  ${versions.optional.url}`);
  console.log(`Latest in list     : ${versions.latest.version}`);
  console.log(`  ${versions.latest.url}`);
} else if (arg === "list") {
  const versions = await getVersions();
  for (const v of versions.list) {
    console.log(`${v.version}  ${v.url}`);
  }
} else if (namedArgs.includes(arg)) {
  const versions = await getVersions();
  console.log(versions[arg as "recommended" | "optional" | "latest"].url);
} else if (/^\d+$/.test(arg)) {
  const url = await getVersionUrl(arg);
  console.log(url);
} else {
  console.error(`Usage: artifact-version.ts [recommended|optional|latest|list|<version>]`);
  process.exit(1);
}
