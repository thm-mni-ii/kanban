export const apiUrl = import.meta.env.VITE_APP_API_URL;

export class ApiService {
    protected static fetchApi(url: string, init?: RequestInit): Promise<Response> {
        url = apiUrl + url
        return fetch(url, init);
    }

    protected static async fetchApiJson(url: string, init?: RequestInit): Promise<any> {
        const res = await ApiService.fetchApi(url, init);
        if (res.status < 200 && res.status >= 300) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    }

    protected static postApiJson(url: string, body: any, method: 'POST' | 'PUT' = 'POST') {
        return ApiService.fetchApiJson(url, {method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
    }
}
