export function createElement(type, clsName, content) {
  const element = document.createElement(type);

  if (content) {
    element.textContent = content;
  }

  if (clsName) {
    element.className = clsName;
  }

  return element;
}
