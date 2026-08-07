export interface AvatarStyle {
  background: string;
  foreground: string;
}

export interface InvitePreview {
  childInitial: string;
  childName: string;
  childRoomLabel: string;
  invitedToLabel: string;
  avatarStyle: AvatarStyle;
  invitationCode: string;
  parentEmail: string;
  defaultPasswordLabel: string;
}

export const INVITE_PREVIEW: InvitePreview = {
  childInitial: "M",
  childName: "Mateo",
  childRoomLabel: "Sala Soles",
  invitedToLabel: "Te invitaron a seguir a",
  avatarStyle: { background: "#A9D9E8", foreground: "#1F7A93" },
  invitationCode: "7K4P9",
  parentEmail: "lucia.fernandez@gmail.com",
  defaultPasswordLabel: "contraseña",
};