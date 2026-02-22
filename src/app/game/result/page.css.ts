import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const glassCardBefore = {
  content: '""',
  position: "absolute" as const,
  inset: 0,
  borderRadius: "inherit",
  padding: "0.5px",
  background: vars.gradient.glass_outstroke,
  WebkitMask:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
  pointerEvents: "none" as const,
};

export const pageWrapper = style({
  position: "relative",
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #0e0f15, #141722)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const particle = style({
  position: "absolute",
  borderRadius: "50%",
  background: vars.color.primary_default,
  opacity: 0.5,
  pointerEvents: "none",
});

export const contentWrapper = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "row",
  gap: 20,
  padding: "72px 40px 40px",
  height: "100vh",
  boxSizing: "border-box",
});

export const rightContent = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  minHeight: 0,
  minWidth: 0,
});

export const actionButtons = style({
  position: "absolute",
  top: 24,
  right: 40,
  display: "flex",
  gap: 8,
  zIndex: 10,
});

export const iconButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

export const leftPanel = style({
  width: 213,
  background: vars.color.coolgrey_200,
  borderRadius: vars.radius.l,
  overflowY: "auto",
  flexShrink: 0,
  paddingTop: 4,
  paddingBottom: 4,
  selectors: {
    "&::-webkit-scrollbar": {
      width: 1,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(255,255,255,0.15)",
      borderRadius: 2,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(255,255,255,0.3)",
    },
  },
});

export const problemItem = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 36,
  padding: "8px 20px",
  borderRadius: vars.radius.m,
  cursor: "pointer",
  background: "none",
  border: "none",
  textAlign: "left",
  width: "100%",
  fontSize: vars.typography.fontSize[16],
  fontWeight: vars.typography.fontWeight[500],
  lineHeight: vars.typography.lineHeight[27],
  transition: "background 0.15s",
  ":hover": {
    background: "rgba(255,255,255,0.05)",
  },
});

export const problemItemSelected = style({
  background: vars.color.coolgrey_60,
  border: `1px solid ${vars.color.primary_default}`,
  boxShadow: "inset 0px -7px 26.5px 0px rgba(98,235,254,0.27)",
});

export const problemNumber = style({
  color: vars.color.coolgrey_110,
});

export const problemCategory = style({
  color: vars.color.coolgrey_110,
});

export const problemNumberSelected = style({
  color: vars.color.primary_150,
  fontWeight: vars.typography.fontWeight[600],
});

export const problemCategorySelected = style({
  color: vars.color.primary_default,
  fontWeight: vars.typography.fontWeight[600],
});

export const centerPanel = style({
  position: "relative",
  flex: 1,
  minHeight: 0,
  background: vars.color.coolgrey_60,
  borderRadius: vars.radius.l,
  padding: "24px",
  backdropFilter: "blur(2px)",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  selectors: {
    "&::before": glassCardBefore,
  },
});

export const panelBodyArea = style({
  position: "relative",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  selectors: {
    "&::-webkit-scrollbar": {
      width: 9,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: vars.color.coolgrey_80,
      borderRadius: 100,
    },
  },
});

export const panelBodyContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const panelTitle = style({
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[18],
  fontWeight: vars.typography.fontWeight[600],
  lineHeight: "31px",
});

export const problemText = style({
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[16],
  fontWeight: vars.typography.fontWeight[500],
  lineHeight: vars.typography.lineHeight[27],
});

export const inlineCaption = style({
  display: "inline-flex",
  alignItems: "center",
  background: vars.color.coolgrey_130,
  borderRadius: 4,
  padding: "4px 6px",
  fontFamily: vars.typography.fontFamily.jet,
  fontSize: vars.typography.fontSize[10],
  fontWeight: vars.typography.fontWeight[500],
  color: vars.color.coolgrey_20,
  backdropFilter: "blur(32px)",
  verticalAlign: "middle",
  lineHeight: 1,
});

export const answerArea = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingLeft: 24,
  paddingRight: 24,
});

export const sectionRow = style({
  display: "flex",
  alignItems: "center",
  gap: 24,
});

export const sectionLabelSide = style({
  color: vars.color.coolgrey_80,
  fontSize: vars.typography.fontSize[16],
  fontWeight: vars.typography.fontWeight[500],
  lineHeight: vars.typography.lineHeight[27],
  width: 46,
  flexShrink: 0,
});

