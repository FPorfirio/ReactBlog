import React, { useRef, useState, useCallback } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate'
import { IconButton } from '@chakra-ui/react'
import { ReactComponent as CodeIcon } from '../../../assets/slateEditor/codeIcon.svg'
import { ReactComponent as BoldIcon } from '../../../assets/slateEditor/boldIcon.svg'
import { ReactComponent as H1Icon } from '../../../assets/slateEditor/h1Icon.svg'
import { ReactComponent as H2Icon } from '../../../assets/slateEditor/h2Icon.svg'
import { ReactComponent as UlIcon } from '../../../assets/slateEditor/ulIcon.svg'
import { ReactComponent as OlIcon } from '../../../assets/slateEditor/olIcon.svg'
import { ReactComponent as ItalicIcon } from '../../../assets/slateEditor/italicIcon.svg'
import { ReactComponent as UnderlineIcon } from '../../../assets/slateEditor/underlineIcon.svg'
import { ReactComponent as QuoteIcon } from '../../../assets/slateEditor/quoteIcon.svg'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const SlateEditor = ({ handleInput, value }) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editorRef = useRef()
  if (!editorRef.current) editorRef.current = withReact(createEditor())
  const editor = editorRef.current
  console.log(value)
  return (
    <Slate editor={editor} value={value} onChange={handleInput}>
      <div className="flex flex-wrap gap-1 mb-1">
        <MarkButton format="bold" Icon={BoldIcon} />
        <MarkButton format="italic" Icon={ItalicIcon} />
        <MarkButton format="underline" Icon={UnderlineIcon} />
        <MarkButton format="code" Icon={CodeIcon} />
        <BlockButton format="heading-one" Icon={H1Icon} />
        <BlockButton format="heading-two" Icon={H2Icon} />
        <BlockButton format="block-quote" Icon={QuoteIcon} />
        <BlockButton format="numbered-list" Icon={OlIcon} />
        <BlockButton format="bulleted-list" Icon={UlIcon} />
      </div>
      <Editable
        className=""
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

//slateJS utility functions
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

//different block elements to render in the editable component
const Element = ({ attributes, children, element }) => {
  console.log(element)
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

//different inline elements to render in the editable component
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

//format buttons
const BlockButton = ({ format, Icon }) => {
  const editor = useSlate()
  return (
    <IconButton
      size="sm"
      colorScheme="teal"
      color="black"
      variant="outline"
      isActive={isBlockActive(editor, format) ? 1 : 0}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      icon={<Icon />}
    />
  )
}

const MarkButton = ({ format, Icon }) => {
  const editor = useSlate()
  return (
    <IconButton
      size="sm"
      colorScheme="teal"
      color="black"
      variant="outline"
      isActive={isMarkActive(editor, format) ? 1 : 0}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      icon={<Icon />}
    />
  )
}
