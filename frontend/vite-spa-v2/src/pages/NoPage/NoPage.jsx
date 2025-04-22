import { Link } from "react-router"

export default function NoPage() {
    return (
        <div>
            <h1>无效页面</h1>
            <Link to="/dashboard">返回仪表盘</Link>
        </div>
    )
}