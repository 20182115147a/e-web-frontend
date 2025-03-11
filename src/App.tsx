
import { BrowserRouter } from "react-router-dom"
import  Routes from "./routes/Routes"
import Header from "./layouts/Header/Header"
import Footer from "./layouts/Footer/Footer"

function App() {
 
  return (
    <>
   <BrowserRouter>
    <Header></Header>
      <Routes></Routes>
    <Footer></Footer>
   </BrowserRouter>
    </>
  )
}

export default App
