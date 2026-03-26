import * as React from 'react'
import { cn } from '../../lib/utils'
import { RADIANT_CANVAS_COLORS } from '../../lib/radiant-palette'

type CanvasTextProps = {
  text: string
  colors?: string[]
  lineGap?: number
  animationDuration?: number
  className?: string
  backgroundClassName?: string
  hoverOnly?: boolean
}

const DEFAULT_COLORS = RADIANT_CANVAS_COLORS

export function CanvasText({
  text,
  colors = DEFAULT_COLORS,
  lineGap = 4,
  animationDuration = 18,
  className,
  backgroundClassName,
  hoverOnly = false,
}: CanvasTextProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef<number | null>(null)
  const startRef = React.useRef<number>(0)
  const [hovered, setHovered] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mediaMobile = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      setReduced(mediaReduced.matches)
      setIsMobile(mediaMobile.matches)
    }
    sync()
    mediaReduced.addEventListener('change', sync)
    mediaMobile.addEventListener('change', sync)
    return () => {
      mediaReduced.removeEventListener('change', sync)
      mediaMobile.removeEventListener('change', sync)
    }
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    startRef.current = performance.now()

    const ratio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * ratio))
      canvas.height = Math.max(1, Math.floor(rect.height * ratio))
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return () => observer.disconnect()

    const draw = (now: number) => {
      const w = canvas.width
      const h = canvas.height
      const t = ((now - startRef.current) / 1000) / Math.max(animationDuration, 1)
      const particleCount = isMobile ? 80 : 220

      ctx.clearRect(0, 0, w, h)

      const grad = ctx.createLinearGradient(0, 0, w, h)
      const steps = Math.max(colors.length - 1, 1)
      colors.forEach((c, i) => grad.addColorStop(i / steps, c))

      const shiftX = (Math.sin(t * Math.PI * 2) * 0.5 + 0.5) * w * 0.28
      const shiftY = (Math.cos(t * Math.PI * 1.6) * 0.5 + 0.5) * h * 0.22

      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = grad
      ctx.globalAlpha = 0.95
      ctx.fillRect(-shiftX, -shiftY, w * 1.6, h * 1.6)
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'overlay'
      for (let y = -h; y < h * 2; y += Math.max(lineGap, 2)) {
        const wave = Math.sin(y * 0.025 + t * Math.PI * 8.0) * 14
        ctx.strokeStyle = `rgba(255,255,255,${0.03 + ((y + h) / (h * 3)) * 0.07})`
        ctx.beginPath()
        ctx.moveTo(-w, y + wave)
        ctx.lineTo(w * 2, y - wave)
        ctx.stroke()
      }
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'soft-light'
      for (let i = 0; i < particleCount; i += 1) {
        const x = (Math.sin(i * 127.1 + t * 40) * 0.5 + 0.5) * w
        const y = (Math.cos(i * 311.7 + t * 37) * 0.5 + 0.5) * h
        const a = 0.01 + ((i % 10) / 10) * 0.03
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fillRect(x, y, 1.5, 1.5)
      }
      ctx.restore()

      const shouldAnimate = !reduced && !isMobile && (!hoverOnly || hovered)
      if (shouldAnimate) frameRef.current = requestAnimationFrame(draw)
    }

    draw(performance.now())

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [animationDuration, colors, lineGap, reduced, hoverOnly, hovered, isMobile])

  return (
    <span
      className={cn(
        'group relative inline-flex items-center rounded-[0.45em] px-[0.3em] py-[0.04em] align-baseline text-white',
        backgroundClassName,
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 h-full w-full rounded-[0.45em] transition-opacity duration-300',
          hoverOnly ? (hovered || isMobile ? 'opacity-100' : 'opacity-0') : 'opacity-100',
        )}
        aria-hidden="true"
      />
      <span className="relative z-10 mix-blend-screen">{text}</span>
    </span>
  )
}
