const template = (variables, { tpl }) => {
  const ComponentName = variables.componentName.replace(/^Svg/, "");

  return tpl`
    import { forwardRef, type Ref, type SVGProps } from 'react';

    const ${ComponentName} = (
      { size = 24, color = 'currentColor', ...props }: SVGProps<SVGSVGElement> & { size?: number | string; color?: string },
      ref: Ref<SVGSVGElement>
    ) => (
      ${variables.jsx}
    );

    const ForwardRef = forwardRef(${ComponentName});
    export default ForwardRef;
  `;
};

module.exports = template;
