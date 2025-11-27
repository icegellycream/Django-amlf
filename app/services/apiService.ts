import { error } from "console";

const apiService = {
    get: async function (url:string): Promise<any> {
        console.log('get', url);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().catch(() => {
                        // If JSON parsing fails, return a generic error with status
                        return { non_field_errors: [`Server error: ${response.status} ${response.statusText}`] };
                    });
                }
                return response.json();
            })
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },

    post: async function(url:string, data: any): Promise<any> {
        console.log('post', url);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().catch(() => {
                        // If JSON parsing fails, return a generic error with status
                        return { non_field_errors: [`Server error: ${response.status} ${response.statusText}`] };
                    });
                }
                return response.json();
            })
            .then((json) => {
                console.log('Response', json);

                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    }
}

export default apiService;