"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import useAuthCheck from "@/hooks/useAuthCheck"
import { TextInput } from "./portfolioForm"
import { AdminDashboard } from "./adminDashboard"

export function AuthCheck() {
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
            {isAuthorized === true && password && (
                <AdminDashboard adminPassword={password} />
            )}
        </div>
    )

}