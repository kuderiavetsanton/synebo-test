import React, { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors.module.scss";

export const DragHandleButton = styled.button`
  display: flex;
  width: 12px;
  padding: 0.75rem;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  touch-action: none;
  cursor: var(--cursor, pointer);
  border-radius: 5px;
  border: none;
  outline: none;
  appearance: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  margin-left: calc(-0.75rem * 2);
  margin-right: 1rem;
  transition: 0.3s 0.2s ease-in-out margin;
  &:hover {
    background-color: ${colors.veryLightGrayishBlue};
  }

  &:focus-visible {
    box-shadow: 0 0px 0px 2px ${colors.primary};
  }

  & svg {
    flex: 0 0 auto;
    margin: auto;
    height: 100%;
    overflow: visible;
    fill: ${colors.darkGrayishBlue};
  }
`;

export default forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  function DragHandle(props, ref) {
    return (
      <DragHandleButton {...props} ref={ref}>
        <svg viewBox="0 0 20 20" width="12">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </DragHandleButton>
    );
  }
);
