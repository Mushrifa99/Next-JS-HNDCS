export type LoggedInUser = {
    id?: string;
    name?: string;
    email?: string;
}

const USER_STORAGE_KEY = "loggedInUser";

// Save user
export function saveLoggedInUser(userData: LoggedInUser) {
    if (typeof window === "undefined") return;

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
}

// get user
export function getLoggedInUser(): LoggedInUser | null {
    if (typeof window === "undefined") return null;

    const userData = localStorage.getItem(USER_STORAGE_KEY);

    if (!userData) return null;

    try {
        return JSON.parse(userData) as LoggedInUser;
    } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
    }
}

export function removeUser() {
    if (typeof window === "undefined") return null;

    localStorage.removeItem(USER_STORAGE_KEY);
}