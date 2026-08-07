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

export const BIRTHDAY_FORMAT = "dd/mm/aaaa";
export const INVALID_BIRTHDAY_MESSAGE =
  "Ingresá una fecha válida en formato dd/mm/aaaa.";

export function isValidBirthday(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [ddStr, mmStr, yyyyStr] = value.split("/");
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);
  if (dd < 1 || dd > 31) return false;
  if (mm < 1 || mm > 12) return false;
  const currentYear = new Date().getFullYear();
  if (yyyy < 1900 || yyyy > currentYear) return false;
  const parsed = new Date(yyyy, mm - 1, dd);
  if (
    parsed.getFullYear() !== yyyy ||
    parsed.getMonth() !== mm - 1 ||
    parsed.getDate() !== dd
  ) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed > today) return false;
  return true;
}