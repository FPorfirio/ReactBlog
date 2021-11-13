import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

export const NotFound = () => {
  return (
    <div className="h-screen overflow-hidden bg-main-background flex flex-col items-center justify-center text-lg text-header-texture">
      <div className="">
        <h1 className="text-lg">Something went wrong</h1>
        <Link as={RouterLink} to="/">
          Go Home
        </Link>
      </div>
    </div>
  )
}
