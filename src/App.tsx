import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PatientForm } from "./components/PatientForm";
import { PatientList } from "./components/PatientList";

function App() {
  return (
    <>
      <div className="container pt-1 mx-auto max-w-7xl px-4">
        <div className="mt-12 grid md:grid-cols-5 gap-9">
          <PatientForm />
          <PatientList />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
