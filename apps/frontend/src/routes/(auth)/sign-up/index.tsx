import { createFileRoute } from "@tanstack/react-router";

import { Header } from "./@components/header";
import { Footer } from "./@components/footer";
import { SignUpForm } from "./@components/form";

export const Route = createFileRoute("/(auth)/sign-up/")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex items-center flex-1 justify-center px-4">
        <SignUpForm />
      </main>
      <Footer />
    </div>
  );
}
