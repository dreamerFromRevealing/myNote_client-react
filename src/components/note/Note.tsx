import React, {useEffect, useState} from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {NoteMarkDown, NoteTextArea, NoteWrapper} from "./styles"
import {useLazyQuery, useMutation} from "@apollo/client";
import {setStatus, switchSaveDocument} from "../../store/fileSlice/fileSlice";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import HeaderNote from "./HeaderNote";
import {GET_DOCUMENT, UPDATE_DOCUMENT} from "../../queries/entitis/Document";
const Note = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => state.file);
  const viewMode = useSelector((state: any) => state.app.viewMode);
  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  // TODO Поработать над роутером (docId из параметров адреса)
  const { docId } = useParams();
  const [getDocumentContent, {data}] = useLazyQuery(
    GET_DOCUMENT,
    {variables: {_id: docId}}
  );
  // Тут я выставляю инпут получая данные с кеша
  const [input, setInput] = useState('')
  const [mode, setMode] = useState({
    textarea: 50,
    markdown: 50
  })
  const callGetDocumentContent = () => {
    if (docId) {
      getDocumentContent()
        .then(data => {
          if (!!data?.data?.document) setInput(data?.data?.document.content)
        })
    }
  }

  useEffect(() => {
    switch (viewMode) {
      case 'only-text':
        setMode({
          textarea: 100,
          markdown: 0
        })
        break;
      case 'only-image':
        setMode({
          textarea: 0,
          markdown: 100
        })
        break;
      default:
        setMode({
          textarea: 50,
          markdown: 50
        })
        break;
    }
  }, [viewMode])

  useEffect(() => {
    callGetDocumentContent()
  }, [docId])

  useEffect(() => {
    if (!!state.saveDocument) {
      dispatch(setStatus('Сохранение...'))
      updateDocument({
        variables: {
          _id: docId,
          content: input
        }
      }).then(() => {
        dispatch(setStatus('Сохранено!'))
        dispatch(switchSaveDocument())
      }).catch(() => {
        dispatch(setStatus('Ошибка!'))
      }).finally(() => {
        setTimeout(() => {
          dispatch(setStatus('Ожидание...'))
        }, 3000)
      })

    }
  }, [state.saveDocument])

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        dispatch(switchSaveDocument())
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <HeaderNote title={data?.document?.title}/>
      <NoteWrapper>
        <NoteTextArea width={mode.textarea} autoFocus value={input} onChange={e => setInput(e.target.value)}/>
        <NoteMarkDown
          width={mode.markdown}
          components={{
            code({inline, className, children}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>{children}</code>
              )
            }
          }}
        >
          {input}
        </NoteMarkDown>
      </NoteWrapper>
    </>
  );
};

export default Note;