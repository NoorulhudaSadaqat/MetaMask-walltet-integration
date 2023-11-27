import ConnectWallet from "./component/connectWallet";
import SwitchChain from "./component/switchChain";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"

function App() {

  return (
    <div>
     <Router>
      <Routes>
      <Route path="/" element={<ConnectWallet/>}/>
      <Route path="/chains" element={<SwitchChain/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
