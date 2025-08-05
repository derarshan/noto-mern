import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import { SignedIn, SignedOut, useAuth, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-md">
      <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">

        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Noto Logo"
            className="w-10 h-10 object-contain drop-shadow-lg"
          />
          <h1 className="flex gap-1 justify-center items-center text-2xl font-bold tracking-tight text-white/90 drop-shadow-md">
            N<span className="loading loading-ring loading-md"></span>T<span className="loading loading-ring loading-md"></span>
          </h1>
        </Link>

        {/* Right: Button + User */}
        <div className="flex items-center gap-4">
          <Link
            to="/createnote"
            className="border border-primary flex items-center gap-2 px-5 py-2 bg-gradient-to-br from-zinc-900 to-black text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:from-zinc-800"
          >
            <PlusIcon className="size-5 text-white" />
            <span className="tracking-wide">New Note</span>
          </Link>

          {/* User Button from Clerk */}
          <SignedIn>
            <UserButton signOutOptions={{ redirectUrl: "/" }} />
          </SignedIn>

          <SignedOut>
            <SignInButton fallbackRedirectUrl={"/"} mode="modal">
              <button className="border border-primary px-5 py-2 bg-gradient-to-br from-zinc-900 to-black text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:from-zinc-800">
                Account
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Navbar
