const BASE_URL = import.meta.env.BASE_URL;
const BASE_PREFIX = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

function ensureLeadingSlash(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function stripTrailingSlash(path: string) {
  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
}

export function withBase(path = '/') {
  const normalizedPath = ensureLeadingSlash(path);

  if (!BASE_PREFIX) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? `${BASE_PREFIX}/` : `${BASE_PREFIX}${normalizedPath}`;
}

export function normalizePathname(pathname: string) {
  const [pathOnly] = pathname.split(/[?#]/, 1);
  let normalizedPath = ensureLeadingSlash(pathOnly || '/');

  if (BASE_PREFIX) {
    if (normalizedPath === BASE_PREFIX) {
      normalizedPath = '/';
    } else if (normalizedPath.startsWith(`${BASE_PREFIX}/`)) {
      normalizedPath = normalizedPath.slice(BASE_PREFIX.length);
    }
  }

  return stripTrailingSlash(normalizedPath || '/');
}

export function getHomePath() {
  return withBase('/');
}

export function getArchivePath() {
  return withBase('/archive');
}

export function getTagIndexPath() {
  return withBase('/tags');
}

export function getTagPath(tag: string) {
  return withBase(`/tags/${encodeURIComponent(tag)}`);
}

export function getAboutPath() {
  return withBase('/about');
}

export function getPostPath(slug: string) {
  return withBase(`/posts/${slug}`);
}

export function getFaviconPath() {
  return withBase('/icons/favicon.ico');
}

export function getPagefindAssetPath(assetName: string) {
  return withBase(`/pagefind/${assetName}`);
}
