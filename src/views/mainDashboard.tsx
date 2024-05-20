import { PortfolioForm } from './portfolioForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export function Dashboard() {
    return (
        <div>
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
    <Card className="mt-4">
    <CardHeader>
        <CardTitle>Compare</CardTitle>
        <CardDescription>
            Compare your portfolios
        </CardDescription>
    </CardHeader>
    <CardContent className="pb-4">
        <div>Comparison goes here</div>
    </CardContent>
    </Card>
</div>
)}