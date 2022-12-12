import React, { useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../../pages";
import Checkbox from "../Checkbox";
import colors from "../../styles/colors.module.scss";

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 0.75rem;
`;

const Text = styled.span<{ completed: boolean }>`
  padding: 0.5rem 0;
  ${({ completed }) =>
    completed
      ? `text-decoration: line-through;
        color:${colors.lightGrayishBlue};`
      : null}
`;

const CancelButton = styled.span`
  width: 28px;
  height: 28px;
  position: relative;
  margin-left: auto;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s opacity ease-in-out;
  cursor: pointer;
  &:hover::before,
  &:hover::after {
    background-color: red;
  }

  &::after,
  &::before {
    transition: 0.3s background-color ease-in-out;
    width: 100%;
    left: 50%;
    top: 50%;
    content: "";
    height: 2px;
    display: block;
    background-color: ${colors.darkGrayishBlue};
    position: absolute;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;

const TodoCard = styled.li`
  background-color: #fff;
  padding: 0.5rem 1rem;
  align-items: center;
  display: flex;
  &:hover ${CancelButton} {
    visibility: visible;
    opacity: 1;
  }

  & + & {
    border-top: 1px solid ${colors.lightGrayishBlue};
  }
`;

interface TodoListItemProps {
  item: TodoItem;
  onCompleted: (completed: boolean) => void;
  onDelete: CallableFunction;
}
function TodoListItem({ item, onCompleted, onDelete }: TodoListItemProps) {
  return (
    <TodoCard>
      <StyledCheckbox
        checked={item.completed}
        onChange={() => {
          onCompleted(!item.completed);
        }}
      />
      <Text completed={item.completed}>{item.label}</Text>
      <CancelButton onClick={() => onDelete()} />
    </TodoCard>
  );
}

export default TodoListItem;
