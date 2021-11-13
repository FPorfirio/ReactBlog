import { IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ReactComponent as CodeIcon } from '../../../assets/codeIcon.svg'

export const InsertCodeBtn = ({ contentRef, stateAction }) => {
  useEffect(() => {}, [])

  const handleClick = () => {
    stateAction((prevState) => {
      const currentText = prevState ? prevState : ''
      const txtFormat = '<code></code>'
      const formatedText = currentText + txtFormat
      const focusAt = formatedText.length + txtFormat.length
      contentRef.setSelectionRange(focusAt, focusAt)
      return formatedText
    })
  }
  return <IconButton onClick={handleClick} icon={<CodeIcon />} />
}
