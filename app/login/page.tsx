'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../contexts";
import { useRouter } from "next/navigation";

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.push('/dashboard/agents');
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex items-center flex-col">
        <Avatar className="mb-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Button onClick={handleLogin}>Sign in with Google</Button>
      </div>
    </div>
  );
}
