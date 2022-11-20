const url = 'http://localhost:3030/jsonstore/advanced/table';

export const getData = async () => {
  try {
    const res = await fetch(url);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error);
    }

    return res.json();
  } catch (err) {
    alert(err.message);
  }
};
