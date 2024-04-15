import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DraftPatient, Patient } from "./types";
import { v4 } from "uuid";

interface PatientState {
  patients: Patient[];
  activeId: string;
  addPatient: (patient: DraftPatient) => void;
  setActiveID: (id: Patient["id"]) => void;
  deletePatient: (id: Patient["id"]) => void;
  updatePatient: (id: Patient["id"], patient: DraftPatient) => void;
}

const generatePatient = (patient: DraftPatient): Patient => {
  return {
    id: v4(),
    ...patient,
  };
};

export const usePatientStore = create<PatientState>()(
  devtools((set, get) => ({
    patients: [],
    activeId: "",
    addPatient: (patient) => {
      const newPatient = generatePatient(patient);
      set((state) => ({
        patients: [...state.patients, newPatient],
      }));
    },
    setActiveID: (id) => {
      set(() => ({
        activeId: id,
      }));
    },
    deletePatient: (id) => {
      const patients = get().patients;
      const deletedPatients = patients.filter((p) => p.id !== id);
      set(() => ({
        patients: deletedPatients,
      }));
    },
    updatePatient: (id, patient) => {
      const patients = get().patients;
      const updatedPatients = patients.map((p) => {
        if (p.id === id) {
          return {
            id: id,
            ...patient,
          };
        }

        return p;
      });
      set(() => ({
        patients: updatedPatients,
        activeId: "",
      }));
    },
  }))
);
