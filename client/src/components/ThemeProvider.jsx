import { useSelector } from "react-redux";
import propTypes from 'prop-types';

export default function ThemeProvider({children}) {
  const {theme} = useSelector(state => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,)] min-h-screen">
        {children}
      </div>
    </div>
  )
} 

ThemeProvider.propTypes = {
  children: propTypes.node
};
