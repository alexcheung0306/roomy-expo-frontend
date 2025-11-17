import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ApiError } from './client';

/**
 * Hook for API calls with loading and error states
 */
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for mutations (POST, PUT, DELETE, etc.)
 */
export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      try {
        setLoading(true);
        setError(null);
        const result = await mutationFn(variables);
        setData(result);
        return result;
      } catch (err) {
        const apiError = err instanceof ApiError ? err : new ApiError('An unknown error occurred');
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}

