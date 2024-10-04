'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Page() {  // Changed from 'export function Page' to 'export default function Page'
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative">
      <h1 className="text-6xl font-bold leading-tight mb-12 text-white">Proyecto Wave</h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 z-10">
        <Link href="/kpi" passHref>
          <Button
            variant="outline"
            className="w-48 h-16 text-xl font-semibold text-black bg-white border-white hover:bg-white hover:text-black transition-colors"
          >
            KPIs
          </Button>
        </Link>
        <Link href="/fotos" passHref>
          <Button
            variant="outline"
            className="w-48 h-16 text-xl font-semibold text-black bg-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Fotos
          </Button>
        </Link>
      </div>
    </div>
  )
}