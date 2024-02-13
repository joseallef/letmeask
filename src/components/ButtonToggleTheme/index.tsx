import imgThemeDark from '../../assets/images/dark.svg';
import imgThemeLight from '../../assets/images/light.svg';

import { useTheme } from '../../hooks/useTheme';
import '../../styles/button.scss';
import './style.scss';


function ButtonToggleTheme() {

  const { toggleTheme, theme } = useTheme();

  return (
    <div className='content-toggle-theme'>
      <div className='button-toggle-theme'>
        <button onClick={toggleTheme}>
          <img src={imgThemeLight} alt="Thema claro" />
          <span className={theme}></span>
          <img src={imgThemeDark} alt="Thema escuro" />
        </button>
      </div>
    </div>
  )
}

export default ButtonToggleTheme;
