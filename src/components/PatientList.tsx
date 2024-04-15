import { usePatientStore } from "../store";
import { toast } from "react-toastify";

export const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);
  const activeId = usePatientStore((state) => state.setActiveID);
  const deletePatient = usePatientStore((state) => state.deletePatient);
  return (
    <div className="w-full md:col-span-3">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Administra tus {""}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>
      <div className="md:h-screen overflow-y-scroll">
        {patients.map((patient) => {
          return (
            <div
              key={patient.id}
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 flex flex-col space-y-3"
            >
              <label className="font-bold text-gray-600">
                ID: <span className="font-normal">{patient.id}</span>
              </label>
              <label className="font-bold text-gray-600">
                NOMBRE: <span className="font-normal">{patient.name}</span>
              </label>
              <label className="font-bold text-gray-600">
                PROPIETARIO:{" "}
                <span className="font-normal">{patient.caretaker}</span>
              </label>
              <label className="font-bold text-gray-600">
                EMAIL: <span className="font-normal">{patient.email}</span>
              </label>
              <label className="font-bold text-gray-600">
                FECHA ALTA:{" "}
                <span className="font-normal">{patient.date.toString()}</span>
              </label>
              <label className="font-bold text-gray-600">
                SÍNTOMAS:{" "}
                <span className="font-normal">{patient.symptoms}</span>
              </label>
              <div className="flex flex-col gap-4 md:flex-row justify-between pt-6">
                <button
                  onClick={() => activeId(patient.id)}
                  className="py-2 px-10 font-bold text-white bg-indigo-600 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    deletePatient(patient.id);
                    toast.error("Paciente eliminado");
                  }}
                  className="py-2 px-10 font-bold text-white bg-red-600 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
