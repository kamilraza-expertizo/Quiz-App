import Skeleton from "./Skeleton"

const AnswersSkeleton:React.FC = () => {
  return (
    <div className="flex-center">
        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5">
        {Array.from({length: 4}).map((_, index)=>(
            <div key={index} className="relative w-full h-10">
            <Skeleton />
            </div>
        ))}
        </div>
    </div>  
  )
}

export default AnswersSkeleton