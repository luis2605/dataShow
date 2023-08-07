import React ,{useState} from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

import classes from './languageSelector.module.css'

const LanguageSelector = ({onJsonData}) => {

  const [currentLang, setCurrentLang] = useState('English');
  const [showDropdown, setShowDropdown] = useState(false);
  const { i18n } = useTranslation(); // Use the useTranslation hook to get i18n
 
  const languages = [
    { name: 'English', flag: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png' },
    { name: 'Español', flag: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Spain.png' },
    // { name: 'Français', flag: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_France.png' },
    // { name: 'Italiano', flag: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Italy.png' },
    { name: 'Deutsch', flag: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Germany.png' },
  ];


  const handleLanguageChange = (language) => {
    console.log(language)
    setCurrentLang(language);
    if(language==='English'){
      i18n.changeLanguage('en');
    }else if(language==='Deutsch'){
      i18n.changeLanguage('de');
    }
    else if(language==='Español'){
      i18n.changeLanguage('es');
    }
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const currentLangClasses = onJsonData ?  classes['current-lang-blue']:classes['current-lang'] ;
  const langTextClasses = onJsonData ?  classes['lang-text-white']:classes['lang-text'] ;

  return (

    
    <div id='step8' className={classes['switch-lang']}>
    <div className={currentLangClasses} onClick={toggleDropdown}>
      <img src={languages.find(lang => lang.name === currentLang).flag} className={classes['lang-flag']} alt={currentLang} />
      <p className={langTextClasses}>{currentLang}</p>
    </div>

    {showDropdown && (
      <div className={classes['lang-dropdown']}>
        {languages.map((lang) => (
          <div key={lang.name} className={classes['selecting-lang']} onClick={() => handleLanguageChange(lang.name)}>
            <img src={lang.flag} className={classes['lang-flag']} alt={lang.name} />
            <p className={classes['lang-text']}>{lang.name}</p>
          </div>
        ))}
      </div>
    )}
  </div>

  );
};

export default LanguageSelector;
