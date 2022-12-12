import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { TodoItem } from "../../../pages";
import { SortableOverlay } from "../../SortableOverlay";
import colors from "../../../styles/colors.module.scss";
import variables from "../../../styles/variables.module.scss";
import debounce from "lodash/debounce";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  Active,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styled from "styled-components";
import TodoListItem from "../../TodoListItem";

const TodoListContainer = styled.ul`
  margin: 1.125rem 0;
  border-radius: ${variables.standartBr};
  background-color: ${colors.white};
  padding: 0;
  box-shadow: ${variables.cardShadow};
`;

const FilterMobileContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: ${variables.standartBr};
  padding: 1rem;
  gap: 1rem;
  font-weight: 700;
  background-color: ${colors.white};
  align-items: center;
  box-shadow: ${variables.cardShadow};
`;

const FilterDesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.375rem;
  align-items: center;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  text-transform: capitalize;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? colors.primary : colors.darkGrayishBlue)};
  background-color: transparent;
  transition: 0.2s color ease-in-out;
  &:hover {
    color: ${colors.primary};
  }
`;

const TodoFooter = styled.div`
  display: flex;
  padding: 1.25rem;
  border-top: ${variables.lightGrayBorder};
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.span`
  color: ${colors.darkGrayishBlue};
  font-size: 0.75rem;
`;

const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.darkGrayishBlue};
  font-size: 0.75rem;
  cursor: pointer;
  transition: 0.2s color ease-in-out;
  &:hover {
    color: ${colors.primary};
  }
`;

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", debounce(updateSize, 150));
    // updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

function TodoList({
  todos,
  setTodos,
}: {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
}) {
  const [dragged, setDragged] = useState<Active | null>(null);
  const [filterState, setFilterState] = useState<
    "all" | "completed" | "active"
  >("all");
  const isMobile = useIsMobile();
  console.log(isMobile);

  const draggedItem = useMemo(
    () => todos.find((item) => item.id === dragged?.id),
    [dragged, todos]
  );

  const activeItems = useMemo(() => {
    return todos.filter((todo) => todo.completed === false);
  }, [todos]);

  const completedItems = useMemo(() => {
    return todos.filter((todo) => todo.completed === true);
  }, [todos]);

  const currentTodos = {
    all: todos,
    active: activeItems,
    completed: completedItems,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex(
          (todoItem) => active.id === todoItem.id
        );
        const newIndex = items.findIndex((todoItem) => over.id === todoItem.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setDragged(null);
  }

  const filterButtons = (["all", "active", "completed"] as const).map(
    (filterLabel) => {
      return (
        <FilterButton
          key={filterLabel}
          active={filterState === filterLabel}
          onClick={() => {
            setFilterState(filterLabel);
          }}
        >
          {filterLabel}
        </FilterButton>
      );
    }
  );
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setDragged(null);
        }}
        onDragStart={({ active }) => {
          setDragged(active);
        }}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <TodoListContainer>
            {currentTodos[filterState].map((currentItem) => {
              return (
                <TodoListItem
                  key={currentItem.id}
                  item={currentItem}
                  onDelete={() => {
                    const newTodo = todos.filter(
                      (todo) => todo.id !== currentItem.id
                    );
                    setTodos(newTodo);
                  }}
                  onCompleted={(val) => {
                    const newTodo = todos.map((todo) => {
                      if (todo.id === currentItem.id) {
                        return { ...todo, completed: val };
                      }
                      return todo;
                    });
                    setTodos(newTodo);
                  }}
                ></TodoListItem>
              );
            })}
            <SortableOverlay>
              {draggedItem ? (
                <TodoListItem
                  isOverlay
                  key={draggedItem.id}
                  item={draggedItem}
                  onDelete={() => {}}
                  onCompleted={() => {}}
                ></TodoListItem>
              ) : null}
            </SortableOverlay>
            <TodoFooter>
              <FooterText>{activeItems.length} items left</FooterText>
              {!isMobile ? (
                <FilterDesktopContainer>{filterButtons}</FilterDesktopContainer>
              ) : null}
              <ClearButton
                as="button"
                onClick={() => {
                  setTodos((todos) => {
                    return todos.filter((todo) => todo.completed === false);
                  });
                }}
              >
                Clear Completed
              </ClearButton>
            </TodoFooter>
          </TodoListContainer>
        </SortableContext>
      </DndContext>
      {isMobile ? (
        <FilterMobileContainer>{filterButtons}</FilterMobileContainer>
      ) : null}
    </>
  );
}

export default TodoList;
