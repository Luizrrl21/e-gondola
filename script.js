// script.js

// Seleciona todas as colunas no documento
const columns = document.querySelectorAll(".column");

// Variável para armazenar o elemento que está sendo arrastado
let draggingElement = null;

// Adiciona a classe "dragging" ao item que está sendo arrastado (Desktop)
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    draggingElement = e.target;
    e.target.classList.add("dragging");
  }
});

// Remove a classe "dragging" quando o item é solto (Desktop)
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item")) {
    draggingElement = null;
    e.target.classList.remove("dragging");
  }
});

// Eventos de toque para dispositivos móveis
document.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("item")) {
    draggingElement = e.target;
    draggingElement.classList.add("dragging");
  }
});

document.addEventListener("touchend", (e) => {
  if (draggingElement) {
    draggingElement.classList.remove("dragging");
    draggingElement = null;
  }
});

// Adiciona eventos de arrastar sobre cada coluna (Desktop e Mobile)
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    // Verifica se a coluna já tem 6 cards
    if (column.querySelectorAll(".item").length >= 6) {
      return;
    }

    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(column, e.clientY);

    // Insere o item arrastado na nova posição
    if (afterElement == null) {
      column.appendChild(dragging);
    } else {
      column.insertBefore(dragging, afterElement);
    }
  });

  // Adiciona evento de arrastar sobre para dispositivos móveis
  column.addEventListener("touchmove", (e) => {
    e.preventDefault();

    if (!draggingElement) return;

    // Verifica se a coluna já tem 6 cards
    if (column.querySelectorAll(".item").length >= 6) {
      return;
    }

    const touch = e.touches[0];
    const afterElement = getDragAfterElement(column, touch.clientY);

    // Insere o item arrastado na nova posição
    if (afterElement == null) {
      column.appendChild(draggingElement);
    } else {
      column.insertBefore(draggingElement, afterElement);
    }
  });
});

// Função que determina a posição do item após o qual o item arrastado deve ser inserido
function getDragAfterElement(column, y) {
  const draggableElements = [
    ...column.querySelectorAll(".item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
