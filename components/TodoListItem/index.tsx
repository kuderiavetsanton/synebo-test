import React, { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../../pages";
import Checkbox from "../Checkbox";
import colors from "../../styles/colors.module.scss";
import variables from "../../styles/variables.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandle, { DragHandleButton } from "./DragHandle";

const TodoLabel = styled.span<{ completed: boolean }>`
  padding: 0.25rem 0;
  margin: 0 1rem;
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
  margin-right: 8px;
  opacity: 0;
  transition: 0.3s 0.2s ease-in-out;
  cursor: pointer;
  &:hover::before,
  &:hover::after {
    background-color: ${colors.danger};
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

export const TodoCard = styled.li<{ isDragging: boolean; isOverlay: boolean }>`
  padding: 0.375rem 0;
  border-radius: ${variables.standartBr};
  align-items: center;
  background-color: ${colors.white};
  display: flex;
  overflow: hidden;
  ${({ isDragging }) =>
    isDragging
      ? `
      opacity: 0.4;
      & ${DragHandleButton} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }`
      : null}

  ${({ isOverlay }) =>
    isOverlay
      ? `
      & ${DragHandleButton} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }`
      : null}

  &:hover ${CancelButton} {
    visibility: visible;
    opacity: 1;
  }

  &:hover ${DragHandleButton} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  & + & {
    border-radius: 0;
    border-top: ${variables.lightGrayBorder};
  }
`;

interface TodoListItemProps extends HTMLAttributes<HTMLLIElement> {
  item: TodoItem;
  onCompleted: (completed: boolean) => void;
  onDelete: CallableFunction;
  isOverlay?: boolean;
}
function TodoListItem({
  item,
  isOverlay = false,
  onCompleted,
  onDelete,
  ...otherProps
}: TodoListItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    ...otherProps.style,
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TodoCard
      isOverlay={isOverlay}
      {...otherProps}
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
    >
      <DragHandle {...listeners} {...attributes} ref={setActivatorNodeRef} />
      <Checkbox
        checked={item.completed}
        onChange={() => {
          onCompleted(!item.completed);
        }}
      />
      <TodoLabel completed={item.completed}>{item.label}</TodoLabel>
      <CancelButton onClick={() => onDelete()} />
    </TodoCard>
  );
}

export default TodoListItem;
