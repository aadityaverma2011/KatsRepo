const BASE_URL = "http://localhost:8000/api";

export const apiRequest = async (endpoint, method = "GET", payload = null, getToken) => {
    try {
        const token = await getToken();
        const upperMethod = method.toUpperCase();

        const options = {
            method: upperMethod,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        // These methods usually carry a payload
        const methodsWithBody = ["POST", "PUT", "PATCH", "DELETE"];

        if (payload && methodsWithBody.includes(upperMethod)) {
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // Handle empty responses (common in DELETE or 204 No Content)
        if (response.status === 204) return null;

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API ${method} Request Failed:`, error.message);
        throw error;
    }
};