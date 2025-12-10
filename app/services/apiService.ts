import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        let token = await getAccessToken();

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || '';

        return new Promise((resolve, reject) => {
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

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

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || '';

        return new Promise((resolve, reject) => {
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            fetch(`${apiHost}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: headers
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    console.error('Post error:', error);
                    reject(error);
                }))
        })
    },

    postFormData: async function(url: string, formData: FormData): Promise<any> {
        console.log('post formData', url, formData);

        const token = await getAccessToken();

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || '';

        return new Promise((resolve, reject) => {
            const headers: any = {};

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

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
    },

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const apiHost = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '') || '';

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
    }
}

export default apiService;