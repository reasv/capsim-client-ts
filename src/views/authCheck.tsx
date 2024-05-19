"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import useAuthCheck from "@/hooks/useAuthCheck"
import { TextInput } from "./portfolioForm"

export function AuthCheck({children}: {children: React.ReactNode}) {
    const { isAuthorized, error, password, checkPassword } = useAuthCheck();
    const [inputPassword, setPassword] = React.useState<string>("")
    return (
        <div>
            {isAuthorized === null && <p>Loading...</p>}
            {isAuthorized === false && (<>
                <TextInput
                    id="password"
                    label="Password"
                    value={inputPassword}
                    maxLength={128}
                    type="password"
                    onNewValue={setPassword}
                />
                <Button onClick={() => checkPassword(inputPassword)}>Login</Button>
                <div className="mt-4">
                    {error && <p>Error: {error}</p>}
                </div>
            </>)}
            {isAuthorized === true && (
                <>
                    <div>
                        <h1>Admin Panel</h1>
                        <p>Password: {password}</p>

                    </div>
                    {children}
                </>
            )}
        </div>
    )

}