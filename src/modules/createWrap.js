const createWrap = () => {
  const divWrap = document.createElement('div');
  const header = document.createElement('header');
  const main = document.createElement('main');
  const footer = document.createElement('footer');
  const textArea = document.createElement('textarea');
  const divKeyboard = document.createElement('div');

  divWrap.className = 'container';
  header.className = 'header';
  main.className = 'main';
  footer.className = 'footer';
  textArea.className = 'textarea';
  textArea.id = 'textarea';
  divKeyboard.className = 'keyboard';
  divKeyboard.id = 'keyboard';

  document.body.append(divWrap);
  divWrap.append(header);
  divWrap.append(main);
  divWrap.append(footer);
  main.append(textArea);
  main.append(divKeyboard);

  const headerText = `
      <h1 class="header__text">Virtual Keyboard</h1>
  `;
  header.insertAdjacentHTML('afterbegin', headerText);

  const footerText = `
      <div class="footer__text">
        <p>Switch language: Ctrl + Shift</p>
        <p>Made for Windows</p>
      </div>
  `;
  footer.insertAdjacentHTML('afterbegin', footerText);
};
export default createWrap;
