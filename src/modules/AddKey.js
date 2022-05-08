class AddKey {
  constructor({
    id, code, value, type,
  }) {
    this.id = id;
    this.code = code;
    this.value = value;
    this.type = type;
  }

  generateKey() {
    const createKey = document.createElement('div');
    createKey.className = 'key';
    if (this.id === 'key-14') {
      createKey.classList.add('key--backspace');
    } else if (this.id === 'key-15') {
      createKey.classList.add('key--tab');
    } else if (this.id === 'key-30') {
      createKey.classList.add('key--capslock');
      createKey.id = 'capslock';
    } else if (this.id === 'key-42') {
      createKey.classList.add('key--enter');
    } else if (this.id === 'key-43') {
      createKey.classList.add('key--left-shift');
      createKey.id = 'left-shift';
    } else if (this.id === 'key-55') {
      createKey.classList.add('key--right-shift');
      createKey.id = 'right-shift';
    } else if (this.id === 'key-59') {
      createKey.classList.add('key--space');
    }
    createKey.setAttribute('data-id', this.id);
    createKey.setAttribute('data-code', this.code);
    createKey.setAttribute('data-type', this.type);
    createKey.innerText = this.value;
    return createKey;
  }
}

export default AddKey;
