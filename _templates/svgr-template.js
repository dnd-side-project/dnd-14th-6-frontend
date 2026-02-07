const t = require("@babel/types");

const template = (variables, { tpl }) => {
  const ComponentName = variables.componentName.replace(/^Svg/, "");
  const jsx = variables.jsx;

  // svg에 style 주입 (color는 "resolvedColor"를 넣을 것)
  if (jsx && jsx.type === "JSXElement") {
    const opening = jsx.openingElement;

    const styleAttr = t.jsxAttribute(
      t.jsxIdentifier("style"),
      t.jsxExpressionContainer(
        t.objectExpression([
          t.spreadElement(t.identifier("style")),
          t.objectProperty(
            t.identifier("color"),
            t.identifier("resolvedColor"),
            false,
            true,
          ),
        ]),
      ),
    );

    opening.attributes.unshift(styleAttr);
  }

  return tpl`
    import { forwardRef, type Ref, type SVGProps } from 'react';
    import { color as colorTokens, type ColorToken } from '@/styles/tokens/color';

    type IconColor = ColorToken | 'currentColor' | (string & {});

    const ${ComponentName} = (
      {
        size = 24,
        color = 'currentColor',
        style,
        ...props
      }: Omit<SVGProps<SVGSVGElement>, 'color'> & { size?: number | string; color?: IconColor },
      ref: Ref<SVGSVGElement>
    ) => {
      const resolvedColor =
        color === 'currentColor'
          ? 'currentColor'
          : (color in colorTokens ? colorTokens[color as ColorToken] : color);

      return (
        ${jsx}
      );
    };

    const ForwardRef = forwardRef(${ComponentName});
    export default ForwardRef;
  `;
};

module.exports = template;
