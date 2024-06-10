// script.js

// Seleciona todas as colunas no documento
const columns = document.querySelectorAll(".column");

// Adiciona a classe "dragging" ao item que está sendo arrastado
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.add("dragging");
  }
});

// Remove a classe "dragging" quando o item é solto
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.remove("dragging");
  }
});

// Adiciona um evento de arrastar sobre cada coluna
columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    // Verifica se a coluna já tem 6 cards
    if (column.querySelectorAll(".item").length >= 6) {
      return; // Se a coluna já tem 6 cards, não permite mais inserções
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
});

// Função que determina a posição do item após o qual o item arrastado deve ser inserido
function getDragAfterElement(column, y) {
  const draggableElements = [...column.querySelectorAll(".item:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
