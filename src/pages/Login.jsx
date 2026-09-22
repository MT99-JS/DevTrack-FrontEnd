import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);
            setError("");

            const data =
                await loginApi({
                    email,
                    password
                });

            login(data);

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-brand">
                    <div className="auth-logo">
                        D
                    </div>

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to your DevTrack workspace
                    </p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create one
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;