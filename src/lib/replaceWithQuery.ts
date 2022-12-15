const replaceStateWithQuery = (values: Record<string, string>) => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.toString());
    for (let [k, v] of Object.entries(values)) {
      if (v != undefined) {
        url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
      } else {
        url.searchParams.delete(k);
      }
    }
    history.replaceState({}, '', url);
  }
};

export default replaceStateWithQuery;
