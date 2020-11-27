import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";

import Context from './contexts/Context'

function App() {

  return (
    <Context.Provider value={1}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail" component={Detail} />
        </Switch>
      </Router>
    </Context.Provider>

  );
}

export default App;
