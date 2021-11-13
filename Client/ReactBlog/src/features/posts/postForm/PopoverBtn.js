import { useField } from '../../../common/hooks'
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { validateTags } from './validations'

export const PopoverBtn = ({ stateAction, Icon, buttonTxt, description }) => {
  const { type, onChange, reset, value, error } = useField({
    type: 'text',
    validator: validateTags,
  })

  const handleSubmit = (e) => {
    if (!value.length) {
      return
    } else if (e.key == 'Enter') {
      e.preventDefault()
      stateAction((prevState) => {
        const newTags = value.split(' ')
        const mergedTags = prevState.concat(newTags)
        const filterDuplicate = [...new Set(mergedTags)]
        return filterDuplicate
      })
      reset()
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<Icon />}>{buttonTxt}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{description}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <FormControl isInvalid={error}>
            <Input
              type={type}
              value={value}
              onChange={onChange}
              onKeyPress={handleSubmit}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
