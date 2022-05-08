import AddKey from './AddKey';

const generateKeys = (data) => {
  const keys = [];
  data.forEach((key) => {
    keys.push(new AddKey(key));
  });
  return keys;
};
const getWrapper = () => {
  const appointmentWrapper = document.getElementById('keyboard');
  appointmentWrapper.innerHTML = '';
  return appointmentWrapper;
};
const renderKeysToDom = (dataKey) => {
  const wrapper = getWrapper();
  generateKeys(dataKey).forEach((key) => {
    wrapper.append(key.generateKey());
  });
};

export default renderKeysToDom;
