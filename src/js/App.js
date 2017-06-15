import React from 'react';
import { Route } from 'react-router-dom';
import Async from 'react-code-splitting';
import Header from './shared/Header';

const Home = () => <Async load={import('./components/Home')} />;
const SearchPage = () => <Async load={import('./components/SearchPage')} />;

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/search-assets" component={SearchPage} />
  </div>
);

// App.propTypes = {
//   user: PropTypes.shape({}).isRequired,
// };

// export default withRouter(connect(state => ({ user: state.user }))(App));
export default App;