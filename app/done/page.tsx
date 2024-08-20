import ScoreComponent from "@/components/ScoreComponent"
import Link from "next/link"

const Done = () => {
  return (
    <div className="flex-center min-h-screen">
      <Link href={"/"} className="my-btn fixed top-0 left-0 z-20 m-5">Go Home</Link>
      <ScoreComponent />
    </div>
  )
}

export default Done