import { Link } from 'react-router'
import CallPreview from '../components/CallPreview'
import Reveal from '../components/Reveal'
import { ROUTES } from '../app/router'

const steps = [
  {
    n: '01',
    title: 'Create a chat',
    text: 'Start a new chat in one click and get a private link. Send it to anyone you want, and they can join straight from their browser.',
    color: 'text-[#1d2fb8]',
    bar: 'bg-[#1d2fb8]',
  },
  {
    n: '02',
    title: 'Talk your way',
    text: 'Everyone chooses how to join. Turn on your camera, speak with only a microphone, or just type. No one is forced onto video.',
    color: 'text-[#6a2fd0]',
    bar: 'bg-[#6a2fd0]',
  },
  {
    n: '03',
    title: 'Ask @coro',
    text: 'Type @coro in the chat and the AI answers for the whole group. It reads the recent conversation, so everyone gets the same helpful reply.',
    color: 'text-[#0a6b8f]',
    bar: 'bg-[#0a6b8f]',
  },
]

export function Component() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 text-[#000000eb]">
      <section className="pt-10 text-center md:pt-16">
        <Reveal>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            Talk together. Your AI is already in the room.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center md:mt-14">
            <CallPreview />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-10 max-w-xl text-lg font-medium text-[#0b1030]/70 md:mt-12">
            Coro AI is a chat and video space where friends talk, see each
            other, and ask one shared AI for help.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <Link
            to={ROUTES.auth}
            className="mt-8 inline-block rounded-full bg-[#0f1b5c] px-8 py-4 font-semibold text-white transition hover:bg-[#151c51]"
          >
            Get started
          </Link>
        </Reveal>
      </section>

      <section className="mt-24 grid gap-5 border-t border-[#0b1030]/10 pt-12 md:mt-32 md:grid-cols-3">
  {steps.map(({ n, title, text, color, bar }, i) => (
    <Reveal key={title} delay={i * 0.12}>
      <div
        className={`group h-full rounded-3xl border border-white/40 bg-white/40 p-7 text-left backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:bg-white/60 ${color}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold">{n}</span>
          <span
            className={`h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16 ${bar}`}
          />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight">{title}</h3>
        <p className="mt-3 font-medium leading-relaxed">{text}</p>
      </div>
    </Reveal>
  ))}
</section>
    </main>
  )
}