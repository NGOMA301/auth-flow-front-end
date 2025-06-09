
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

class AuthService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      credentials: 'include' as const,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  async login(identifier: string, password: string) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
  }

  async register(email: string, username: string, password: string, profileImage: File) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profile', profileImage);

    return this.makeRequest('/auth/register', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async logout() {
    return this.makeRequest('/auth/logout', {
      method: 'GET',
    });
  }

  async getProfile() {
    return this.makeRequest('/auth/me', {
      method: 'GET',
    });
  }

  async refreshToken() {
    return this.makeRequest('/auth/refresh-token', {
      method: 'GET',
    });
  }

  async getSessions() {
    return this.makeRequest('/sessions', {
      method: 'GET',
    });
  }

  async logoutSession(sessionId: string) {
    return this.makeRequest(`/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  }
}

export const authService = new AuthService();
