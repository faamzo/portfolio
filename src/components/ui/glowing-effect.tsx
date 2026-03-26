import * as React from 'react'
import { cn } from '../../lib/utils'

type GlowingEffectProps = {
  blur?: number
  borderWidth?: number
  spread?: number
  glow?: boolean
  disabled?: boolean
  proximity?: number
  inactiveZone?: number
  className?: string
}

export function GlowingEffect({
  blur = 0,
  borderWidth = 2,
  spread = 90,
  glow = true,
  disabled = false,
  proximity = 90,
  inactiveZone = 0.02,
  className,
}: GlowingEffectProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState({ x: 50, y: 50, active: false })

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      const zoneX = Math.abs(x - 50) / 50
      const zoneY = Math.abs(y - 50) / 50
      const inInactiveZone = zoneX < inactiveZone && zoneY < inactiveZone
      setState({ x, y, active: !inInactiveZone })
    },
    [disabled, inactiveZone],
  )

  const onLeave = React.useCallback(() => {
    setState((prev) => ({ ...prev, active: false }))
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('pointer-events-none absolute inset-0 rounded-inherit', className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-inherit transition-opacity duration-300"
        style={{
          opacity: state.active ? 1 : 0,
          padding: `${borderWidth}px`,
          background: `radial-gradient(${spread}px circle at ${state.x}% ${state.y}%, rgba(255,255,255,0.95), rgba(255,255,255,0.25) 35%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0) 80%)`,
          filter: `blur(${blur}px)`,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {glow ? (
        <div
          className="absolute inset-0 rounded-inherit transition-opacity duration-300"
          style={{
            opacity: state.active ? 0.45 : 0,
            background: `radial-gradient(${Math.max(spread, proximity)}px circle at ${state.x}% ${state.y}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 75%)`,
          }}
        />
      ) : null}
    </div>
  )
}
