import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export function AccountComponent() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="mt-1.5 focus:outline-none">
                <img src="/img/avatar_default.webp" alt="Avatar" className="h-8 w-8" />
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-blue-900 rounded-md shadow-lg transition-transform transform origin-top-right scale-95 text-white z-10">
                    {isAuthenticated ? (
                        <>
                            <p className="mb-2 px-4 pt-2 text-sm font-semibold">{user.name}</p>
                            <button
                                onClick={() => logout({ returnTo: window.location.origin })}
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={loginWithRedirect}
                            className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 rounded-md"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
