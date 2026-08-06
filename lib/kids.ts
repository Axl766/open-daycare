export type BadgeStyle = {
  background: string;
  text: string;
};

export type FlagLabel = "MANÍ" | "LACTOSA" | "VINCULAR";

export interface ChildFlag {
  label: FlagLabel;
  style: BadgeStyle;
}

export interface AvatarStyle {
  background: string;
  foreground: string;
}

export type ParentLinkStatus = "active" | "pending";

export interface Parent {
  id: string;
  name: string;
  roleLabel: string;
  statusLabel: string;
  statusStyle: BadgeStyle;
  avatarInitial: string;
  avatarStyle: AvatarStyle;
  linkStatus: ParentLinkStatus;
}

export interface Child {
  id: string;
  name: string;
  avatarInitial: string;
  avatarStyle: AvatarStyle;
  ageYearsLabel: string;
  parentsCountLabel: string;
  flags: ChildFlag[];
  roomLabel: string;
  birthDateLabel: string;
  ingresoLabel: string;
  allergiesTitle: string;
  allergiesBody: string;
  parents: Parent[];
}

export const FLAG_STYLES: Record<FlagLabel, BadgeStyle> = {
  MANÍ: { background: "#FBD8CC", text: "#D9684A" },
  LACTOSA: { background: "#FBD8CC", text: "#D9684A" },
  VINCULAR: { background: "#F9D2DE", text: "#C56486" },
};

export const KIDS: readonly Child[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    avatarInitial: "M",
    avatarStyle: { background: "#A9D9E8", foreground: "#1F7A93" },
    ageYearsLabel: "3 años",
    parentsCountLabel: "2 padres vinculados",
    flags: [{ label: "MANÍ", style: FLAG_STYLES.MANÍ }],
    roomLabel: "Soles",
    birthDateLabel: "12 mar 2022",
    ingresoLabel: "feb 2025",
    allergiesTitle: "Alergias y notas",
    allergiesBody:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        id: "lucia-fernandez",
        name: "Lucía Fernández",
        roleLabel: "Mamá · activa",
        statusLabel: "ACTIVA",
        statusStyle: { background: "#CFEBD8", text: "#3E9B6C" },
        avatarInitial: "L",
        avatarStyle: { background: "#C9B6E8", foreground: "#fff" },
        linkStatus: "active",
      },
      {
        id: "diego-fernandez",
        name: "Diego Fernández",
        roleLabel: "Papá · invitación enviada",
        statusLabel: "PENDIENTE",
        statusStyle: { background: "#F7E7A6", text: "#9A7B1E" },
        avatarInitial: "D",
        avatarStyle: { background: "#A9C7E8", foreground: "#fff" },
        linkStatus: "pending",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    avatarInitial: "S",
    avatarStyle: { background: "#F4B8CC", foreground: "#C44A7A" },
    ageYearsLabel: "2 años",
    parentsCountLabel: "1 padre vinculado",
    flags: [],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    avatarInitial: "B",
    avatarStyle: { background: "#B9DEC4", foreground: "#3E8B62" },
    ageYearsLabel: "3 años",
    parentsCountLabel: "2 padres vinculados",
    flags: [],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    avatarInitial: "V",
    avatarStyle: { background: "#F4DC8E", foreground: "#9A7B1E" },
    ageYearsLabel: "2 años",
    parentsCountLabel: "sin padres vinculados",
    flags: [{ label: "VINCULAR", style: FLAG_STYLES.VINCULAR }],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    avatarInitial: "T",
    avatarStyle: { background: "#C9B6E8", foreground: "#7B5FC0" },
    ageYearsLabel: "3 años",
    parentsCountLabel: "1 padre vinculado",
    flags: [{ label: "LACTOSA", style: FLAG_STYLES.LACTOSA }],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    avatarInitial: "E",
    avatarStyle: { background: "#F4B8CC", foreground: "#C44A7A" },
    ageYearsLabel: "2 años",
    parentsCountLabel: "1 padre vinculado",
    flags: [],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    avatarInitial: "L",
    avatarStyle: { background: "#A9D9E8", foreground: "#1F7A93" },
    ageYearsLabel: "3 años",
    parentsCountLabel: "1 padre vinculado",
    flags: [],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    avatarInitial: "O",
    avatarStyle: { background: "#B9DEC4", foreground: "#3E8B62" },
    ageYearsLabel: "2 años",
    parentsCountLabel: "1 padre vinculado",
    flags: [],
    roomLabel: "Soles",
    birthDateLabel: "",
    ingresoLabel: "",
    allergiesTitle: "",
    allergiesBody: "",
    parents: [],
  },
];
