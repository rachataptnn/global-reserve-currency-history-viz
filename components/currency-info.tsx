"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { reserveCurrencyData } from "@/lib/data"
import { reserveCurrencyDataThai } from "@/lib/data-th"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CurrencyInfo() {
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null)

  const handleOpenDetails = (id: string) => {
    setDetailsOpen(id)
  }

  return (
    <div className="space-y-8">
      {reserveCurrencyDataThai.map((currency) => (
        <Card key={currency.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {currency.country}: {currency.currency}
                </CardTitle>
                <CardDescription>
                  {currency.startYear} - {currency.endYear || "Present"}
                </CardDescription>
              </div>
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-xl">
                {currency.symbol}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative w-full h-40 rounded-md overflow-hidden md:col-span-1">
                <Image
                  src={currency.image}
                  alt={`${currency.currency} image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-4 md:col-span-2">
                <div>
                  <h4 className="font-semibold mb-2">Historical Context</h4>
                  <p className="line-clamp-3">{currency.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Factors</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {currency.factors.slice(0, 2).map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                    {currency.factors.length > 2 && <li>...</li>}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30">
            <Button className="ml-auto" onClick={() => handleOpenDetails(currency.id)}>
              More Details
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Details Dialog */}
      {detailsOpen && (
        <Dialog open={!!detailsOpen} onOpenChange={() => setDetailsOpen(null)}>
          <DialogContent className="max-w-3xl">
            {(() => {
              const currency = reserveCurrencyDataThai.find((c) => c.id === detailsOpen)
              if (!currency) return null

              return (
                <>
                  <DialogHeader>
                    <DialogTitle>
                      {currency.country}: {currency.currency}
                    </DialogTitle>
                    <DialogDescription>
                      Global Reserve Currency ({currency.startYear} - {currency.endYear || "Present"})
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-4 p-1">
                      <div className="relative w-full h-60 rounded-md overflow-hidden">
                        <Image
                          src={currency.image}
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
