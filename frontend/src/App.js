import { createContext, useState } from 'react';
import { getCartItem } from './api/apiOrder';
import './App.css';
import Main from './components/Main';
import { isAuthenticated, userInfo } from './utils/auth';
export const ItemContext = createContext()

function App() {
  let [item, setItem] = useState(0)
  let itemCouter = item => {
    setItem(item)
  }
  if (isAuthenticated()) {
    getCartItem(userInfo().token)
      .then(res => setItem(res.data.data.length))
  }
  return (
    <ItemContext.Provider value={[item, itemCouter]}>
      <Main></Main>
    </ItemContext.Provider >
  );
}

export default App;
