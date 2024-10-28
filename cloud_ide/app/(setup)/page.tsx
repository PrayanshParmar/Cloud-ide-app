import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">Cloud IDE</h1>
      <p className="text-xl mb-8">
        Develop anywhere, anytime. Your code, in the cloud.
      </p>
      <div className="space-x-4">
        <SignInButton>Get Started</SignInButton>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
