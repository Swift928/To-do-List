import { removeLinkOptions } from "./projectLinkOptions";
import { loadModule } from ".";
import { overlayToggle } from "./eventListeners";


export function createTrashSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('trashSvg')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');

    svg.appendChild(path);
    return svg;
}


export let backSvg = document.createElement('span');
backSvg.classList.add('backSvg')
backSvg.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
</svg>`;

export function handleBackSvgClick(){
  backSvg.addEventListener('click', () => {
      removeLinkOptions();
      const taskOptions = document.querySelectorAll('.taskOption');

      let taskLinkFormTitle = document.querySelector('.taskLinkFormTitle');
      taskLinkFormTitle.classList.toggle('withSvg')
      taskLinkFormTitle.removeChild(backSvg)

      taskOptions.forEach((element) => {
          element.classList.remove('active');
      });
  });
}



let contentDisplay = document.querySelector('.contentDisplay');
contentDisplay.addEventListener('click', (event)=> {
    if (event.target.classList.contains('trashSvg')) {
        loadModule('taskLinkForm.html', () => {
            let taskLinkFormTitle = document.querySelector('.taskLinkFormTitle');
            taskLinkFormTitle.textContent = `Task: ${event.target.closest('div').querySelector('a').textContent}`;
            overlayToggle();

            let deleteLinkOption = document.querySelector('.deleteTaskLink');
            let clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            deleteLinkOption.dispatchEvent(clickEvent);
        });
    }
})