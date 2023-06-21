import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Button>
        <Link href="/dashboard/agents">Go to dashboard</Link>
      </Button>
    </div>
  )
}
