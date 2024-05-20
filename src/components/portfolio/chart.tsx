import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTheme } from "../theme-provider"
import { PortfolioResult } from "@/hooks/backtestAPI"

function formatNumberWithApostrophe(num: number, round: boolean): string {
  // Convert the number to a string and split it into the integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split('.');
  
  // Reverse the integer part for easier insertion of apostrophes
  const reversedInteger = integerPart.split('').reverse();
  
  // Insert an apostrophe every three digits
  const formattedReversedInteger = reversedInteger.reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
          acc.push("'");
      }
      acc.push(digit);
      return acc;
  }, [] as string[]);
  
  // Reverse the integer part back to its original order
  const formattedInteger = formattedReversedInteger.reverse().join('');
  
  // Combine the integer and decimal parts if there's a decimal part
  return decimalPart && !round ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export function ChartCard(
    {title, description, portfolioResult, yearly, field_name, round, syncId}:
    { round: boolean, yearly?: boolean, title: string, description: string, portfolioResult: PortfolioResult, field_name: string
    syncId?: string
    }
) {
    const { theme } = useTheme()
    const data = portfolioResult[yearly ? "yearly_results" : "monthly_results"]?.map((result) => {
      return {
          value: round ? Math.round(result[field_name]): result[field_name],
          month: new Date(result.timestamp).toLocaleString("default", { month: "short", year: "numeric" }),
          time: new Date(result.timestamp).getTime(),
      };
  });

  const formatXAxis = (value: any, index: number) => {
    // Extract year from the date string
    // Check if it's the first entry of the year
    if (index % 11 == 0 || yearly) {
      // get year out of value which is a utc timestamp and return it
      return new Date(value).getFullYear().toString();
    }
    return '';
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              syncId={syncId}
              data={data}
              syncMethod={"value"}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {title}
                            </span>
                            <span className="font-bold ">
                              {formatNumberWithApostrophe(payload[0].value as number, round)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Month
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.month}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
              dot={false}
                type="monotone"
                dataKey="value"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(${
                      theme === "dark" ? "210 20% 98%" : "220.9 39.3% 11%"
                    })`,
                  } as React.CSSProperties
                }
              />
              <XAxis
              tickFormatter={formatXAxis}
              type="number"
              scale={"time"}
              domain={["dataMin", "dataMax"]}
              style={
                {
                  stroke: "var(--theme-primary)",
                  "--theme-primary": `hsl(${
                    theme === "dark" ? "210 20% 98%" : "220.9 39.3% 11%"
                  })`,
                  opacity: 0.8,
                } as React.CSSProperties
              }
              dataKey="time" />
              <YAxis
              type="number"
              domain={["dataMin", "dataMax"]}
              scale={"log"}
              style={
                {
                  stroke: "var(--theme-primary)",
                  "--theme-primary": `hsl(${
                    theme === "dark" ? "210 20% 98%" : "220.9 39.3% 11%"
                  })`,
                  opacity: 0.8,
                } as React.CSSProperties
              }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}