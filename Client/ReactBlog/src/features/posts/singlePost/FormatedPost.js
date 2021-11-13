import { Code, Text } from '@chakra-ui/react'

const isCodeFormat = (paragraph) => {
  return paragraph.includes('<code>')
}

export const FormattedPost = ({ post }) => {
  const paragraphs = post.split(/\r?\n/)

  const formatedPost = paragraphs.map((paragraph) => {
    console.log(post)
    if (isCodeFormat(paragraph)) {
      const regex = /(?:<code>)|(?:<\/code>)/gm
      const formattedParagraph = paragraph.replace(regex, '')
      return <Code> {formattedParagraph} </Code>
    }
    return <Text>{paragraph}</Text>
  })

  return formatedPost
}
