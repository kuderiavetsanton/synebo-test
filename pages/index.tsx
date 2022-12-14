import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import colors from "../styles/colors.module.scss";
import Form from "../components/Form";
import { useState } from "react";
import TodoList from "../components/TodoList";
import { mobileBgImage, desktopBgImage } from "./_document";

const Container = styled.div`
  width: 100%;
  background-image: url(${mobileBgImage});
  background-repeat: no-repeat;
  background-size: 100% auto;
  min-height: 100vh;
  display: flex;
  background-color: ${colors.veryLightGray};
  @media (min-width: 768px) {
    background-image: url(${desktopBgImage});
  }
`;

const Main = styled.main`
  margin: 50px auto;
  min-width: 340px;
  width: 80%;
  @media (min-width: 768px) {
    min-width: 550px;
    width: 35%;
    margin: 75px auto;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  color: ${colors.veryLightGray};
  margin: 0;
`;

const DndInfoFooter = styled.div`
  margin-top: 3rem;
  color: ${colors.darkGrayishBlue};
  font-size: 0.875rem;
  text-align: center;
`;

export interface TodoItem {
  label: string;
  completed: boolean;
  id: string;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  return (
    <>
      <Head>
        <title>Todo list</title>
        <meta name="description" content="Todo app" />
      </Head>
      <Container>
        <Main>
          <Header>
            <Title>TODO</Title>
            <Image
              src="/icon-moon.svg"
              alt="Theme icon"
              width={26}
              height={26}
            ></Image>
          </Header>
          <Form
            handleSubmit={(e, value) => {
              setTodos([...todos, value]);
            }}
          />
          {todos.length !== 0 ? (
            <>
              <TodoList todos={todos} setTodos={setTodos} />
              <DndInfoFooter>Drag and drop to reorder list</DndInfoFooter>
            </>
          ) : null}
        </Main>
      </Container>
    </>
  );
}
