import React, { forwardRef, InputHTMLAttributes, useId } from "react";
import styled from "styled-components";
import colors from "../../styles/colors.module.scss";

const CustomCheckbox = styled.label`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  position: relative;
  background-color: white;
  background: ${colors.checkBackground};
  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: white;
    border-radius: 50%;
  }
  &:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    opacity: 1;
    position: absolute;
    left: 7px;
    top: 7px;
    border-bottom-left-radius: 2px;
    transform: rotate(-45deg);
    height: 5px;
    width: 8px;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
  &:checked + ${CustomCheckbox}::before {
    display: none;
  }
`;

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, onChange, className, ...otherProps },
  ref
) {
  const id = useId();
  return (
    <div>
      <HiddenCheckbox
        {...otherProps}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={ref}
      />
      <CustomCheckbox
        htmlFor={id}
        className={className}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.click();
          }
        }}
      />
    </div>
  );
});
