"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import useAuthCheck from "@/hooks/useAuthCheck"
import { AdminDashboard } from "./adminDashboard"
import { TextInput } from "@/components/portfolio/textInput"

export function AuthCheck() {
    const { isAuthorized, error, password, checkPassword } = useAuthCheck();
    const [inputPassword, setPassword] = React.useState<string>("")
    return (
        <div>
            {!isAuthorized && (<>
                <TextInput
                    id="password"
                    label="Password"
                    value={inputPassword}
                    maxLength={128}
                    type="password"
                    onNewValue={setPassword}
                />
                <Button className="mt-4" onClick={() => checkPassword(inputPassword)}>Login</Button>
                <div className="mt-4">
                    {error && <p>Error: {error}</p>}
                </div>
            </>)}
            {isAuthorized === true && password && (
                <AdminDashboard adminPassword={password} />
            )}
        </div>
    )

}