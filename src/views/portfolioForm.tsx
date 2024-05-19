"use client"
import React, { useMemo } from "react"
import { SelectAsset } from "@/components/portfolio/selectAsset"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PortfolioParams, usePortfolioBacktest } from "@/hooks/backtestAPI"
import { ChartCard } from "@/components/portfolio/chart"
import { DateSlider } from "@/components/portfolio/dateSlider"
import { TextInput } from "@/components/portfolio/textInput"

export function PortfolioForm() {
  const [asset, setAsset] = React.useState<string>("VTI")
  const [portfolioLabel, setPortfolioLabel] = React.useState<string>("My Portfolio")
  const [initialInvestment, setInitialInvestment] = React.useState<number>(1000000)
  const [dividendTaxRate, setDividendTaxRate] = React.useState<number>(26)
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = React.useState<number>(26)
  const [yearlyWithdrawalRate, setYearlyWithdrawalRate] = React.useState<number>(4)
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
    start_date: null,
    initial_investment: initialInvestment,
    dividend_tax: dividendTaxRate / 100,
    capital_gains_tax: capitalGainsTaxRate / 100,
    yearly_sale_percentage: yearlyWithdrawalRate / 100,
    name: portfolioLabel,
  }), [asset, initialInvestment, dividendTaxRate, capitalGainsTaxRate, yearlyWithdrawalRate, portfolioLabel])
  
  const { simulatePortfolios, results, loading, error } = usePortfolioBacktest()
  // print results to console
  React.useEffect(() => {
    console.log(results)
  }, [results])

  return (
    <div>
      <SelectAsset setStatus={setAsset}/>
      <TextInput id="portfolio_label" label="Portfolio Label" value={portfolioLabel} maxLength={64} onNewValue={setPortfolioLabel} />
      <NumberInput id="initial_investment" label={`Initial Investment`} value={initialInvestment} onNewValue={setInitialInvestment} />
      <NumberInput id="dividend_tax_rate" maxValue={100} label={`Dividend Tax Rate (%)`} value={dividendTaxRate} onNewValue={setDividendTaxRate} />
      <NumberInput id="capital_gains_tax_rate" maxValue={100} label={`Capital Gains Tax Rate (%)`} value={capitalGainsTaxRate} onNewValue={setCapitalGainsTaxRate} />
      <NumberInput id="yearly_withdrawal_rate" maxValue={100} label={`Yearly Withdrawal Rate (%)`} value={yearlyWithdrawalRate} onNewValue={setYearlyWithdrawalRate} />
      <Button className="mt-5 mb-5" onClick={() => simulatePortfolios([requestData])}>Run Simulation</Button>
      {loading && <p className="mb-5">Loading...</p>}
      {error && <p className="mb-5">Error: {error}</p>}
      {results && results[0] && (
        <div>
          <DateSlider id={"port_date_slider"} portfolio={results[0]} yearly={false} onCommit={(date) => {
            simulatePortfolios([{...requestData, start_date: date.toISOString().split("T")[0]}])
          }} />
          <ChartCard syncId="port1" round={true} title={"Price"} description="Price over time of the underlying asset(s), expressed in % of initial price" field_name="price" portfolioResult={results[0]} />
          <ChartCard syncId="port1" round={false} title={"Inflation Index"} description="A measure of inflation" field_name="cpi" portfolioResult={results[0]} />
          <ChartCard syncId="port1" round={true} title={"Net worth"} description="Total value of your portfolio over time, adjusted for inflation" field_name="infl. adj. portfolio value" portfolioResult={results[0]} />
          <ChartCard syncId="port1" round={true} title={"Monthly Withdrawals"} description="Amount you withdraw from your portfolio *per month*, adjusted for inflation" field_name="infl. adj. monthly income" yearly={true} portfolioResult={results[0]} />
        </div>
      )}
    </div>
  )
}

export function NumberInput(
  {id, label, value, maxValue, onNewValue}
  : {
    id: string, 
    label: string,
    value: number,
    maxValue?: number,
    onNewValue: (value: number) => void
  }
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