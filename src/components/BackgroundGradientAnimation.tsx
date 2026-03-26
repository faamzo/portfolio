import * as React from 'react'
import { cn } from '../lib/utils'

type BackgroundGradientAnimationProps = {
  className?: string
  containerClassName?: string
  interactive?: boolean
}

export default function BackgroundGradientAnimation({
  className,
  containerClassName,
  interactive = false,
}: BackgroundGradientAnimationProps) {
  const interactiveRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!interactive || !interactiveRef.current) return

    const node = interactiveRef.current
    let raf = 0

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth
      const y = event.clientY / window.innerHeight
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 40}px)`
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [interactive])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden',
        containerClassName,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#07080c]" />
      <div className="absolute inset-0 opacity-70 blur-3xl" />
      <div className={cn('absolute inset-0', className)}>
        <div className="animate-first absolute left-[-15%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(110,79,242,0.35),rgba(110,79,242,0)_60%)]" />
        <div className="animate-second absolute right-[-12%] top-[8%] h-[32rem] w-[32rem] origin-center rounded-full bg-[radial-gradient(circle_at_center,rgba(48,115,235,0.32),rgba(48,115,235,0)_62%)]" />
        <div className="animate-third absolute bottom-[-18%] left-[22%] h-[30rem] w-[30rem] origin-center rounded-full bg-[radial-gradient(circle_at_center,rgba(110,79,242,0.26),rgba(110,79,242,0)_65%)]" />
        <div className="animate-fourth absolute bottom-[5%] right-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(48,115,235,0.22),rgba(48,115,235,0)_65%)]" />
        <div className="animate-fifth absolute left-[42%] top-[36%] h-[18rem] w-[18rem] origin-center rounded-full bg-[radial-gradient(circle_at_center,rgba(110,79,242,0.2),rgba(110,79,242,0)_70%)]" />
      </div>
      <div
        ref={interactiveRef}
        className={cn(
          'absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(87,99,255,0.12),rgba(87,99,255,0)_65%)] blur-2xl transition-transform duration-300 ease-out',
          interactive ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(0,0,0,0.45)_70%)]" />
    </div>
  )
}
