const GITHUB_API_BASE = "https://api.github.com";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Commits updated resume JSON to data/resume.json on the GitHub repo.
 * Vercel's filesystem is read-only at runtime, so this is how the
 * "single source of truth" file actually gets updated + redeployed.
 */
export async function commitResumeData(data: unknown): Promise<void> {
  const owner = getRequiredEnv("GITHUB_REPO_OWNER");
  const repo = getRequiredEnv("GITHUB_REPO_NAME");
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = getRequiredEnv("GITHUB_TOKEN");

  const path = "data/resume.json";
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // 1. Get current file to read its sha (required for updates)
  console.log("-> [GitHub] Fetching current resume.json from GitHub...");
  let sha;
  const getRes = await fetch(`${url}?ref=${branch}`, { headers });
  if (!getRes.ok) {
    if (getRes.status !== 404) {
      const body = await getRes.text();
      throw new Error(
        `Failed to fetch current resume.json (${getRes.status}): ${body}`
      );
    }
    console.log("-> [GitHub] File not found (404). This will create a new file.");
  } else {
    const getJson = await getRes.json();
    sha = getJson.sha;
    console.log("-> [GitHub] Found existing file. SHA:", sha);
  }

  // 2. PUT the new content
  console.log("-> [GitHub] Committing updated resume.json...");
  const content = Buffer.from(
    JSON.stringify(data, null, 2),
    "utf-8"
  ).toString("base64");

  const putRes = await fetch(url, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "chore: update resume data via resume upload",
      content,
      sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const body = await putRes.text();
    throw new Error(
      `Failed to commit resume.json (${putRes.status}): ${body}`
    );
  }
}
