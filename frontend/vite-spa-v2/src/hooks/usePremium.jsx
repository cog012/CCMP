import { useState } from 'react'

export default function usePremium() {
    const [premium, setPremium] = useState(getPremium())
    function getPremium() {
        const premiumString = localStorage.getItem('premium')
        const premium = JSON.parse(premiumString)
        return premium
    }
    function savePremium({ premiumToken }) {
        const newPremium = { premiumToken: premiumToken }
        localStorage.setItem('premium', JSON.stringify(newPremium))
        setPremium(newPremium)
    }

    return {
        setPremium: savePremium, premium: premium
    }
}