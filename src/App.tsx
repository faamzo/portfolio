import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ShaderBackground from './components/ShaderBackground'
import BackgroundGradientAnimation from './components/BackgroundGradientAnimation'
import GlowingEffectDemoSecond from './components/GlowingEffectDemoSecond'
import { CanvasText } from './components/ui/canvas-text'
import profilePhoto from './assets/ChatGPT Image 26 mars 2026, 18_37_37.png'

type Project = {
  title: string
  description: string
  tech: string[]
  href?: string
  repoHref?: string
}

const PROJECTS: Project[] = [
  {
    title: 'e-Link Galsen',
    description:
      'Plateforme développée dans le cadre du mémoire, pensée pour répondre à des besoins locaux avec une approche produit.',
    tech: ['React', 'Tailwind', 'Firebase'],
    href: undefined,
    repoHref: undefined,
  },
  {
    title: 'Fay_borr',
    description:
      'Application de gestion des dettes (suivi, historique, organisation) avec une interface rapide et claire.',
    tech: ['JavaScript', 'React', 'Firebase'],
    href: undefined,
    repoHref: undefined,
  },
  {
    title: 'Portfolio personnel',
    description:
      'Vitrine moderne, responsive et orientée projets — design minimal, animations fluides et navigation rapide.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    href: undefined,
    repoHref: undefined,
  },
]

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_4%)] px-3 py-1 text-xs tracking-wide text-[var(--text-h)]">
      {children}
    </span>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
}) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--text)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-pretty text-sm md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
      className={cx(
        'group relative overflow-hidden rounded-2xl border border-[var(--border)]',
        'bg-[color-mix(in_oklab,var(--bg),white_3%)]',
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_15%_20%,rgba(167,139,250,0.24),transparent_45%),radial-gradient(900px_circle_at_85%_80%,rgba(170,59,255,0.20),transparent_50%)] opacity-90 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0))] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 p-5">
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="max-w-[34ch]">
              <p className="text-base font-medium text-white/90">
                {project.title}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text-h)]">
            {project.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-[var(--text)]">
            {project.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {project.repoHref ? (
            <a
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
              href={project.repoHref}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          ) : null}
          {project.href ? (
            <a
              className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs text-white transition hover:opacity-95"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              Voir
            </a>
          ) : (
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text)]">
              Bientôt
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function App() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative isolate">
      <ShaderBackground />
      <BackgroundGradientAnimation interactive />
      <div className="container-page relative z-10 bg-[color-mix(in_oklab,var(--bg),black_8%)]/78 backdrop-blur-[2px]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),black_3%)] backdrop-blur">
        <div className="mx-auto flex max-w-[1126px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a
            href="#accueil"
            className="text-sm font-medium tracking-wide text-[var(--text-h)]"
          >
            Famara I. Dramé
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {[
              ['Accueil', '#accueil'],
              ['À propos', '#apropos'],
              ['Compétences', '#competences'],
              ['Projets', '#projets'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                className="text-xs uppercase tracking-[0.22em] text-[var(--text)] transition hover:text-[var(--text-h)]"
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium text-white transition hover:opacity-95"
            href="#projets"
          >
            Voir mes projets
          </a>
        </div>
      </header>

      <main className="px-5 md:px-8">
        <section
          id="accueil"
          className="mx-auto max-w-[1126px] py-14 md:py-20"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text)]">
                Designer & Développeur — Dakar, Sénégal
              </p>
              <h1 className="mt-4 text-balance text-5xl leading-[0.95] md:text-6xl">
                Famara Ibrahima{' '}
                <CanvasText
                  text="Dramé"
                  backgroundClassName="bg-blue-600/30 dark:bg-blue-700/30"
                  lineGap={4}
                  animationDuration={20}
                  hoverOnly
                />
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-[var(--text)] md:text-lg">
                Diplômé en Génie Informatique & Réseaux. Je conçois des interfaces
                web modernes et des solutions réseau adaptées aux réalités
                locales.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
                  href="#projets"
                >
                  Explorer mes projets
                </a>
                <a
                  className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
                  href="#contact"
                >
                  Me contacter
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Tailwind</Badge>
                <Badge>Framer Motion</Badge>
                <Badge>Réseaux</Badge>
                <Badge>Git/GitHub</Badge>
                <Badge>Firebase</Badge>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(800px_circle_at_20%_20%,rgba(167,139,250,0.35),transparent_42%),radial-gradient(800px_circle_at_80%_70%,rgba(170,59,255,0.28),transparent_48%)] blur-2xl" />
              <motion.div
                className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_4%)] p-8"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <div className="mx-auto flex max-w-[280px] flex-col items-center text-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-full border border-[var(--accent-border)] bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_60%),linear-gradient(140deg,rgba(110,79,242,0.34),rgba(48,115,235,0.28))]">
                    <img
                      src={profilePhoto}
                      alt="Photo de Famara Ibrahima Drame"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[var(--text)]">
                    Profil
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-h)]">
                    Famara Ibrahima Drame
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 rounded-[28px] border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_4%)] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text)]">
                  Disponibilité
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--text-h)]">
                  Ouvert aux opportunités à Dakar
                </p>
              </div>
              <div className="h-12 w-12 shrink-0 rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent-border)]" />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['Focus', 'Web + Réseaux'],
                ['Style', 'Minimal & premium'],
                ['Objectif', 'Impact local, UX claire'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] px-4 py-3"
                >
                  <span className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                    {k}
                  </span>
                  <span className="text-sm text-[var(--text-h)]">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section
          id="apropos"
          className="mx-auto max-w-[1126px] border-t border-[var(--border)] py-14 md:py-20"
        >
          <SectionHeading
            eyebrow="À propos"
            title={
              <>
                Parcours, objectifs et{' '}
                <CanvasText
                  text="identité"
                  className="align-middle text-2xl md:text-3xl"
                  backgroundClassName="bg-indigo-600/20"
                  animationDuration={22}
                  hoverOnly
                />
                .
              </>
            }
            subtitle="Licence en Génie Informatique & Réseaux. J’aime transformer un besoin concret en solution fiable, simple à utiliser et facile à maintenir."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Parcours',
                body: 'Formation orientée systèmes, réseaux et développement. À l’aise entre la conception et la mise en production.',
              },
              {
                title: 'Approche',
                body: 'Priorité à la clarté: UI minimaliste, performance, accessibilité, et une histoire produit lisible (case study).',
              },
              {
                title: 'Objectif',
                body: 'Intégrer une équipe à Dakar pour contribuer à des produits utiles et évoluer vers un profil full-stack / réseau.',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-6 text-left"
              >
                <p className="text-sm font-medium text-[var(--text-h)]">
                  {c.title}
                </p>
                <p className="mt-3 text-sm text-[var(--text)]">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="competences"
          className="mx-auto max-w-[1126px] border-t border-[var(--border)] py-14 md:py-20"
        >
          <SectionHeading
            eyebrow="Compétences"
            title={
              <>
                Un socle{' '}
                <CanvasText
                  text="solide"
                  className="align-middle text-2xl md:text-3xl"
                  backgroundClassName="bg-cyan-600/20"
                  animationDuration={16}
                  hoverOnly
                />{' '}
                , orienté terrain.
              </>
            }
            subtitle="Développement web moderne, outils de travail pro, et bases réseaux pour des systèmes fiables."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Développement web',
                items: ['HTML/CSS', 'JavaScript', 'React', 'UI responsive'],
              },
              {
                title: 'Outils',
                items: ['Git & GitHub', 'Firebase', 'Vercel', 'Bonnes pratiques'],
              },
              {
                title: 'Réseaux',
                items: ['Administration', 'Configuration', 'Dépannage', 'Sécurité basique'],
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-6 text-left"
              >
                <p className="text-sm font-medium text-[var(--text-h)]">
                  {b.title}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
                  {b.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-[0.35rem] inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]/80" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projets"
          className="mx-auto max-w-[1126px] border-t border-[var(--border)] py-14 md:py-20"
        >
          <SectionHeading
            eyebrow="Projets"
            title={
              <>
                Moins, mais{' '}
                <CanvasText
                  text="mieux"
                  className="align-middle text-2xl md:text-3xl"
                  backgroundClassName="bg-violet-600/20"
                  animationDuration={14}
                  hoverOnly
                />
                .
              </>
            }
            subtitle="Une grille propre, des interactions légères, et des projets présentés comme des mini case-studies."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
          <GlowingEffectDemoSecond />
        </section>

        <ContactSection />
      </main>

      <footer className="border-t border-[var(--border)] px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1126px] flex-col gap-3 text-left md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
            © {new Date().getFullYear()} — Famara Ibrahima Dramé
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
              href="#contact"
            >
              Contact
            </a>
            <a
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
              href="#projets"
            >
              Projets
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

export default App

function ContactSection() {
  const reduceMotion = useReducedMotion()
  const linkedInHref = 'https://www.linkedin.com/'
  const githubHref = 'https://github.com/faamzo'
  const email = 'famzofid21@gmail.com'
  const phone = '+221 761814172'

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1126px] border-t border-[var(--border)] py-14 md:py-20"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Discutons de ton besoin."
        subtitle="Un message court suffit. Je réponds rapidement."
      />

      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-6 text-left"
        >
          <p className="text-sm font-medium text-[var(--text-h)]">
            Liens & coordonnées
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                Email
              </p>
              <a
                className="mt-2 block font-medium text-[var(--text-h)] hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                Téléphone
              </p>
              <a
                className="mt-2 block font-medium text-[var(--text-h)] hover:underline"
                href="tel:+221761814172"
              >
                {phone}
              </a>
            </div>
            <a
              className="block rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-4 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
              href={linkedInHref}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                LinkedIn
              </p>
              <p className="mt-2 font-medium text-[var(--text-h)]">
                Profil professionnel
              </p>
            </a>
            <a
              className="block rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-4 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
              href={githubHref}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
                GitHub
              </p>
              <p className="mt-2 font-medium text-[var(--text-h)]">Repos</p>
            </a>
          </div>
          <p className="mt-6 text-xs text-[var(--text)]">
            Coordonnées mises à jour.
          </p>
        </motion.aside>
      </div>
    </section>
  )
}

