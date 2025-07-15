import { createFileRoute } from "@tanstack/react-router";

import { Header } from "./@components/header";
import { Footer } from "./@components/footer";
import { SignInForm } from "./@components/form";

export const Route = createFileRoute("/(auth)/sign-in/")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex items-center flex-1 justify-center px-4">
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}
