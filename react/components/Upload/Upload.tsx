import * as React from 'react'
import { useMutation } from 'react-apollo'
import { useDropzone } from 'react-dropzone'
import { useIntl, defineMessages } from 'react-intl'
import { IOMessage } from 'vtex.native-types'
import {
  Button,
  IconClose,
  IconImage,
  Input,
  Spinner,
  IconCaretDown,
} from 'vtex.styleguide'

import StyleButton from './StyleButton'
import UploadFileMutation from '../../graphql/uploadFile.graphql'
import { FormRawInputProps, InputTypes } from '../../typings/InputProps'
import { HiddenInput } from '../Input'

interface MutationData {
  uploadFile: { fileUrl: string }
}

const MAX_SIZE = 4 * 1024 * 1024

const messages = defineMessages({
  titleLabel: {
    id: 'store/form.operating.agreement',
    defaultMessage: '',
  },
  add: {
    id: 'store/form.add-button',
    defaultMessage: '',
  },
  uploadLabel: {
    id: 'store/form.upload-document-label',
    defaultMessage: '',
  },
  uploadButton: {
    id: 'store/form.upload-button',
    defaultMessage: '',
  },
})

const InputUpload = (props: FormRawInputProps) => {
  const intl = useIntl()
  const [uploadFile] = useMutation<MutationData>(UploadFileMutation)
  const ref = React.useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState<string | undefined>()
  const [error, setError] = React.useState<string | null>()

  const { inputType = InputTypes.input, pointer, ...rest } = props

  const onDropImage = async (files: File[]) => {
    setError(null)

    try {
      if (files?.[0]) {
        setIsLoading(true)

        const { data, errors } = await uploadFile({
          variables: { file: files[0] },
        })

        if (errors) {
          setError(
            intl.formatMessage({
              id: 'store/form.document-uploader.error.file-size',
            })
          )
          return
        }

        setIsLoading(false)
        setIsOpen(false)
        setFileName(files?.[0].name)
        setImageUrl(data?.uploadFile.fileUrl)

        return data
      }
      return setError(
        intl.formatMessage({
          id: 'store/form.document-uploader.error.file-size',
        })
      )
    } catch (err) {
      setError(
        intl.formatMessage({ id: 'store/form.document-uploader.error.generic' })
      )
      setIsLoading(false)
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    accept: '.pdf, image/*',
    maxSize: MAX_SIZE,
    multiple: false,
    onDrop: onDropImage,
  })

  const handleAddImage = () => {
    setIsOpen(false)
  }

  return (
    <div className="vtex-styleguide-9-x-dropdown vtex-dropdown" ref={ref}>
      <span className="db mb3 w-100 c-on-base t-small">
        <IOMessage id={messages.titleLabel.id} />
      </span>
      <StyleButton
        title={intl.formatMessage({ id: 'store/form.add-document.title' })}
        active={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        style={null}
        label={
          <div className="flex flex-row justify-between items-center w-100 pa4">
            <IconImage />
            <IconCaretDown size={8} />
          </div>
        }
      />

      {isOpen && (
        <div className="absolute pa5 bg-white b--solid b--muted-4 bw1 br2 w5 z-1">
          {isLoading && (
            <div className="absolute flex justify-center items-center top-0 left-0 h-100 w-100 br2 z-1 bg-black-05">
              <Spinner />
            </div>
          )}

          <div className={`flex flex-column ${isLoading && 'o-20'}`}>
            <div className="mb4">
              <Input
                label={intl.formatMessage({
                  id: 'store/form.add-document.label',
                })}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setImageUrl(e.target.value)
                }}
                placeholder={intl.formatMessage({
                  id: 'store/form.add-document.placeholder',
                })}
              />
            </div>

            <Button onClick={handleAddImage} size="small" disabled={!imageUrl}>
              <IOMessage id={messages.add.id} />
            </Button>

            <div className="flex flex-column">
              <span className="db mb3 w-100 c-on-base t-small">
                <IOMessage id={messages.uploadLabel.id} />
              </span>
              <div {...getRootProps()} className="flex flex-column">
                <input {...getInputProps()} />
                <Button size="small">
                  <IOMessage id={messages.uploadButton.id} />
                </Button>
              </div>
            </div>

            {error && (
              <div className="flex flex-row c-danger t-small justify-center items-center mt5">
                <IconClose />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      )}
      {fileName}

      {inputType && (
        <HiddenInput pointer={pointer} {...rest} value={imageUrl} />
      )}
    </div>
  )
}

export default InputUpload
