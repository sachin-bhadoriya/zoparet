import Navbar from './components/Navbar'
import Home from './pages/Home'
import useSmoothScroll from './hooks/useSmoothScroll'

const App = () => {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <Home />
    </>
  )
}

export default App
