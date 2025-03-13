import { Link } from "react-router"

export default function NoPage() {
    return (
        <div>
            <h1>Nothing here</h1>
            <Link to="/dashboard">Head back to Dashboard</Link>
        </div>
    )
}