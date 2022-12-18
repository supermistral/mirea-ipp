import './App.css';
import ContactList from './components/ContactList/ContactList';


const App = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper table-striped table-hover">
          <ContactList />
        </div>  
      </div>
    </div>
  )
}

export default App;
