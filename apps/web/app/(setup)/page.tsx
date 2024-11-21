import { Navbar } from "@/components/custome-ui/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="h-full w-full flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold mb-6">Cloud IDE</h1>
        <p className="text-xl mb-8">
          Develop anywhere, anytime. Your code, in the cloud.
        </p>
        <div className="space-x-4">
          <SignInButton>Get Started</SignInButton>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </>
  );
}
