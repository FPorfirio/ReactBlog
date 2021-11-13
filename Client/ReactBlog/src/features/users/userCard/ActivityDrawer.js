import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Spinner,
  Heading,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export const ActivityDrawer = ({ content, onClose, isOpen }) => {
  let tabContent = null

  if (content.blogsLoading) {
    tabContent = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  } else if (content.error) {
    tabContent = <div>{content.blogsError}</div>
  } else {
    tabContent = (
      <ul>
        {content.blogs.map((blog) => (
          <li className="py-1.5" key={blog.id}>
            <Link as={RouterLink} to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Heading
            textAlign="center"
            color="gray.500"
            size="xl"
            fontFamily="Prompt"
            as="h3"
          >
            Latest Post
          </Heading>
        </DrawerHeader>
        <DrawerBody bg="#034b67" color="gainsboro">
          {tabContent}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
