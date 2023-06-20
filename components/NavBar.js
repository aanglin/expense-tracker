"use client";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";

export default function NavBar() {
  const { logout, loading, user } = useContext(authContext);
  return (
    <header className="container  px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        {user && !loading && (
          <div className="flex items-center gap-2 m-2 ">
            {/* profile pic */}
            <div className="h-[60px] w-[60px] rounded-full overflow-hidden">
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* name */}
            <small>Hi, {user.displayName}!</small>
          </div>
        )}

        {/* logout button */}
        {user && !loading && (
          <nav className="pr-4">
            <button onClick={logout} className="btn btn-danger">
              {" "}
              Logout{" "}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
