import './App.css';
import ProductList from './components/ProductList/ProductList';
import ClientContext, { client } from './context/CllientContext';


const App = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper table-striped table-hover">
          <ClientContext.Provider value={client}>
            <ProductList />
          </ClientContext.Provider>
        </div>  
      </div>
    </div>
  )
}

export default App;
