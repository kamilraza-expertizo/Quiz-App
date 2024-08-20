import UsernameForm from "@/components/UsernameForm"
import Image from "next/image"

const Home = () => {
  return (
    <main className="flex-center min-h-screen">
      <div className="flex-center flex-col">
        <Image height={200} width={200} src={"/Expertizo-logo.png"} alt="Expertizo Quiz App" />
        <h1 className="text-2xl font-bold">Welcome, to Quiz App</h1>
        <UsernameForm />
      </div>
    </main>
  )
}

export default Home
