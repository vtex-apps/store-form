import React, { useContext, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useCssHandles } from 'vtex.css-handles'

import { SubmitContext } from './logic/formState'

export type FormCaptchaProps = {
  captchaKey?: string
}

const CSS_HANDLES = ['FormCaptchaContainer', 'FormCaptchaButton'] as const

export default function FormCaptcha({ captchaKey }: FormCaptchaProps) {
  const { handlerOnChangeCaptcha } = useContext(SubmitContext)
  const handles = useCssHandles(CSS_HANDLES)
  useEffect(() => {
    handlerOnChangeCaptcha({ value: null, captchaKey })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (captchaKey) {
    return (
      <div className={handles.FormCaptchaContainer}>
        <ReCAPTCHA
          onChange={value => {
            handlerOnChangeCaptcha({ value, captchaKey })
          }}
          onErrored={() => {
            handlerOnChangeCaptcha({
              value: null,
              captchaKey,
              captchaError: true,
            })
          }}
          sitekey={captchaKey}
        />
      </div>
    )
  }
  return null
}
