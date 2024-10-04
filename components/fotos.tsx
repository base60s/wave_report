'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PhotoCard = ({ src, title }: { src: string; title: string }) => (
  <Card className="bg-gray-900 shadow-lg border border-gray-800 flex flex-col h-full">
    <CardHeader className="pb-2 flex-grow flex items-center justify-center">
      <CardTitle className="text-[10px] sm:text-xs font-semibold text-white leading-tight text-center">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-2">
      <Image src={src} alt={title} width={300} height={200} className="w-full h-auto rounded-lg" />
    </CardContent>
  </Card>
)

export function FotosComponent() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-black relative overflow-hidden flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl">
        <Link href="/" passHref>
          <Button className="mb-8 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full">
            Volver a Inicio
          </Button>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-white">Fotos de Obra</h1>
        <p className="text-lg sm:text-xl text-white mb-8 text-center">
          Próximos hitos: fin plomería semana 1/10/24 e inspección. Luego pisos (4 días) y durlock
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PhotoCard 
            src="/images/Terraza.png" 
            title="15/09: Terraza finalizada, pendiente pintura y plantas" 
          />
          <PhotoCard 
            src="/images/Cerradura.png"  
            title="20/08: Cerraduras digitales armadas y en depósito" 
          />
          <PhotoCard 
            src="/images/Plomeria.png" 
            title="1/10/24: Trabajos de plomería a terminar esta semana." 
          />
          <PhotoCard 
            src="/images/Escalera.png" 
            title="25/09/24: Escalera instalada hasta piso Tres." 
          />
        </div>
      </div>
    </div>
  )
}