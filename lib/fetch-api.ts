type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions<TBody = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authToken?: string;
  body?: TBody;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI<TResponse, TBody = unknown>(
  url: string,
  options: FetchAPIOptions<TBody>,
): Promise<TResponse> {
  const { method, authToken, body, next } = options;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      let errorMessage = response.statusText;
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage =
          errorData.message || errorData.error || response.statusText;
      }
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          message: errorMessage,
        }),
      );
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    throw new Error('Response is not JSON');
  } catch (error) {
    console.error(`Error ${method} data to ${url}:`, error);
    throw error;
  }
}
