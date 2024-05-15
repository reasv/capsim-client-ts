"use client"
import React, { useMemo } from "react"
import { SelectAsset } from "@/components/portfolio/selectAsset"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PortfolioParams, usePortfolioBacktest } from "@/hooks/backtestAPI"

export function PortfolioForm() {
  const [asset, setAsset] = React.useState<string>("VTI")
  const [portfolioLabel, setPortfolioLabel] = React.useState<string>("My Portfolio")
  const [initialInvestment, setInitialInvestment] = React.useState<number>(10000)
  const [dividendTaxRate, setDividendTaxRate] = React.useState<number>(26)
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = React.useState<number>(26)
  const [yearlyWithdrawalRate, setYearlyWithdrawalRate] = React.useState<number>(4)
  const [startDate, setStartDate] = React.useState<string>("2001-01-01")
  // Set label based on asset ticker
  React.useEffect(() => {
    // Only do this if the user hasn't changed the label
    // It needs to match the regex /^[0-9]+% [A-Z]+ Portfolio$/
    if (/^[0-9]+% [A-Z]+ Portfolio$/.test(portfolioLabel) || portfolioLabel === "My Portfolio") {
      setPortfolioLabel(`100% ${asset} Portfolio`)
    }
  }, [asset])

  const requestData: PortfolioParams = useMemo(() => ({
    ticker: asset,
    start_date: startDate,
    initial_investment: initialInvestment,
    dividend_tax: dividendTaxRate,
    capital_gains_tax: capitalGainsTaxRate,
    yearly_sale_percentage: yearlyWithdrawalRate,
    name: portfolioLabel,
  }), [asset, startDate, initialInvestment, dividendTaxRate, capitalGainsTaxRate, yearlyWithdrawalRate, portfolioLabel])
  const { simulatePortfolios, results, loading, error } = usePortfolioBacktest()
  // print results to console
  React.useEffect(() => {
    if (results) {
      console.log(results)
    }
  }, [results])

  return (
    <div>
      <SelectAsset setStatus={setAsset}/>
      <TextInput id="portfolio_label" label="Portfolio Label" value={portfolioLabel} maxLength={64} onNewValue={setPortfolioLabel} />
      <NumberInput id="initial_investment" label={`Initial Investment ${initialInvestment}`} value={initialInvestment} onNewValue={setInitialInvestment} />
      <NumberInput id="dividend_tax_rate" maxValue={100} label={`Dividend Tax Rate (%)`} value={dividendTaxRate} onNewValue={setDividendTaxRate} />
      <NumberInput id="capital_gains_tax_rate" maxValue={100} label={`Capital Gains Tax Rate (%)`} value={capitalGainsTaxRate} onNewValue={setCapitalGainsTaxRate} />
      <NumberInput id="yearly_withdrawal_rate" maxValue={100} label={`Yearly Withdrawal Rate (%)`} value={yearlyWithdrawalRate} onNewValue={setYearlyWithdrawalRate} />
      <TextInput id="start_date" label="Start Date" value={startDate} maxLength={10} onNewValue={setStartDate} />
      <Button className="mt-5" onClick={() => simulatePortfolios([requestData])}>Run Simulation</Button>
    </div>
  )
}

export function NumberInput(
  {id, label, value, maxValue, onNewValue}: {id: string, label: string, value: number, maxValue?: number, onNewValue: (value: number) => void}
) {
  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value)
    if (isNaN(value)) {
      return
    }
    if (maxValue && value > maxValue) {
      onNewValue(maxValue)
      return
    }
    onNewValue(value)
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Input type="number" id={id} value={value} onInput={onInput}/>
    </div>
  )
}

export function TextInput(
  {id, label, value, maxLength, onNewValue}: {id: string, label: string, value: string, maxLength: number, onNewValue: (value: string) => void}
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
      <Input type="text" id={id} value={value} maxLength={maxLength} onInput={onInput}/>
    </div>
  )
}
