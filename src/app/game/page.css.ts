import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const wrapper = style({
  maxWidth: 480,
  margin: "80px auto",
  textAlign: "center",
});

export const title = style({
  fontSize: vars.typography.fontSize[32],
  fontWeight: vars.typography.fontWeight[700],
  marginBottom: 12,
});

export const description = style({
  color: vars.color.coolgrey_80,
  fontSize: vars.typography.fontSize[16],
  marginBottom: 32,
});

export const nav = style({
  display: "flex",
  gap: 12,
  justifyContent: "center",
});

export const btn = style({
  padding: "12px 24px",
  background: vars.color.coolgrey_180,
  color: vars.color.coolgrey_10,
  border: "none",
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});

export const btnOutline = style({
  padding: "12px 24px",
  background: vars.color.coolgrey_10,
  color: vars.color.coolgrey_180,
  border: `1px solid ${vars.color.coolgrey_40}`,
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});

export const startButtonArea = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 24,
});

export const categoryWrapper = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10.6rem",
});

export const guide = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.space_32,
});

export const categoryTitle = style({
  ...fontStyles.display7,
  color: vars.color.coolgrey_20,
  textAlign: "center",
});

export const categoryCards = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.space.space_32,
  alignItems: "center",
});

export const levelCards = style({
  display: "grid",
  gridTemplateColumns: "53.8rem 53.8rem",
  gap: vars.space.space_20,
});

export const tutorialWrapper = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "15.8rem",
  cursor: "pointer",
});

export const tutorialWrapperRandom = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "18.4rem",
  cursor: "pointer",
});

export const tutorialGuide = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.space_32,
});

export const tutorialBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: vars.space.space_20,
  paddingRight: vars.space.space_20,
  height: "3.2rem",
  borderRadius: vars.radius.max,
  backgroundColor: "rgba(32, 54, 81, 0.66)",
  border: `1px solid ${vars.color.primary_default}`,
  backdropFilter: "blur(1.654px)",
});

export const tutorialBadgeText = style({
  color: "#bae3e3",
  fontSize: "1.5rem",
  fontWeight: "500",
});

export const tutorialTitle = style({
  ...fontStyles.display7,
  color: vars.color.coolgrey_20,
  textAlign: "center",
});

export const keyboardLarge = style({
  display: "flex",
  flexDirection: "column",
  gap: "4rem",
  width: "85.8rem",
});

export const keyRow = style({
  display: "grid",
  gridTemplateColumns: "61.7rem 1fr",
  alignItems: "center",
});

export const keyCombo = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.space_20,
});

const keyBtnLargeBase = style({
  height: "9rem",
  borderRadius: vars.radius.l,
  backgroundColor: vars.color.coolgrey_200,
  border: `1px solid ${vars.color.primary_default}`,
  color: vars.color.primary_default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...fontStyles.heading1,
  boxShadow: `0px 0px 1.9px 0px ${vars.color.primary_default}`,
});

export const keyBtnShift = style([keyBtnLargeBase, { width: "19.4rem" }]);
export const keyBtnTab = style([keyBtnLargeBase, { width: "15rem" }]);
export const keyBtnAlt = style([keyBtnLargeBase, { width: "15rem" }]);

export const keyPlus = style({
  ...fontStyles.heading1,
  color: vars.color.coolgrey_50,
});

export const descText = style({
  ...fontStyles.heading1,
  color: vars.color.coolgrey_20,
});

export const randomContent = style({
  display: "flex",
  flexDirection: "row",
  gap: "11rem",
  alignItems: "center",
});

export const keyboardSectionRandom = style({
  display: "flex",
  flexDirection: "column",
  gap: "5.6rem",
  width: "52.6rem",
});

export const sectionLabel = style({
  ...fontStyles.heading2,
  color: vars.color.coolgrey_20,
});

export const keyboardSmall = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.space_20,
});

export const keyRowSmall = style({
  display: "grid",
  gridTemplateColumns: "36.2rem 1fr",
  alignItems: "center",
});

export const keyComboSmall = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.space_12,
});

const keyBtnSmallBase = style({
  height: "6.6rem",
  borderRadius: vars.radius.m,
  backgroundColor: vars.color.coolgrey_200,
  border: `1px solid ${vars.color.primary_default}`,
  color: vars.color.primary_default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...fontStyles.heading4,
  boxShadow: `0px 0px 1.395px 0px ${vars.color.primary_default}`,
});

export const keyBtnShiftSmall = style([keyBtnSmallBase, { width: "14.2rem" }]);
export const keyBtnTabSmall = style([keyBtnSmallBase, { width: "11rem" }]);
export const keyBtnAltSmall = style([keyBtnSmallBase, { width: "11rem" }]);

export const keyPlusSmall = style({
  ...fontStyles.heading4,
  color: vars.color.coolgrey_50,
});

export const descChip = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: vars.space.space_24,
  paddingRight: vars.space.space_24,
  height: "4.6rem",
  borderRadius: vars.radius.max,
  backgroundColor: vars.color.coolgrey_160,
  ...fontStyles.subtitle2,
  color: vars.color.coolgrey_20,
  whiteSpace: "nowrap",
});

export const verticalDivider = style({
  width: "0.1rem",
  height: "24.6rem",
  backgroundColor: vars.color.coolgrey_140,
  alignSelf: "center",
});

export const scoringSection = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "6.6rem",
  width: "19.8rem",
  paddingBottom: "11.3rem",
});

export const scoringRows = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.space_16,
});

export const scoringRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const scoringLeft = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.4rem",
});

const scoringDotBase = style({
  width: "1.4rem",
  height: "1.4rem",
  borderRadius: "50%",
});

export const scoringDotHard = style([scoringDotBase, { backgroundColor: vars.color.point_04 }]);
export const scoringDotNormal = style([scoringDotBase, { backgroundColor: vars.color.point_03 }]);
export const scoringDotEasy = style([scoringDotBase, { backgroundColor: vars.color.primary_default }]);

export const scoringLabel = style({
  ...fontStyles.subtitle1,
  color: vars.color.coolgrey_50,
});

export const scoringScore = style({
  ...fontStyles.heading3,
  color: vars.color.coolgrey_20,
});

export const decorCard1 = style({
  position: "absolute",
  bottom: "4.1rem",
  left: "0",
  pointerEvents: "none",
});

export const decorCard2 = style({
  position: "absolute",
  bottom: "2.6rem",
  left: "4.9rem",
  pointerEvents: "none",
});

export const decorCard3 = style({
  position: "absolute",
  bottom: "0.8rem",
  left: "9.2rem",
  pointerEvents: "none",
});
