"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { TextInput } from "@/components/portfolio/textInput"
import useUpdateTicker from "@/hooks/useUpdateTicker"
import useDeleteTicker from "@/hooks/useDeleteTicker"
import { SelectAsset } from "@/components/portfolio/selectAsset"

export function AdminDashboard({adminPassword}: {adminPassword: string}) {
    const updateTicker = useUpdateTicker(adminPassword)
    const [inputTicker, setInputTicker] = React.useState<string>("")
    const deleteTicker = useDeleteTicker(adminPassword)
    const [deleteInputTicker, setDeleteInputTicker] = React.useState<string>("")
    return (
        <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
            <TextInput
                id="updateTicker"
                label="Ticker to add/update"
                value={inputTicker}
                maxLength={32}
                onNewValue={setInputTicker}
            />
            <Button className="mt-6" onClick={() => {if (inputTicker.length > 0) updateTicker.updateTicker(inputTicker)}}>Add/Update Ticker</Button>
            </div>
            <div className="mt-4 mb-5">
                {updateTicker.error && <p>Error: {updateTicker.error}</p>}
                {updateTicker.success && <p>Success!</p>}
            </div>
            <SelectAsset initialTicker="VTI" setStatus={setDeleteInputTicker}/>
            <Button className="ml-4" onClick={() => {if (deleteInputTicker.length > 0) deleteTicker.deleteTicker(deleteInputTicker)}}>Delete Ticker</Button>
            <div className="mt-4 mb-5">
                {deleteTicker.error && <p>Error: {deleteTicker.error}</p>}
                {deleteTicker.success && <p>Success!</p>}
            </div>
        </div>
    )
}