import { useForm, SubmitHandler } from "react-hook-form";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import { toast } from 'react-toastify';

export const PatientForm = () => {
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);

  useEffect(() => {
    if (activeId) {
      const patient = patients.filter((patient) => patient.id === activeId)[0];
      setValue("name", patient.name);
      setValue("caretaker", patient.caretaker);
      setValue("email", patient.email);
      setValue("symptoms", patient.symptoms);
      setValue("date", patient.date);
    }
  }, [activeId]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DraftPatient>();

  const registerPatient: SubmitHandler<DraftPatient> = (data) => {
    if (activeId !== "") {
      updatePatient(activeId, data);
    } else {
      addPatient(data);
    }
    toast.success("Paciente guardado correctamente");
    reset();
  };
  return (
    <div className="w-full md:col-span-2">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
          <div className="text-red-600">{errors.name?.message}</div>
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario es obligatorio",
            })}
          />
          <div className="text-red-600">{errors.caretaker?.message}</div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
          <div className="text-red-600">{errors.email?.message}</div>
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "La fecha es obligatoria",
            })}
          />
          <div className="text-red-600">{errors.date?.message}</div>
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Los síntomas son obligatorios",
            })}
          ></textarea>
          <div className="text-red-600">{errors.symptoms?.message}</div>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
};
