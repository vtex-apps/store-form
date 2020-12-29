import * as React from 'react'
import { useMutation } from 'react-apollo'
import { useDropzone } from 'react-dropzone'
import { defineMessages, useIntl } from 'react-intl'
import {
  Button,
  IconClose,
  IconImage,
  Input,
  Spinner,
  IconCaretDown,
} from 'vtex.styleguide'
import { AtomicBlockUtils, CompositeDecorator, EditorState } from 'draft-js'

import Link from './Link'
import StyleButton from './StyleButton'
import { convertToEditorState, findLinkEntities } from './utils'
import UploadFileMutation from '../../graphql/uploadFile.graphql'
import { FormRawInputProps, InputTypes } from '../../typings/InputProps'
import { HiddenInput } from '../Input'

interface MutationData {
  uploadFile: { fileUrl: string }
}

const MAX_SIZE = 4 * 1024 * 1024

const messages = defineMessages({
  addBtn: {
    defaultMessage: 'Add',
    id: 'admin/pages.admin.rich-text-editor.add-button',
  },
  addTitle: {
    defaultMessage: 'Insert document',
    id: 'admin/pages.admin.rich-text-editor.add-document.title',
  },
  addLabel: {
    defaultMessage: 'Document URL',
    id: 'admin/pages.admin.rich-text-editor.add-document.label',
  },
  addPlaceholder: {
    defaultMessage: 'URL',
    id: 'admin/pages.admin.rich-text-editor.add-document.placeholder',
  },
  fileSizeError: {
    defaultMessage:
      'File exceeds the size limit of 4MB. Please choose a smaller one.',
    id: 'admin/pages.editor.document-uploader.error.file-size',
  },
  genericError: {
    defaultMessage: 'Something went wrong. Please try again.',
    id: 'admin/pages.editor.document-uploader.error.generic',
  },
  uploadBtn: {
    defaultMessage: 'Upload document',
    id: 'admin/pages.admin.rich-text-editor.upload-button',
  },
  uploadLabel: {
    defaultMessage: 'Choose an document to upload',
    id: 'admin/pages.admin.rich-text-editor.upload-document-label',
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
  const decorator = new CompositeDecorator([
    { strategy: findLinkEntities, component: Link },
  ])
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertToEditorState(''), decorator)
  )
  const { inputType = InputTypes.input, pointer, ...rest } = props

  const handleImage = (imageUrlTEST: string) => {
    const currentOffset = editorState
      .getCurrentContent()
      .getBlockMap()
      .keySeq()
      .findIndex(key => key === editorState.getSelection().getStartKey())

    const defEditorState =
      currentOffset === 0
        ? EditorState.moveFocusToEnd(editorState)
        : editorState

    const currentContentState = defEditorState.getCurrentContent()
    const contentStateWithEntity = currentContentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: imageUrlTEST }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(defEditorState, {
      currentContent: contentStateWithEntity,
    })
    return setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
  }

  const onDropImage = async (files: any[]) => {
    setError(null)

    try {
      if (files?.[0]) {
        setIsLoading(true)

        const { data, errors } = await uploadFile({
          variables: { file: files[0] },
        })

        if (errors) {
          setError(intl.formatMessage(messages.fileSizeError))
          return
        }

        setIsLoading(false)
        setIsOpen(false)
        setFileName(files?.[0].name)
        setImageUrl(data?.uploadFile.fileUrl)

        return data && handleImage(data.uploadFile.fileUrl)
      }
      return setError(intl.formatMessage(messages.fileSizeError))
    } catch (err) {
      setError(intl.formatMessage(messages.genericError))
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
    if (imageUrl) {
      return handleImage(imageUrl)
    }
  }

  return (
    <div className="vtex-styleguide-9-x-dropdown vtex-dropdown" ref={ref}>
      <span className="db mb3 w-100 c-on-base t-small">
        Operating Agreement
      </span>
      <StyleButton
        title={intl.formatMessage(messages.addTitle)}
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
                label={intl.formatMessage(messages.addLabel)}
                onChange={(e: any) => {
                  setImageUrl(e.target.value)
                }}
                placeholder={intl.formatMessage(messages.addPlaceholder)}
              />
            </div>

            <Button onClick={handleAddImage} size="small" disabled={!imageUrl}>
              {intl.formatMessage(messages.addBtn)}
            </Button>

            <div className="flex flex-column">
              <span className="db mb3 w-100 c-on-base t-small">
                {intl.formatMessage(messages.uploadLabel)}
              </span>
              <div {...getRootProps()} className="flex flex-column">
                <input {...getInputProps()} />
                <Button size="small">
                  {intl.formatMessage(messages.uploadBtn)}
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