function ContactForm() {
  const reduceMotion = useReducedMotion()
  const [values, setValues] = React.useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = React.useState<{ [k: string]: boolean }>({})
  const [status, setStatus] = React.useState<'idle' | 'sent'>('idle')

  const errors = validateContact(values)
  const hasErrors = Object.keys(errors).length > 0

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(validateContact(values)).length > 0) return
    setStatus('sent')
  }

  return (
    <motion.form
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_2%)] p-6 text-left"
    >
      <p className="text-sm font-medium text-[var(--text-h)]">Envoyer un message</p>
      <p className="mt-2 text-sm text-[var(--text)]">
        Le formulaire est prêt pour Firebase/EmailJS plus tard. Pour l’instant il
        valide les champs côté client.
      </p>

      <div className="mt-6 grid gap-4">
        <Field
          label="Nom"
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Famara I. Dramé"
          error={touched.name ? errors.name : undefined}
        />
        <Field
          label="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="nom@domaine.com"
          error={touched.email ? errors.email : undefined}
          inputMode="email"
        />
        <Field
          label="Message"
          name="message"
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Bonjour, j’aimerais discuter d’une opportunité…"
          error={touched.message ? errors.message : undefined}
          multiline
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={status === 'sent'}
          className={cx(
            'rounded-full px-5 py-3 text-sm font-medium text-white transition',
            status === 'sent'
              ? 'bg-[var(--accent)]/50'
              : 'bg-[var(--accent)] hover:opacity-95',
          )}
        >
          {status === 'sent' ? 'Message prêt' : 'Envoyer'}
        </button>

        <p className="text-xs text-[var(--text)]">
          {status === 'sent'
            ? 'OK — validation réussie. (On branchera l’envoi ensuite.)'
            : hasErrors
              ? 'Vérifie les champs avant d’envoyer.'
              : 'Tout est bon.'}
        </p>
      </div>
    </motion.form>
  )
}

