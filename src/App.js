import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/header';
import PokemonAllDetails from './components/SinglePokemonPage';
import DeckPage from './pages/deck-page';
import HomePage from './pages/homepage/homepage.component';

const App = () => {

  

  return(
    <div className="App">
      <Header/>
    {
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/deck' element={<DeckPage/>}/>
        <Route path=':pokemonName' element={<PokemonAllDetails/>} />
      </Routes>
    }
    </div>
  )
}
export default App;