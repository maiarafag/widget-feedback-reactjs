import { ArrowLeft, Camera } from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../services/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface Props {
  type: FeedbackType
  onBack(): void
  onSend(): void
}

export function FeedbackContentStep(props: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSending, setIsSending] = useState(false)

  const feedbacktypeInfo = feedbackTypes[props.type]

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsSending(true)

    await api.post('/feedbacks', {
      type: props.type,
      comment,
      screenshot
    })

    setIsSending(false)
    props.onSend()
  }

  return (
    <>
      <header>

        <button type="button"
          onClick={props.onBack}
          className="absolute top-5 left-5 text-zinc-300 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbacktypeInfo.image.source} alt={feedbacktypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbacktypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmit} className="my-4 w-full">
        <textarea
          className={`
            min-w-[384px] w-full min-h-[112px]
            text-sm bg-transparent rounded-md
            placeholder-zinc-400 text-zinc-100
            hover:border-brand-400 border-solid
            resize-none focus:outline-none
          `}
          placeholder="Conte pra gente o que aconteceu!"
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onTake={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSending}
            className={`
              p-2 bg-brand-500 rounded-md border-transparent
              flex-1 flex justify-center items-center text-sm
              hover:bg-brand-300  focus:outline-zinc-900
              transition-colors disabled:opacity-50
              disabled:hover:bg-brand-300
            `}
          >
            {
              isSending ? <Loading /> : 'Enviar feedback!'
            }
          </button>
        </footer>
      </form>
    </>
  )
}