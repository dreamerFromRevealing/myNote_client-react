import React, {useState} from 'react';
import styles from "../../styles/Note.module.scss";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

const MDFieldComponent = () => {
  const [input, setInput] = useState('')


  return (
    <div className={styles.wrapper}>
      <textarea  autoFocus className={styles.textarea} value={input} onChange={e => setInput(e.target.value)}/>
      <ReactMarkdown
        className={styles.markdown}
        components={{
          code({inline, className, children}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {input}
      </ReactMarkdown>
    </div>
  );
};

export default MDFieldComponent;