import Image from "next/image";
import Aaron from "../public/aaron.jpeg";

export default function NavBar() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-2 m-2">
          {/* profile pic */}
          <div className="h-[60px] w-[60px] rounded-full overflow-hidden">
            <Image
              src={Aaron}
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* name */}
          <small>Hi, Aaron!</small>
        </div>
        {/* logout button */}
        <nav className="pr-4">
          <button className="btn btn-danger"> Logout </button>
        </nav>
      </div>
    </header>
  );
}
