import { Link as RouterLink } from 'react-router-dom'
import { Box, Heading, Link, Text, Img, Tag } from '@chakra-ui/react'

export const PostCard = ({ blog, blogImg }) => {
  return (
    <div className="md:h-60 grid gap-4 blogCard shadow-md pl-4 pr-2 py-2 bg-gainsboro">
      <Heading
        fontFamily="Red Hat Display"
        px="1"
        gridArea="title"
        shadow="md"
        as="h2"
      >
        <Link
          color="#034b67"
          fontSize={{ base: '2xl', md: '3xl' }}
          w="full"
          as={RouterLink}
          to={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Link>
      </Heading>
      <Img
        gridArea="img"
        maxHeight="100%"
        objectFit="cover"
        width="100%"
        height="100%"
        src={blogImg.toURL()}
      />
      <Text
        gridArea="description"
        fontFamily="Darker Grotesque"
        fontWeight="bold"
        fontSize={{ base: 'md', sm: 'xl', lg: '2xl' }}
      >
        Simple post explaning the stack and structure decisions in this blog
      </Text>
      <Box gridArea="badges" className="flex flex-wrap gap-3 items-center">
        {blog.tags.map((tag, index) => (
          <Tag key={`item-${index}`} size="lg">
            {tag}
          </Tag>
        ))}
      </Box>
    </div>
  )
}
