import { Timeline } from "@/components/timeline"
import { CurrencyInfo } from "@/components/currency-info"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600">
          Global Reserve Currencies Timeline
        </h1>
        <hr className="mt-4 mb-4" />
        <p className="text-xl text-muted-foreground">1450 - Present</p>
      </header>


      <p className="text-2xl text-center text-muted-foreground">
      สำรวจวิวัฒนาการของ global reserve currencies ตลอดหลายศตวรรษ — ตั้งแต่ยุคการเดินเรือของโปรตุเกสจนถึง dollar ยุคใหม่ — และสิ่งที่การเปลี่ยนผ่านแต่ละครั้งสะท้อนถึงอำนาจทางเศรษฐกิจและอิทธิพลระดับโลก
      </p>



      <Tabs defaultValue="timeline" className="w-full">
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
