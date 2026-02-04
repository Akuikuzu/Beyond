"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


import { createClient } from "@/utils/client";

export default function Login() {

    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const notLoggedIn = useRef<HTMLDivElement | null>(null);

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password
        })
    }

    const handleSignIn = async () => {
        const {data, error } = await supabase.auth.signInWithPassword({
            email, password
        });

        if (data.user != null) {
            router.push('/admin/dashboard');
        } else {
            if (notLoggedIn.current) {
                notLoggedIn.current.style.display = "block"
            }

            router.refresh();
        }
    }

    return (
        <>
        
        <div className="login-container">

            <div className="login-field">
                <label>Email</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div className="login-field">
                <label>Password</label>
                <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
            </div>

            <div className="login-buttons">
                <button onClick={handleSignIn} className="login-btn">Sign in</button>
                <button onClick={handleSignUp} className="login-btn">Sign up</button>
            </div>

            <div ref={notLoggedIn} id="feedback">Fejl i login</div>

        </div>

        
        
        </>
    )

}