function Field(props: {
  label: string
  name: 'name' | 'email' | 'message'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  error?: string
  multiline?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const common =
    'mt-2 w-full rounded-xl border bg-[color-mix(in_oklab,var(--bg),white_3%)] px-4 py-3 text-sm text-[var(--text-h)] placeholder:text-[var(--text)]/70 outline-none transition'
  const border = props.error
    ? 'border-red-400/60 focus:border-red-400/80'
    : 'border-[var(--border)] focus:border-[var(--accent-border)]'

  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.22em] text-[var(--text)]">
        {props.label}
      </span>
      {props.multiline ? (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          rows={5}
          className={cx(common, border, 'resize-none')}
        />
      ) : (
        <input
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          inputMode={props.inputMode}
          className={cx(common, border)}
        />
      )}
      {props.error ? (
        <span className="mt-2 block text-xs text-red-400">{props.error}</span>
      ) : null}
    </label>
  )
}

function validateContact(values: { name: string; email: string; message: string }) {
  const errors: { [k: string]: string } = {}
  if (!values.name.trim()) errors.name = 'Ton nom est requis.'
  if (!values.email.trim()) errors.email = 'Ton email est requis.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Email invalide.'
  if (!values.message.trim()) errors.message = 'Ton message est requis.'
  else if (values.message.trim().length < 10)
    errors.message = 'Ajoute un peu plus de détails (10 caractères min).'
  return errors
}
