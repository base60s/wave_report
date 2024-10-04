'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const progressData = [
  { name: 'Progreso', value: 85 },
]

const salesData = [
  { name: 'Vendidas', value: 90 },
]

const CustomBar = ({ x, y, width, height, fill }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ scaleX: 1, transition: { duration: 2, ease: "easeOut" } })
  }, [controls])

  return (
    <motion.g initial={{ opacity: 1, scaleX: 0 }} animate={controls}>
      <defs>
        <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(224.3, 76.3%, 48%)" stopOpacity={1}/>
          <stop offset="100%" stopColor="hsl(224.3, 76.3%, 48%)" stopOpacity={0.6}/>
        </linearGradient>
        <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(192.9, 82.3%, 31%)" stopOpacity={1}/>
          <stop offset="100%" stopColor="hsl(192.9, 82.3%, 31%)" stopOpacity={0.6}/>
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
    </motion.g>
  )
}

const AnimatedLabel = ({ x, y, width, value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    let startTime
    const animationDuration = 2000 // 2 seconds

    const animateValue = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / animationDuration

      if (progress < 1) {
        setDisplayValue(Math.min(Math.floor(value * progress), value))
        requestAnimationFrame(animateValue)
      } else {
        setDisplayValue(value)
        controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5 } })
      }
    }

    requestAnimationFrame(animateValue)
  }, [value, controls])

  return (
    <motion.g animate={controls}>
      <text x={x + width - 5} y={y + 15} fill="#ffffff" textAnchor="end" dominantBaseline="middle" fontSize="18" fontWeight="bold">
        {displayValue}%
      </text>
    </motion.g>
  )
}

export function KpiDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drawWave = (x: number, y: number, amplitude: number, frequency: number, offset: number) => {
      ctx.beginPath()
      for (let i = 0; i < canvas.width; i++) {
        const angle = (i + offset) * frequency
        const yPos = y + Math.sin(angle) * amplitude
        ctx.lineTo(i, yPos)
      }
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1

      const time = Date.now() * 0.001

      for (let i = 0; i < 5; i++) {
        drawWave(0, canvas.height * (i + 1) / 6, 20, 0.02, time + i * 100)
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 39) {
          clearInterval(timer)
          return prevCount
        }
        return prevCount + 1
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen p-8 bg-black relative overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-4xl">
        <Link href="/" passHref>
          <Button className="mb-8 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full">
            Volver a Inicio
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center text-white">KPIs de Obra</h1>
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-gray-900 shadow-lg border border-gray-800 h-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white">Avance de Obra en %</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 h-[calc(100%-4rem)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" domain={[0, 100]} stroke="#888" tick={{fontSize: 14}} />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                  <Bar dataKey="value" fill="url(#blueGradient)" shape={<CustomBar />} barSize={40}>
                    <LabelList dataKey="value" content={<AnimatedLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 shadow-lg border border-gray-800 h-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white">Unidades Vendidas en %</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 h-[calc(100%-4rem)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" domain={[0, 100]} stroke="#888" tick={{fontSize: 14}} />
                  <YAxis dataKey="name" type="category" hide />
                  <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                  <Bar dataKey="value" fill="url(#cyanGradient)" shape={<CustomBar />} barSize={40}>
                    <LabelList dataKey="value" content={<AnimatedLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 shadow-lg border border-gray-800 h-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white">Retraso en días</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[calc(100%-4rem)]">
              <motion.span
                className="text-7xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {count}
              </motion.span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}