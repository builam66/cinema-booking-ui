import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface MutationResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (body?: unknown) => Promise<void>;
}

// Mock API for demonstration
const mockApi = async (url: string, options?: RequestInit): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock API responses
  if (url === '/api/example') {
    return { 
      message: 'Data fetched successfully',
      timestamp: new Date().toISOString()
    };
  }
  
  // For other routes
  return { 
    url, 
    method: options?.method || 'GET',
    success: true 
  };
};

// Data fetching hook
export function useQuery<T = any>(url: string): ApiResponse<T> {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const data = await mockApi(url);
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

// Data mutation hook
export function useMutation<T = any>(url: string, method = 'POST'): MutationResponse<T> {
  const [state, setState] = useState<Omit<MutationResponse<T>, 'mutate'>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (body?: unknown) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const data = await mockApi(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  };

  return { ...state, mutate };
}

// Real API implementation (commented out as we're using mock API for demo)
/*
const fetchApi = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
};
*/
