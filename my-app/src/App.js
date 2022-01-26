import './App.css';
import MultiValueField from './components/MultiValueField';

function App() {

  let fieldValues=['Cat', 'Dog', 'Snake', 'Parrot', 'Small cat', 'Big cat', 'Mice']

  return (
    <MultiValueField  values={fieldValues}/>
  );
}

export default App;
