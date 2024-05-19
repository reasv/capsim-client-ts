
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TextInput(
    {id, label, value, maxLength, type, onNewValue}:
    {
      id: string,
      label: string,
      value: string,
      maxLength: number,
      type?: string,
      onNewValue: (value: string) => void
    }
  ) {
    function onInput(event: React.FormEvent<HTMLInputElement>) {
      if (event.currentTarget.value.length > maxLength) {
        return
      }
      onNewValue(event.currentTarget.value)
    }
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor={id}>{label}</Label>
        <Input type={type ? type : "text"} id={id} value={value} maxLength={maxLength} onInput={onInput}/>
      </div>
    )
  }
  