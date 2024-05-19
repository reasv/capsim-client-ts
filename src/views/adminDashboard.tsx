"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import useAuthCheck from "@/hooks/useAuthCheck"
import { TextInput } from "./portfolioForm"

export function AdminDashboard({adminPassword}: {adminPassword: string}) {

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Password: {adminPassword}</p>
        </div>
    )
}