import React, {useEffect, useState} from "react";
import {DoubleScreenWrapper, LeftSide, RightSide} from "../../note/styles";
import {useSelector} from "react-redux";

const DoubleScreen = () => {
  const viewMode = useSelector((state: any) => state.app.viewMode);
  const [mode, setMode] = useState({
    textarea: 50,
    markdown: 50
  })

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

  return (
      <DoubleScreenWrapper>
        <LeftSide width={mode.textarea}/>
        <RightSide  width={mode.markdown}/>
      </DoubleScreenWrapper>
  );
};

export default DoubleScreen;