import {
    createContext,
    useContext,
    useState
} from "react";
import { deleteUser } from "../api/userApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("devtrack_user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    function login(authData) {

        localStorage.setItem(
            "devtrack_token",
            authData.token
        );

        const userData = {
            userId: authData.userId,
            name: authData.name,
            email: authData.email,
            role: authData.role
        };

        localStorage.setItem(
            "devtrack_user",
            JSON.stringify(userData)
        );

        setUser(userData);
    }

    function logout() {

        localStorage.removeItem(
            "devtrack_token"
        );

        localStorage.removeItem(
            "devtrack_user"
        );

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}