export const codeBlockMyAnswer = style({
  flex: 1,
  background: vars.color.coolgrey_160,
  borderRadius: vars.radius.m,
  padding: "16px 23px",
  fontFamily: vars.typography.fontFamily.jet,
  fontSize: vars.typography.fontSize[14],
  fontWeight: vars.typography.fontWeight[400],
  lineHeight: "24px",
  display: "flex",
  flexDirection: "column",
});

export const codeBlockCorrectAnswer = style({
  flex: 1,
  background: vars.color.coolgrey_160,
  borderRadius: vars.radius.m,
  padding: "16px 26px",
  fontFamily: vars.typography.fontFamily.jet,
  fontSize: vars.typography.fontSize[14],
  fontWeight: vars.typography.fontWeight[400],
  lineHeight: "24px",
  color: vars.color.coolgrey_50,
});

export const answerLineCorrect = style({
  color: vars.color.coolgrey_50,
  display: "block",
});

export const answerLineWrong = style({
  color: vars.color.point_02,
  display: "block",
});

export const explanationBlock = style({
  flex: 1,
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[16],
  fontWeight: vars.typography.fontWeight[500],
  lineHeight: vars.typography.lineHeight[27],
});

export const bottomRow = style({
  display: "flex",
  gap: 20,
  height: 290,
  flexShrink: 0,
});

export const chartCard = style({
  position: "relative",
  flex: 1,
  background: vars.color.coolgrey_60,
  borderRadius: vars.radius.l,
  padding: "24px",
  backdropFilter: "blur(2px)",
  display: "flex",
  flexDirection: "column",
  gap: 23,
  selectors: {
    "&::before": glassCardBefore,
  },
});

export const chartBodyArea = style({
  position: "relative",
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
});

export const chartTitle = style({
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[18],
  fontWeight: vars.typography.fontWeight[600],
  lineHeight: "31px",
  flexShrink: 0,
});

export const chartContainer = style({
  flex: 1,
  position: "relative",
  minHeight: 0,
});

export const statsColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: 277,
  flexShrink: 0,
});

export const statsCard = style({
  position: "relative",
  flex: 1,
  background: vars.color.coolgrey_60,
  borderRadius: vars.radius.l,
  padding: "24px",
  backdropFilter: "blur(2px)",
  display: "flex",
  flexDirection: "column",
  gap: 24,
  selectors: {
    "&::before": glassCardBefore,
  },
});

export const statsCardTitle = style({
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[18],
  fontWeight: vars.typography.fontWeight[600],
  lineHeight: "31px",
});

export const statsCardValue = style({
  color: vars.color.coolgrey_10,
  fontSize: vars.typography.fontSize[32],
  fontWeight: vars.typography.fontWeight[600],
  letterSpacing: "-0.4px",
  lineHeight: vars.typography.lineHeight[27],
});

export const statsCardSubValue = style({
  color: vars.color.primary_200,
  fontSize: vars.typography.fontSize[16],
  fontWeight: vars.typography.fontWeight[500],
  lineHeight: vars.typography.lineHeight[27],
});

export const accuracyRow = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

export const lockedOverlay = style({
  filter: "blur(4px)",
  userSelect: "none",
  pointerEvents: "none",
});

export const lockedPanelOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  zIndex: 10,
  cursor: "pointer",
  background: "none",
  border: "none",
  width: "100%",
});

export const lockedOverlayText = style({
  color: vars.color.coolgrey_40,
  fontSize: vars.typography.fontSize[18],
  fontWeight: vars.typography.fontWeight[400],
  lineHeight: "29px",
});

export const hoverPopover = style({
  position: "absolute",
  background: "rgba(32, 31, 39, 0.6)",
  border: "0.8px solid white",
  borderRadius: 12,
  padding: "12px 18px",
  backdropFilter: "blur(30px)",
  pointerEvents: "none",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  whiteSpace: "nowrap",
});

export const popoverTitle = style({
  color: vars.color.primary_default,
  fontSize: vars.typography.fontSize[13],
  fontWeight: vars.typography.fontWeight[600],
});

export const popoverRow = style({
  display: "flex",
  alignItems: "center",
  gap: 43,
  color: vars.color.coolgrey_10,
  fontSize: vars.typography.fontSize[13],
});

export const popoverLabel = style({
  fontWeight: vars.typography.fontWeight[600],
});

export const popoverValue = style({
  fontWeight: vars.typography.fontWeight[700],
});
