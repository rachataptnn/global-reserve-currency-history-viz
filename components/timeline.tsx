"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { reserveCurrencyData } from "@/lib/data"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Timeline() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null)

  const handleOpenDetails = (id: string) => {
    setDetailsOpen(id)
  }

  return (
    <div className="relative">
      {/* Timeline visualization */}
      <div className="relative mb-12">
        <div className="absolute h-1 w-full bg-muted top-6 left-0"></div>
        <div className="flex justify-between relative">
          {reserveCurrencyData.map((currency, index) => (
            <div
              key={currency.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedPeriod(currency.id === selectedPeriod ? null : currency.id)}
            >
              <div
                className={`w-4 h-4 rounded-full z-10 mb-2 ${
                  selectedPeriod === currency.id ? "bg-primary" : "bg-muted-foreground"
                }`}
              ></div>
              <span className="text-sm font-medium transform -rotate-45 origin-top-left whitespace-nowrap">
                {currency.startYear}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full z-10 mb-2 bg-muted-foreground"></div>
            <span className="text-sm font-medium transform -rotate-45 origin-top-left">Present</span>
          </div>
        </div>
      </div>

      {/* Currency periods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reserveCurrencyData.map((currency) => (
          <Card
            key={currency.id}
            className={`transition-all ${
              selectedPeriod === currency.id || selectedPeriod === null
                ? "opacity-100 scale-100"
                : "opacity-50 scale-95"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{currency.country}</h3>
                <Badge variant="outline">
                  {currency.startYear} - {currency.endYear || "Present"}
                </Badge>
              </div>
              <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                <Image
                  src={currency.image || "/placeholder.svg"}
                  alt={`${currency.currency} image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {currency.symbol}
                </div>
                <div>
                  <p className="font-medium">{currency.currency}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{currency.description}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenDetails(currency.id)
                }}
              >
                More Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      {detailsOpen && (
        <Dialog open={!!detailsOpen} onOpenChange={() => setDetailsOpen(null)}>
          <DialogContent className="max-w-3xl">
            {(() => {
              const currency = reserveCurrencyData.find((c) => c.id === detailsOpen)
              if (!currency) return null

              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span>
                        {currency.country}: {currency.currency}
                      </span>
                      <Badge variant="outline">
                        {currency.startYear} - {currency.endYear || "Present"}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>Global Reserve Currency</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-4 p-1">
                      <div className="relative w-full h-60 rounded-md overflow-hidden">
                        <Image
                          src={currency.image || "/placeholder.svg"}
                          alt={`${currency.currency} image`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Historical Context</h4>
                        <p>{currency.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Key Factors</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {currency.factors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </div>

                      {currency.decline && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Decline</h4>
                          <p>{currency.decline}</p>
                        </div>
                      )}

                      {currency.additionalInfo && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Additional Information</h4>
                          <p>{currency.additionalInfo}</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </>
              )
            })()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
