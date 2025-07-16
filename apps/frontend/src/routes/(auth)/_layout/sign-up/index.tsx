import { createFileRoute } from "@tanstack/react-router";

import { Header } from "./@components/header";
import { Footer } from "@/components/footer";
import { SignUpForm } from "./@components/form";
import { useSignUp } from "@/hooks/mutations/auth";

export const Route = createFileRoute("/(auth)/_layout/sign-up/")({
  component: SignUpPage,
});

function SignUpPage() {
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp();

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex items-center flex-1 justify-center px-4">
        <SignUpForm
          onSubmit={(data) => {
            signUp({
              name: data.name,
              email: data.email,
              password: data.password,
            });
          }}
          isPending={isSignUpPending}
        />
      </main>
      <Footer />
    </div>
  );
}
