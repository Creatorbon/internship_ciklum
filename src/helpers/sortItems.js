const compare = (fistElem, secondElem) => fistElem.toUpperCase().includes(secondElem.toUpperCase());

const filteredData = (data, searchParams) => {
  if (searchParams.priority === 'all') searchParams.priority = '';
  if (searchParams.status === 'all') searchParams.status = '';

  return data.filter((elem) => compare(elem.title, searchParams.search)
          && compare(elem.status, searchParams.status)
          && compare(elem.priority, searchParams.priority));
};

const sortItemByStatus = (data) => {
  data.sort((a, b) => {
    const nameA = a.status.toLowerCase();
    const nameB = b.status.toLowerCase();
    if (nameA < nameB) return 1;
    if (nameA > nameB) return -1;
    return 0;
  });
  return data;
};

export { filteredData, sortItemByStatus };
