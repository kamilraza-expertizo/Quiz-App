import ScoreComponent from "@/components/ScoreComponent"
import Link from "next/link"
import { BiHome } from "react-icons/bi"

const Done:React.FC = () => {
  return (
    <div className="flex-center min-h-screen">
      <Link href={"/"} className="my-btn fixed top-0 left-0 z-20 m-5"><BiHome className="text-xl"/></Link>
      <ScoreComponent />
    </div>
  )
}

export default Done