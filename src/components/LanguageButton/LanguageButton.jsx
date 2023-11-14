import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyLanguage } from "../../store/slices/languageSlice";

const LanguageButton = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.languageSlice.language);

  const handleLanguageChange = () => {
    if (language === "español") {
      dispatch(modifyLanguage("english"));
    } else if (language === "english") {
      dispatch(modifyLanguage("español"));
    }
  };

  return <button onClick={handleLanguageChange}>{language}</button>;
};

export default LanguageButton;
