import type { StepsProps } from 'antd'
import type { TourProps } from 'antd/lib'
import { get, set } from 'idb-keyval'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Result } from 'antd'

const useTutorial = () => {
  const { t } = useTranslation(['main'])
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean | null>(
    true,
  )
  const [startTour, setStartTour] = useState(false)
  const TUTORIAL_KEY = 'tutorials.config.completed'

  const refs = {
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null),
    step5: useRef(null),
    step6: useRef(null),
  }

  const steps: TourProps['steps'] = useMemo(
    () => [
      {
        title: t('dashboard:config.tutorial.step1.title'),
        description: t('dashboard:config.tutorial.step1.description'),
        target: () => refs.step1.current,
      },
      {
        title: t('dashboard:config.tutorial.step2.title'),
        description: t('dashboard:config.tutorial.step2.description'),
        target: () => refs.step2.current,
      },
      {
        title: t('dashboard:config.tutorial.step3.title'),
        description: t('dashboard:config.tutorial.step3.description'),
        target: () => refs.step3.current,
      },
      {
        title: t('dashboard:config.tutorial.step4.title'),
        description: t('dashboard:config.tutorial.step4.description'),
        target: () => refs.step4.current,
      },
      {
        title: t('dashboard:config.tutorial.step5.title'),
        description: t('dashboard:config.tutorial.step5.description'),
        target: () => refs.step5.current,
      },
      {
        title: t('dashboard:config.tutorial.step6.title'),
        description: t('dashboard:config.tutorial.step6.description'),
        target: () => refs.step6.current,
      },
      {
        title: t('dashboard:config.tutorial.step7.title'),
        description: t('dashboard:config.tutorial.step7.description'),
        target: () => refs.step2.current,
      },
    ],
    [t],
  )

  useEffect(() => {
    ;(async () => {
      const status = await get<boolean>(TUTORIAL_KEY)
      setTutorialCompleted(status ?? false)
    })()
  }, [])

  const completeTutorial = async () => {
    await set(TUTORIAL_KEY, true)
    setTutorialCompleted(true)
  }

  return { tutorialCompleted, completeTutorial, steps, refs, startTour }
}

export { useTutorial }
