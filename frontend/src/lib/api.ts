export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${path}`;
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Mematikan cache sementara agar update langsung terlihat
      ...options,
    };

    // Build URL params string without using qs library to avoid extra dependencies
    // For simple cases URLSearchParams is fine. For complex filtering, we can stringify nested objects manually.
    // In Strapi v5, filtering syntax is like filters[slug][$eq]=value. URLSearchParams handles simple objects but not nested cleanly.
    // Let's implement a simple nested to flat params converter for basic Strapi usage.
    let queryString = '';
    if (Object.keys(urlParamsObject).length > 0) {
      const params = new URLSearchParams();
      const flattenParams = (obj: any, prefix = '') => {
        Object.keys(obj).forEach(key => {
          const propName = prefix ? `${prefix}[${key}]` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenParams(obj[key], propName);
          } else {
            params.append(propName, obj[key]);
          }
        });
      };
      flattenParams(urlParamsObject);
      queryString = params.toString();
    }

    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Error fetching from API (${requestUrl}): ${response.statusText}`);
      return { data: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Strapi API Error:`, error);
    return { data: null };
  }
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${getStrapiURL()}${url}`;
}
