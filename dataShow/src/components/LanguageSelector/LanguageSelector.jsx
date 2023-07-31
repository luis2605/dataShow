import React ,{useState} from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import i18n from '../../i18n';
import classes from './languageSelector.module.css'

const LanguageSelector = () => {

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

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

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

  return (
    // <div className={classes["selector-container"]}>
    //   <label htmlFor="languageSelect">Select Language:</label>
    //   <select id="languageSelect" onChange={handleChangeLanguage} value={i18n.language}>
    //     <option value="en">English</option>
    //     <option value="de">German</option>
    //     {/* Add more language options as needed */}
    //   </select>

    // </div>
    
    <div className={classes['switch-lang']}>
    <div className={classes['current-lang']} onClick={toggleDropdown}>
      <img src={languages.find(lang => lang.name === currentLang).flag} className={classes['lang-flag']} alt={currentLang} />
      <p className={classes['lang-text']}>{currentLang}</p>
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
