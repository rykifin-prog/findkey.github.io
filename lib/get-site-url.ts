export function getSiteUrl(requestHeaders?: Headers): string {
  try {
    const vercelUrl = process.env.VERCEL_URL?.trim();

    if (vercelUrl) {
      return `https://${vercelUrl}`;
    }

    const host = requestHeaders?.get('x-forwarded-host') || requestHeaders?.get('host');

    if (host) {
      const normalizedHost = host.split(',')[0]?.trim();

      if (normalizedHost) {
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        return `${protocol}://${normalizedHost}`;
      }
    }

    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000';
    }

    return 'https://localhost:3000';
  } catch {
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://localhost:3000';
  }
}
