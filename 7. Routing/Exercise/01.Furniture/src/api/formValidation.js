export function validateFields(input) {
  delete input.material;
  input.price = Number(input.price);
  input.year = Number(input.year);

  const fields = {
    make: document.getElementById('new-make'),
    model: document.getElementById('new-model'),
    price: document.getElementById('new-price'),
    year: document.getElementById('new-year'),
    description: document.getElementById('new-description'),
    img: document.getElementById('new-image'),
  };

  const errors = {};

  Object.keys(input).forEach((x) => (errors[x] = false));

  if (input.make.length < 4) {
    errors.make = '"Make" field requires more than 4 characters';
  }

  if (input.model.length < 4) {
    errors.model = 'Model field requires more than 4 characters';
  }

  if (input.year < 1950 || input.year > 2050) {
    errors.year = 'The year should not be less than 1950 or more than 2050';
  }

  if (input.description.length < 10) {
    errors.description = 'Description field requires more than 10 characters';
  }

  if (input.price == '' || input.price < 0) {
    errors.price = 'The price must be a positive number';
  }

  if (input.img == '') {
    errors.img = 'The URL must be valid';
  }

  const messages = [];

  for (let key of Object.keys(errors)) {
    const formElement = fields[key];
    const fieldError = errors[key];

    if (fieldError) {
      messages.push(fieldError);

      formElement.classList.add('is-invalid');
      formElement.classList.remove('is-valid');
    } else {
      formElement.classList.add('is-valid');
      formElement.classList.remove('is-invalid');
    }
  }
  return messages;
}
