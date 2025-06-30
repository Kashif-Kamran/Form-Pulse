import { SyringeIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function TopVaccinesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SyringeIcon className="h-5 w-5 text-gray-500" />
          Top Vaccines
        </CardTitle>
        <CardDescription>Most administered vaccines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Rabies</span>
          <span className="font-medium">45</span>
        </div>
        <div className="flex justify-between">
          <span>DHPP</span>
          <span className="font-medium">38</span>
        </div>
        <div className="flex justify-between">
          <span>Bordetella</span>
          <span className="font-medium">32</span>
        </div>
        <div className="flex justify-between">
          <span>Feline Core</span>
          <span className="font-medium">28</span>
        </div>
      </CardContent>
    </Card>
  )
}
