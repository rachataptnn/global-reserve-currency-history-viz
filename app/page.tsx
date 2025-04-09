import { Timeline } from "@/components/timeline"
import { CurrencyInfo } from "@/components/currency-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Global Reserve Currencies Timeline</h1>
        <p className="text-xl text-muted-foreground">1450 - Present</p>
      </header>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline" className="mt-6">
          <Timeline />
        </TabsContent>
        <TabsContent value="details">
          <CurrencyInfo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
