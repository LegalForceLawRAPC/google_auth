import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import ConnectEmail from "./components/ConnectEmail";

export default async function Home() {
  const {getToken, } = await auth()
  
  return (
    <div className="h-[100vh] w-full flex flex-col gap-5 justify-center items-center">
    <ConnectEmail />
    </div>)
}
