"use client"
import LoginForm from "@/components/LoginForm";
import LoginIllustration from "@/components/LoginIllustration";
import { getLoggedInUser } from "@/lib/auth";
import { LoaderCircle } from "lucide-react";
import { Metadata } from "next"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export const metadata: Metadata = { title: "Login - Upbright" };

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getLoggedInUser();

    if (user?.id || user?.email || user?.name) {
      setLoading(true);
      router.replace("dashboard");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50/50">
        <LoaderCircle className="h-20 w-20 animate-spin text-indigo-600"/>
        <p className="text-xl text-indigo-400 animate-pulse font-bold">Redirecting........</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col md:min-h-[calc(100vh-105px)] md:flex-row">
      <div className="flex min-h-[230px] w-full items-center overflow-hidden bg-white xs:min-h-[35vh] md:min-h-calc(100vh-105px)] md:w-1/2">
        <LoginIllustration />
      </div>
      <div className="relative flex min-h-[calc(100vh-230px)] w-full items-center justify-center overflow-hidden rounded-t-[25px] 
        bg-login px-5 py-[30px] xs:min-h-[65vh] xs:p-0 md:min-h-[calc(100vh-105px)] md:w-1/2 md:rounded-[25px_0_0_25px]">
        <div className="absolute -right-[150px] -bottom-[200px] z-1 h-[300px] w-[300px] rounded-full border border-white/80 xs:h-[450px] xs:w-[450px]"/>
        <div className="absolute -right-[120px] -bottom-[180px] z-1 h-[300px] w-[300px] rounded-full border border-white/80 xs:h-[450px] xs:w-[450px]"/>
        <div className="relative z-1 bg-white w-full rounded-[14px] px-[22px] pt-7 pb-6 xs:w-[390px] xs:pt-8 xs:pb-[26px]">
          <h1 className="mb-[30px] text-[26px] font-bold text-ink xs:text-[29px]">Hello!</h1>
          <p className="mb-[27px] text-[17px] text-[#444] xs:text-[19px]">Sign Up to Get Started</p>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
