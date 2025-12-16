import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

export const useSessionStore = defineStore('app', () => {
    // State
    const loading = ref(false);
    const flagSidebar = ref(false);
    const accessToken = ref('');
    const user = ref({
        id: null,
        name: '',
        email: '',
        roles: [],
        permissions: []
    });

    // Getters
    const isAuthenticated = computed(() => !tokenIsExpired());

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

    function setFlagSidebar() {
        flagSidebar.value = !flagSidebar.value;
    }

    function tokenIsExpired() {
        try {
            if (!accessToken.value) return true;
            const tokenDecode = jwtDecode(accessToken.value);
            const expiry = tokenDecode.exp * 1000; 
            const now = Date.now();
            return now >= expiry;
        } catch (error) {
            return true;
        }
    }

    return {
        loading,
        flagSidebar,
        accessToken,
        user,
        isAuthenticated,
        setAuthData,
        setFlagSidebar
    };
},
{
    persist: {
        key: 'session-store',
        storage: localStorage
    }
});