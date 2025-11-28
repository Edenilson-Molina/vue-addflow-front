import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

export const useSessionStore = defineStore('app', () => {
    // State
    const loading = ref(false);
    const accessToken = ref(null);
    const user = ref({
        id: null,
        name: '',
        email: '',
        roles: [],
        permissions: []
    });

    // Actions
    function setAuthData(payload) {
        if (!payload.accessToken) return
        accessToken.value = payload.accessToken;
        const tokenDecode = jwtDecode(accessToken.value);
        user.value = {
            id: tokenDecode.id,
            name: tokenDecode.name,
            email: tokenDecode.email,
            roles: tokenDecode.roles || [],
            permissions: tokenDecode.permissions || []
        };
    }

    return {
        loading,
        accessToken,
        user,
        setAuthData
    };
},
{
    persist: {
        key: 'session-store',
        storage: localStorage
    }
});