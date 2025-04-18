"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { reserveCurrencyData } from "@/lib/data-th"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

export function Timeline() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null)
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Initialize card refs
  useEffect(() => {
    reserveCurrencyData.forEach((currency) => {
      cardRefs.current[currency.id] = null
    })
  }, [])

  const handleOpenDetails = (id: string) => {
    setDetailsOpen(id)
  }

  // Calculate the percentage position for each timeline point
  const calculatePosition = (index: number) => {
    const totalItems = reserveCurrencyData.length
    // Leave some margin on both sides
    const margin = 5
    return margin + ((100 - 2 * margin) * index) / totalItems
  }

  // Scroll to the selected card
  const scrollToCard = (id: string) => {
    if (cardRefs.current[id] && scrollContainerRef.current) {
      const card = cardRefs.current[id]
      const container = scrollContainerRef.current

      const cardLeft = card!.offsetLeft
      const containerWidth = container.clientWidth
      const cardWidth = card!.clientWidth

      // Calculate the scroll position to center the card
      const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2

      // Smooth scroll to the position
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  // Handle timeline marker click
  const handleTimelineClick = (id: string) => {
    const newSelectedPeriod = id === selectedPeriod ? null : id
    setSelectedPeriod(newSelectedPeriod)

    if (newSelectedPeriod) {
      scrollToCard(newSelectedPeriod)
    }
  }

  
  return (
    <div className="relative">
      {/* Minimal Timeline visualization */}
      {/* <br></br> */}
      {/* <h1 className="mt-24">TIMELINE</h1> */}
      
      <h1 className="text-2xl font-bold mt-12 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600">
        Timeline of Global Reserve Currencies
      </h1>
      {/* <hr /> */}
      <div className="relative mt-12 px-4">
        {/* Timeline container with relative positioning */}
        <div className="relative h-28">
          {/* Timeline base line with gradient */}
          <div className="absolute h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 top-6 left-0 rounded-full shadow-sm"></div>

          {/* Timeline markers */}
          {reserveCurrencyData.map((currency, index) => {
            const isSelected = selectedPeriod === currency.id
            const isHovered = hoveredPeriod === currency.id

            return (
              <div
                key={currency.id}
                className="absolute top-0 transform -translate-x-1/2 cursor-pointer"
                style={{ left: `${calculatePosition(index)}%` }}
                onMouseEnter={() => setHoveredPeriod(currency.id)}
                onMouseLeave={() => setHoveredPeriod(null)}
                onClick={() => handleTimelineClick(currency.id)}
              >
                {/* Timeline marker - vertical line */}
                <div
                  className={`mx-auto transition-all duration-300 ${
                    isSelected
                      ? "w-1 h-12 bg-primary shadow-md"
                      : isHovered
                        ? "w-0.5 h-10 bg-primary/80"
                        : "w-0.5 h-0 bg-muted-foreground/70"
                  }`}
                ></div>

                {/* Year label */}
                <div className="mt-1 text-center">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : isHovered
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground"
                    }`}
                  >
                    {currency.startYear}
                  </span>
                </div>

                {/* Currency name on hover/select */}
                {(isHovered || isSelected) && (
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium bg-background border border-border px-2 py-1 rounded shadow-sm">
                      {currency.currency}
                    </span>
                  </div>
                )}
              </div>
            )
          })}

          {/* Present day marker */}
          <div
            className="absolute top-0 transform -translate-x-1/2"
            style={{ left: `${calculatePosition(reserveCurrencyData.length)}%` }}
          >
            {/* <div className="w-0.5 h-8 mx-auto bg-muted-foreground/70"></div> */}
            <div className="mt-1 text-center">
              <span className="text-sm font-medium px-2 py-1 rounded-md text-muted-foreground">Present</span>
            </div>
          </div>
        </div>
      </div>

      
      {/* Horizontally scrollable currency cards */}
      <div
        className="relative overflow-x-auto pt-4 pb-4 pr-8 pl-8 hide-scrollbar"
        ref={scrollContainerRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-4 w-max">
          {reserveCurrencyData.map((currency) => (
            <div
              key={currency.id}
              ref={(el) => {cardRefs.current[currency.id] = el}}
              className="w-[350px] flex-shrink-0"
            >
              <motion.div
                initial={{ opacity: 0.8, y: 20 }}
                animate={{
                  opacity: selectedPeriod === currency.id || selectedPeriod === null ? 1 : 0.6,
                  y: 0,
                  scale: selectedPeriod === currency.id ? 1.03 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card
                  className={`h-full transition-all duration-300 overflow-hidden ${
                    selectedPeriod === currency.id ? "ring-2 ring-primary ring-offset-2 shadow-lg" : "hover:shadow-md"
                  }`}
                  onMouseEnter={() => setHoveredPeriod(currency.id)}
                  onMouseLeave={() => setHoveredPeriod(null)}
                  onClick={() => handleTimelineClick(currency.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{currency.country}</h3>
                      <Badge variant={selectedPeriod === currency.id ? "default" : "outline"}>
                        {currency.startYear} - {currency.endYear || "Present"}
                      </Badge>
                    </div>
                    <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-muted group">
                      <img
                        src={currency.image}
                        alt={`${currency.currency} image`}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedPeriod === currency.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
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
                      variant={selectedPeriod === currency.id ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDetails(currency.id)
                      }}
                    >
                      More Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
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
                      <div className="relative w-full h-60 rounded-md overflow-hidden bg-muted">
                        <img
                          src={currency.image }
                          alt={`${currency.currency} image`}
                          className="object-cover w-full h-full"
                          
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
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
