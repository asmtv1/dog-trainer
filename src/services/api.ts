import { ApiResponse } from '../types';
import { API_ROUTES } from '../constants';

class ApiClient {
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
      message: data.message,
    };
  }

  async get<T>(url: string) {
    return this.request<T>(url);
  }

  async post<T>(url: string, body: any) {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(url: string, body: any) {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(url: string) {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(); 