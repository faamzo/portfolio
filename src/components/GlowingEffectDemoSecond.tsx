import { type ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Lock, Search, Settings, Sparkles } from 'lucide-react'
import { GlowingEffect } from './ui/glowing-effect'

type GridItemProps = {
  area: string
  icon: ReactNode
  title: string
  description: string
  onOpen: () => void
}

type ShowcaseItem = Omit<GridItemProps, 'onOpen'> & {
  cta: string
  href: string
  details: string
}

function GridItem({ area, icon, title, description, onOpen }: GridItemProps) {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <button
        type="button"
        onClick={onOpen}
        className="relative h-full w-full rounded-2xl border border-white/20 bg-black/25 p-2 text-left transition hover:border-white/35 md:rounded-3xl md:p-3"
      >
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={95}
          glow
          disabled={false}
          proximity={84}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-white/40 bg-white/10 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl font-semibold text-white md:text-2xl">
                {title}
              </h3>
              <p className="font-sans text-sm text-white/75 md:text-base">
                {description}
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">
              Ouvrir le détail
            </span>
          </div>
        </div>
      </button>
    </li>
  )
}

export default function GlowingEffectDemoSecond() {
  const items: ShowcaseItem[] = [
    {
      area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]',
      icon: <Box className="h-4 w-4 text-white" />,
      title: 'Construire les choses proprement',
      description: 'Architecture claire, composants maintenables, animations fluides.',
      cta: 'Voir e-Link Galsen',
      href: '#projets',
      details:
        'Approche modulaire, sections lisibles et composants réutilisables pour un portfolio durable.',
    },
    {
      area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]',
      icon: <Settings className="h-4 w-4 text-white" />,
      title: 'Éditeur et workflow optimisés',
      description: 'Livrer vite sans sacrifier la qualité visuelle et technique.',
      cta: 'Voir stack technique',
      href: '#competences',
      details:
        'Vite + React + Tailwind + Framer + WebGL pour une base moderne, rapide et productive.',
    },
    {
      area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]',
      icon: <Lock className="h-4 w-4 text-white" />,
      title: 'Sécurité et robustesse',
      description: 'Validation, bonnes pratiques frontend, expérience utilisateur fiable.',
      cta: 'Voir contact sécurisé',
      href: '#contact',
      details:
        'Validation côté client sur formulaire, gestion d’états claire et interactions prévisibles.',
    },
    {
      area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]',
      icon: <Sparkles className="h-4 w-4 text-white" />,
      title: 'Effets premium subtils',
      description: 'Glow interactif blanc, micro-interactions, identité haut de gamme.',
      cta: 'Voir effets UI',
      href: '#accueil',
      details:
        'CanvasText au survol, shader radiant animé et glow blanc synchronisés dans une direction artistique cohérente.',
    },
    {
      area: 'md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]',
      icon: <Search className="h-4 w-4 text-white" />,
      title: 'Évolution continue',
      description: "Prêt à intégrer d'autres modules UI avancés selon tes besoins.",
      cta: 'Discuter du projet',
      href: '#contact',
      details:
        'Le design system peut grandir avec de nouveaux composants sans casser la cohérence visuelle.',
    },
  ]

  const [selected, setSelected] = useState<ShowcaseItem | null>(null)

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        {items.map((item) => (
          <GridItem
            key={item.title}
            area={item.area}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onOpen={() => setSelected(item)}
          />
        ))}
      </ul>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-white/30 bg-[#0b0d14] p-6 text-left md:p-7"
              initial={{ y: 26, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 26, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="w-fit rounded-lg border border-white/35 bg-white/10 p-2">
                    {selected.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {selected.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white/50"
                >
                  Fermer
                </button>
              </div>

              <p className="mt-5 text-base text-white/80">{selected.details}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={selected.href}
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:opacity-90"
                  onClick={() => setSelected(null)}
                >
                  {selected.cta}
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-white/25 px-5 py-2 text-sm text-white/85 transition hover:border-white/50"
                >
                  Retour
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
