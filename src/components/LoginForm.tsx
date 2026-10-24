"use client";
import { FormEvent, useState } from "react";
import InputGroup from "./InputGroup";
import { LoaderIcon, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { users } from "@/lib/data";
import { saveLoggedInUser } from "@/lib/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Feedback = {
    type: "error" | "success";
    text: string;
} | null;

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState<Feedback>(null);

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Login button clicked");

        const trimmedEmail = email.trim();

        if(trimmedEmail === "") {
            setFeedback({ type: "error", text: "Please enter your mail address." });
            console.log("Please enter your mail address.");
            return;
        }

        if(password === "") {
            setFeedback({ type: "error", text: "Please enter your password."});
            console.log("Please enter your password");
            return;
        }

        if(!EMAIL_PATTERN.test(trimmedEmail)) {
            setFeedback({ type: "error", text: "Please enter valid email address."});
            console.log("Please enter valid email address.");
            return;
        }

        // Find the User
        const matchedUser = users.find((user) => user.email.toLowerCase() === trimmedEmail.toLowerCase() && user.password === password);

        if(!matchedUser) {
            setFeedback({ type: "error", text: "Invalid email or password"});
            return;
        }

        // Save the user Data
        saveLoggedInUser({
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email
        })

        setFeedback({ type: "success", text: "Login Successful! Redirecting....."});
        console.log("Login Successful! Redirecting.....");
        setEmail("");
        setPassword("");
        router.push(`/ModernUI/dashboard/${matchedUser.id}`);
    }

    function handleForgotPassword() {
        // need to implement
    }

  return (
    <>
        <form onSubmit={handleLogin} noValidate>
            <InputGroup 
                iconPath={<Mail className="w-5 h-5"/>}
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                value={email}
                onChange={setEmail}
            />
            <InputGroup 
                iconPath={<Lock className="w-5 h-5"/>}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
            />
            <button type="submit" className="h-[55px] w-full cursor-pointer rounded-[30px] bg-login text-base text-white flex items-center justify-center transition duration-300 hover:-translate-y-px hover:bg-login-hover active:translate-y-0 xs:h-[57px]">
                {feedback?.type === "success" ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
        </form>
        <button type="button" onClick={handleForgotPassword} className="mt-[25px] inline-block cursor-pointer text-[15px] text-[#555] transition-colors duration-300 hover:text-login">
            Forgot Password
        </button>
        <p role="status" className={`mt-[25px] min-h-5 text-sm text-center font-bold ${feedback?.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {feedback?.text}
        </p>
    </>
  )
}
