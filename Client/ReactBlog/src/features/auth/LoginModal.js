import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { LoginView } from './loginView'

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Login</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <LoginView closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
