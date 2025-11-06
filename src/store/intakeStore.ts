import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IntakeData {
  hasIdentification: boolean | null;
  name: string;
  country: string;
  passportNumber: string;
  additionalInfo: string;
}

interface IntakeStore {
  intakeData: IntakeData;
  isIntakeComplete: boolean;
  updateIntakeData: (data: Partial<IntakeData>) => void;
  clearIntakeData: () => void;
  checkIntakeCompletion: () => void;
}

const initialIntakeData: IntakeData = {
  hasIdentification: null,
  name: '',
  country: '',
  passportNumber: '',
  additionalInfo: ''
};

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set, get) => ({
      intakeData: initialIntakeData,
      isIntakeComplete: false,
      updateIntakeData: (data) => {
        set((state) => {
          const newIntakeData = { ...state.intakeData, ...data };
          const isComplete = checkCompletion(newIntakeData);
          return {
            intakeData: newIntakeData,
            isIntakeComplete: isComplete
          };
        });
      },
      clearIntakeData: () => set({ 
        intakeData: initialIntakeData, 
        isIntakeComplete: false 
      }),
      checkIntakeCompletion: () => {
        const { intakeData } = get();
        const isComplete = checkCompletion(intakeData);
        set({ isIntakeComplete: isComplete });
      }
    }),
    {
      name: 'ice-cbp-intake',
    }
  )
);

function checkCompletion(data: IntakeData): boolean {
  // Required: identification status, name, and country
  const hasRequiredFields = 
    data.hasIdentification !== null &&
    data.name.trim() !== '' &&
    data.country.trim() !== '';

  // If they have identification, passport number should be provided
  if (data.hasIdentification === true) {
    return hasRequiredFields && data.passportNumber.trim() !== '';
  }

  // If no identification, just need name and country
  return hasRequiredFields;
}