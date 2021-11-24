import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import { useEffect } from 'react'
import React from 'react'
//slate js will produce a json object that contains properties called like block html elements, i.e: "p" and subproperties of these will have the inline elements i.e: "strong" */

//utility for removing empty nodes that slatejs adds on linebreaks
const filterEmpty = (post) => {
  return post.filter((block) => {
    const children = block.children
    const isEmpty = children.length == 1 && children[0].text == ''
    return !isEmpty
  })
}

const isCode = (block) => {
  return block?.children?.some((childNode) => childNode.code == true)
}

//slate wraps every <code> element inside a <p>. This function unwrap <p> and wrap children together inside a single <pre> element
const formatCodeBlocks = (post) => {
  return post.reduce((currBlock, nextBlock) => {
    const lastBlock = currBlock[currBlock.length - 1]
    if (isCode(lastBlock) && isCode(nextBlock)) {
      //merge children code nodes and create a new block with a single merged node as children
      const mergedTxtCode = `${lastBlock.children[0].text}\n${nextBlock.children[0].text}`
      const newChildren = { ...lastBlock.children[0], text: mergedTxtCode }
      const newBlock = { type: 'pre', children: [newChildren] }
      currBlock.splice(-1, 1, newBlock)
      return currBlock
    }
    return currBlock.concat(nextBlock)
  }, [])
}

const FormatInline = ({ inlineTags }) => {
  const textContent = inlineTags.text
  const tags = Object.keys(inlineTags)
  if (!textContent) {
    return null
  }

  let nestedTags = textContent
  for (const tag of tags) {
    switch (tag) {
      case 'italic':
        nestedTags = <em>{nestedTags}</em>
        break
      case 'bold':
        nestedTags = <strong>{nestedTags}</strong>
        break
      case 'underline':
        nestedTags = <u>{nestedTags}</u>
        break
      case 'code':
        nestedTags = (
          <pre>
            <code className="language-js codeBlock">{nestedTags}</code>
          </pre>
        )
    }
  }
  return nestedTags
}

const FormatBlock = ({ block }) => {
  const inlineChildren = block.children
  const inlineElements = inlineChildren.reduce(
    (currElement, nextElement) => {
      //check if element is already a jsx object
      const isFormated = currElement.hasOwnProperty('text') ? (
        <FormatInline inlineTags={currElement} />
      ) : (
        currElement
      )

      return (
        <>
          {isFormated}
          <FormatInline inlineTags={nextElement} />
        </>
      )
    },
    //if children length is 1 and no initial value is provide, reduce method will skipe the callback
    { text: '' }
  )

  switch (block.type) {
    case 'paragraph':
      return <p>{inlineElements}</p>
    case 'heading-one':
      return <h1>{inlineElements}</h1>
    case 'heading-two':
      return (
        <h2 className="border border-outline font-heading text-2xl md:text-4xl">
          {inlineElements}
        </h2>
      )
    case 'block-quote':
      return (
        <blockquote className="blockquote font-text text-xl italic">
          {inlineElements}
        </blockquote>
      )
    case 'bulleted-list':
      return <ul>{inlineElements}</ul>
    case 'numbered-list':
      return <ol>{inlineElements}</ol>
    case 'pre':
      return <pre>{inlineElements}</pre>
    default:
      return <>{inlineElements}</>
  }
}

export const FormattedPost = ({ post }) => {
  const filteredPost = filterEmpty(post)
  const formatedBlocks = formatCodeBlocks(filteredPost)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return formatedBlocks.map((block, index) => {
    //insert HR tag for tematic breaking for h2 headings unless it is the first one
    if (block.type == 'heading-two' && index != 0) {
      return (
        <React.Fragment key={`item-${index}`}>
          <hr className="my-8 h-2.5 hr w-2/3 self-center shadow-xl" />
          <FormatBlock block={block} />
        </React.Fragment>
      )
    }
    return <FormatBlock key={`item-${index}`} block={block} />
  })
}
