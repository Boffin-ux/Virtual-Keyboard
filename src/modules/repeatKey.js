import {
  keyRu, keyRuShift, keyEn, keyEnShift,
} from './dataKey';

const repeatKey = () => {
  const KEYBOARD = document.getElementById('keyboard');
  const TEXTAREA = document.getElementById('textarea');
  const KEYS = KEYBOARD.querySelectorAll('.key');
  const GET_KEYS = [...KEYS];
  let getLang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'en';
  let capsActive = false;

  const upperCase = (arrKeys, caseUp = true) => {
    arrKeys.map((key) => {
      const newKey = key;
      if (key.textContent.length === 1 && key.dataset.type === 'alphanumeric' && caseUp) {
        newKey.textContent = key.textContent.toUpperCase();
      } else if (key.textContent.length === 1 && key.dataset.type === 'alphanumeric' && !caseUp) {
        newKey.textContent = key.textContent.toLowerCase();
      }
      return key;
    });
  };
  const areaFocus = (addFocus = true) => {
    if (addFocus) {
      TEXTAREA.focus();
      TEXTAREA.classList.add('textarea--active');
    } else {
      TEXTAREA.blur();
      TEXTAREA.classList.remove('textarea--active');
    }
  };
  const replaceKey = (replace) => {
    const replay = (currentArr, newArr) => {
      currentArr.map((key, index) => {
        const newKey = key;
        newKey.textContent = newArr[index];
        return key;
      });
    };
    const getKeys = () => {
      const getValue = KEYBOARD.querySelectorAll('.key');
      return [...getValue];
    };
    if (getLang === 'en') {
      if (replace && capsActive) {
        replay(GET_KEYS, keyEnShift);
        upperCase(getKeys(), false);
      } else if (!replace && capsActive) {
        replay(getKeys(), keyEn);
        upperCase(GET_KEYS, true);
      } else if (replace && !capsActive) {
        replay(GET_KEYS, keyEnShift);
      } else if (!replace && !capsActive) {
        replay(GET_KEYS, keyEn);
      }
    } else if (getLang === 'ru') {
      if (replace && capsActive) {
        replay(GET_KEYS, keyRuShift);
        upperCase(getKeys(), false);
      } else if (!replace && capsActive) {
        replay(getKeys(), keyRu);
        upperCase(GET_KEYS, true);
      } else if (replace && !capsActive) {
        replay(GET_KEYS, keyRuShift);
      } else if (!replace && !capsActive) {
        replay(GET_KEYS, keyRu);
      }
    }
  };
  const toggleActive = (e, key) => {
    if ((e.type === 'mousedown' || e.type === 'keydown') && key.dataset.code !== 'CapsLock') {
      key.classList.add('key--active');
      areaFocus(true);
    } else if ((e.type === 'mouseout' || e.type === 'mouseup' || e.type === 'keyup') && key.dataset.code !== 'CapsLock') {
      key.classList.remove('key--active');
    } else if ((e.type === 'click' || e.type === 'keydown') && key.dataset.code === 'CapsLock') {
      key.classList.toggle('key--active');
    }
  };

  const controlAlphanum = (e, key) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      TEXTAREA.setRangeText(`${key.textContent}`, TEXTAREA.selectionStart, TEXTAREA.selectionEnd, 'end');
    }
  };
  const controlArrow = (e, key) => {
    if (e.type === 'mousedown') {
      TEXTAREA.value += key.textContent;
    }
  };
  const controlEnter = (e) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      TEXTAREA.setRangeText('\n', TEXTAREA.selectionStart, TEXTAREA.selectionEnd, 'end');
    }
  };
  const controlSpace = (e) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      TEXTAREA.setRangeText(' ', TEXTAREA.selectionStart, TEXTAREA.selectionEnd, 'end');
    }
  };
  const controlTab = (e) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      TEXTAREA.setRangeText('  ', TEXTAREA.selectionStart, TEXTAREA.selectionEnd, 'end');
    }
  };
  const controlMeta = () => {
    areaFocus(false);
  };
  const controlCtrl = (e) => {
    areaFocus(false);
    if (e.ctrlKey && e.shiftKey && !e.repeat) {
      getLang = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang')) : 'en';
      if (getLang === 'ru') {
        localStorage.setItem('lang', JSON.stringify('en'));
        getLang = 'en';
        replaceKey(false);
      } else if (getLang === 'en') {
        localStorage.setItem('lang', JSON.stringify('ru'));
        getLang = 'ru';
        replaceKey(false);
      }
    }
  };
  const controlAlt = () => {
    areaFocus(false);
  };
  const controlBack = (e) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      if (TEXTAREA.selectionStart === TEXTAREA.selectionEnd && TEXTAREA.selectionStart > 0) {
        TEXTAREA.setRangeText('', TEXTAREA.selectionStart - 1, TEXTAREA.selectionEnd, 'end');
      } else if (TEXTAREA.selectionStart > 0) {
        TEXTAREA.setRangeText('');
      }
    }
  };
  const controlDel = (e) => {
    e.preventDefault();
    if (e.type === 'mousedown' || e.type === 'keydown') {
      if (TEXTAREA.selectionStart === TEXTAREA.selectionEnd
        && TEXTAREA.selectionEnd < TEXTAREA.value.length) {
        TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionEnd + 1, 'end');
      } else {
        TEXTAREA.setRangeText('');
      }
    }
  };
  const controlShift = (e) => {
    areaFocus(false);
    if (e.type === 'mousedown') {
      replaceKey(true);
    } else if (e.type === 'mouseout' || e.type === 'mouseup') {
      replaceKey(false);
    }
    if (e.type === 'keydown' && !e.ctrlKey && !e.repeat) {
      replaceKey(true);
    } else if (e.type === 'keyup') {
      replaceKey(false);
    }
  };
  const controlCaps = (e, key) => {
    if (e.type === 'click' && key.closest('.key--active')) {
      upperCase(GET_KEYS, true);
      capsActive = true;
    } else if (e.type === 'click' && !key.closest('.key--active')) {
      upperCase(GET_KEYS, false);
      capsActive = false;
    }
    if (e.type === 'keydown' && e.code === 'CapsLock' && !e.repeat) {
      if (key.closest('.key--active')) {
        upperCase(GET_KEYS, true);
        capsActive = true;
      } else if (!key.closest('.key--active')) {
        upperCase(GET_KEYS, false);
        capsActive = false;
      }
    }
  };
  const controlKey = (e) => {
    const findKey = (key) => {
      if (key.dataset.code === 'CapsLock') {
        controlCaps(e, key);
      } if (key.dataset.type === 'alphanumeric') {
        controlAlphanum(e, key);
      } else if ((key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight') && !e.ctrlKey) {
        controlShift(e, key);
      } else if ((key.dataset.code === 'ControlLeft' || key.dataset.code === 'ControlRight') && !e.shiftKey) {
        controlCtrl(e);
      } else if ((key.dataset.code === 'AltLeft' || key.dataset.code === 'AltRight')) {
        controlAlt(e);
      } else if (key.dataset.code === 'Space') {
        controlSpace(e);
      } else if (key.dataset.code === 'MetaLeft') {
        controlMeta(e);
      } else if (key.dataset.code === 'Tab') {
        controlTab(e);
      } else if (key.dataset.code === 'Delete') {
        controlDel(e);
      } else if (key.dataset.code === 'Enter') {
        controlEnter(e);
      } else if (key.dataset.code === 'Backspace') {
        controlBack(e);
      } else if (key.dataset.type === 'arrow') {
        controlArrow(e, key);
      } else if (e.ctrlKey && e.shiftKey) {
        controlCtrl(e);
      }
    };
    if (e.target.closest('.key')) {
      toggleActive(e, e.target);
      findKey(e.target);
    } else if (e.code) {
      GET_KEYS.forEach((item) => {
        if (item.dataset.code === e.code) {
          toggleActive(e, item);
          findKey(item);
        }
      });
    }
  };

  KEYBOARD.addEventListener('mousedown', controlKey);
  KEYBOARD.addEventListener('mouseout', controlKey);
  KEYBOARD.addEventListener('mouseup', controlKey);
  KEYBOARD.addEventListener('click', controlKey);
  document.addEventListener('keydown', controlKey);
  document.addEventListener('keyup', controlKey);
};
export default repeatKey;
