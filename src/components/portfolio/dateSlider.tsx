"use client"
import React, { useMemo } from "react"

import { Slider } from "../ui/slider"
import { PortfolioResult } from "@/hooks/backtestAPI"
import { Label } from "@/components/ui/label"

export function DateSlider(
  { id, portfolio, yearly, onCommit } 
  : { id: string,
      portfolio: PortfolioResult,
      yearly: boolean,
      onCommit: (value: Date) => void
    }
) {

  const cachedPortfolio = useMemo(() => portfolio, [portfolio.ticker])

  const timeseries = useMemo(() => {
    if (yearly) {
      return cachedPortfolio.yearly_results
    } else {
      return cachedPortfolio.monthly_results
    }
  } , [yearly, cachedPortfolio.ticker])

  const [dateIndex, setDateIndex] = React.useState<number>(0)

  return (
    <div className="flex items-center mb-4">
      <Label htmlFor={id}>
        {timeseries ? 
          new Date(timeseries[dateIndex].timestamp).toDateString()
          : "Null"}
      </Label>
      <Slider
        id={id}
        min={0}
        max={(timeseries?.length || 0) - 1}
        step={1}
        defaultValue={[0]}
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