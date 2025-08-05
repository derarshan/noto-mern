import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignIn mode="modal" />
        </div>
      </SignedOut>
    </>
  );
}

export default ProtectedRoute