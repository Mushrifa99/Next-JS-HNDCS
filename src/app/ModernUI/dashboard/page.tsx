"use client"
import { getLoggedInUser, removeUser } from "@/lib/auth";
import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function page() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getLoggedInUser();

    if (!user) {
      alert("User Not found");
      return;
    }

    setUserId(user.id);
    setUserEmail(user.email);
    setUserName(user.name);
    setLoading(false);

  }, []);

  function handleLogout() {
    removeUser();
    router.push("/ModernUI/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/50">
        <LoaderCircle className="h-20 w-20 animate-spin text-indigo-600"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
              DashBoard
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Modern UI</h1>
              <p className="text-xs text-slate-500">User Dashboard</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer">
            <LogOut className="h-4 w-4"/>
            Logout
          </button>
        </div>
      </div>
      <p>{userId}</p>
      <p>{userName}</p>
      <p>{userEmail}</p>

    </div>
  )
}
