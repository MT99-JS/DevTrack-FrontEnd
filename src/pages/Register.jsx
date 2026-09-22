import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register as registerApi }
    from "../api/AuthApi";

import { useAuth }
    from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data =
                await registerApi({
                    name,
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

                    <h1>Create your account</h1>

                    <p>
                        Start managing your projects with DevTrack
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

                    <label>Full name</label>

                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={e =>
                            setName(e.target.value)
                        }
                        required
                    />

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
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={e =>
                            setPassword(e.target.value)
                        }
                        minLength={8}
                        required
                    />

                    <label>Confirm password</label>

                    <input
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={e =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;