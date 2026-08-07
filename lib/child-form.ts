export type Room = "Soles" | "Lunas" | "Estrellas";
export const ROOMS: readonly Room[] = ["Soles", "Lunas", "Estrellas"];

export interface ChildFormLabels {
  modalTitle: string;
  cancelLabel: string;
  saveLabel: string;
  nameFieldLabel: string;
  namePlaceholder: string;
  birthdayFieldLabel: string;
  birthdayPlaceholder: string;
  roomFieldLabel: string;
  allergiesFieldLabel: string;
  allergiesPlaceholder: string;
  notesFieldLabel: string;
  notesPlaceholder: string;
}

export const CHILD_FORM_LABELS: ChildFormLabels = {
  modalTitle: "Agregar niño",
  cancelLabel: "Cancelar",
  saveLabel: "Guardar",
  nameFieldLabel: "NOMBRE COMPLETO",
  namePlaceholder: "Ej. Martina López",
  birthdayFieldLabel: "FECHA DE NACIMIENTO",
  birthdayPlaceholder: "dd/mm/aaaa",
  roomFieldLabel: "SALA",
  allergiesFieldLabel: "ALERGIAS (ETIQUETAS)",
  allergiesPlaceholder: "Ej. Maní, Lactosa",
  notesFieldLabel: "NOTAS MÉDICAS",
  notesPlaceholder: "Indicaciones, medicación, contactos…",
};