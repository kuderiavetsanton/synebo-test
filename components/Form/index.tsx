import React, { useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../../pages";
import colors from "../../styles/colors.module.scss";
import Checkbox from "../Checkbox";
import { StyledCheckbox } from "../TodoListItem";
import { v4 as uuid } from "uuid";

const StyledInput = styled.input.attrs({ type: "text" })`
  border: none;
  outline: 0;
  caret-color: ${colors.primary};
  padding: 0.5rem;
  font-weight: 400;
`;

export const CardContainer = styled.div`
  margin-top: 35px;
  border-radius: 8px;
  background-color: #fff;
  padding: 0.5rem 1rem;
  align-items: center;
  display: flex;
`;

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, value: TodoItem) => void;
}

function Form({ handleSubmit }: FormProps) {
  const [completed, setCompleted] = useState(false);
  const [todoLabel, setTodoLabel] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const label = todoLabel.trim();
        if (label) {
          handleSubmit(e, { completed, label: label, id: uuid() });
          setTodoLabel("");
          setCompleted(false);
        }
      }}
    >
      <CardContainer>
        <StyledCheckbox
          checked={completed}
          onChange={() => {
            setCompleted(!completed);
          }}
        />
        <StyledInput
          value={todoLabel}
          onChange={(e) => {
            setTodoLabel(e.target.value);
          }}
        />
      </CardContainer>
    </form>
  );
}

export default Form;
