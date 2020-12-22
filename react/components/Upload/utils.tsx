import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  CharacterMetadata,
} from 'draft-js'
import { mdToDraftjs } from 'draftjs-md-converter'

export function convertToEditorState(markdownText: string) {
  const rawMarkdown = mdToDraftjs(markdownText)
  return convertFromRaw(rawMarkdown)
}

export function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  return contentBlock.findEntityRanges((character: CharacterMetadata) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}
