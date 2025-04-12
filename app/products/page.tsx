"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText } from "lucide-react"

const products = [
  {
    title: "Currency Exchange",
    icon: DollarSign,
    href: "/currency-exchange",
    description: "Exchange currencies at competitive rates",
    color: "text-blue-500",
  },
  { 
    title: "Bill Payments", 
    icon: FileText, 
    href: "/bill-payments", 
    description: "Pay your bills quickly and easily",
    color: "text-green-500",
  },
]

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.href} href={product.href}>
            <Card className="hover:shadow-lg transition-shadow hover-lift">
              <CardHeader className="flex flex-row items-center gap-4">
                <product.icon className={`h-8 w-8 ${product.color}`} />
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{product.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

