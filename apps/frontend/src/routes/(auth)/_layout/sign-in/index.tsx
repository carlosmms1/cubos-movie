import { createFileRoute } from "@tanstack/react-router";

import { Header } from "./@components/header";
import { Footer } from "@/components/footer";
import { SignInForm } from "./@components/form";
import { useSignIn } from "@/hooks/mutations/auth";

export const Route = createFileRoute("/(auth)/_layout/sign-in/")({
  component: SignInPage,
});

function SignInPage() {
  const { mutate: signIn, isPending: isSignInPending } = useSignIn();

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex items-center flex-1 justify-center px-4">
        <SignInForm onSubmit={signIn} isPending={isSignInPending} />
      </main>
      <Footer />
    </div>
  );
}
