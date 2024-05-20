"use client"
import React, { useMemo } from "react"

import { Slider } from "../ui/slider"
import { PortfolioResult } from "@/hooks/backtestAPI"
import { Label } from "@/components/ui/label"
export interface DateSliderProps {
  id: string
  portfolio: PortfolioResult
  yearly: boolean
  onCommit: (value: Date) => void
}

export const DateSlider = (
    { id, portfolio, yearly, onCommit } : DateSliderProps
  ) => {
    const timeseries = useMemo(() => yearly ? portfolio.yearly_results : portfolio.monthly_results, [portfolio.ticker, yearly]) 

    const [dateIndex, setDateIndex] = React.useState<number>(0)

    React.useEffect(() => {
      setDateIndex(0)
    }, [portfolio.ticker, yearly])

    return (
      <div className="flex items-center mb-4">
        <Label htmlFor={id}>
          {timeseries && timeseries[dateIndex] ? 
            new Date(timeseries[dateIndex].timestamp).toDateString()
            : "Null"}
        </Label>
        <Slider
          id={id}
          min={0}
          max={(timeseries?.length || 0) - 1}
          step={1}
          defaultValue={[0]}
          value={[dateIndex]}
          onValueChange={(e) => setDateIndex(e[0])}
          onValueCommit={
            (e) =>  {
              if (timeseries) onCommit(new Date(timeseries[e[0]].timestamp))
            }
          }
        />
      </div>
    )
}