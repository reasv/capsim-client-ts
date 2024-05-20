import { PortfolioForm } from './portfolioForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export function Dashboard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
    <Card className="mt-4">
        <CardHeader>
            <CardTitle>Portfolio A</CardTitle>
            <CardDescription>
                Configure your first portfolio
            </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
            <PortfolioForm portfolio_id='portfolio-a' />
        </CardContent>
    </Card>
    <Card className="mt-4">
    <CardHeader>
        <CardTitle>Portfolio B</CardTitle>
        <CardDescription>
            Configure your second portfolio
        </CardDescription>
    </CardHeader>
    <CardContent className="pb-4">
        <PortfolioForm portfolio_id='portfolio-b' />
    </CardContent>
    </Card>
</div>
)}