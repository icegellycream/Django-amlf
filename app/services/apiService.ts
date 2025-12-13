import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        let token = await getAccessToken();
        
        // Fallback to localStorage if server action returns null
        if (!token && typeof window !== 'undefined') {
            token = localStorage.getItem('access_token');
        }
        console.log('Token:', token);

        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || 'http://localhost:8000';

        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || 'http://localhost:8000';

        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || 'http://localhost:8000';

        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    postFormData: async function(url: string, formData: FormData): Promise<any> {
        console.log('postFormData', url, formData);

        let token = await getAccessToken();
        
        // Fallback to localStorage if server action returns null
        if (!token && typeof window !== 'undefined') {
            token = localStorage.getItem('access_token');
        }

        const headers: any = {
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || 'http://localhost:8000';

        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`, {
                method: 'POST',
                body: formData,
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;