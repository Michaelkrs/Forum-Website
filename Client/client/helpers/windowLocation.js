const windowLocation = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const currentPage = params.get("page");
  const currentCategory = params.get("category");

  return { currentPage, currentCategory };
};

export default windowLocation;
