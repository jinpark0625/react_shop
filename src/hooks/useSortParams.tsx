import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

export default function useSortParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = queryString.parse(searchParams.toString());

  const setSortParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const appendSortParams = (key: string, value: string) => {
    searchParams.append(key, value);
    setSearchParams(searchParams);
  };

  const deleteSortParams = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const deleteSelectedSortParms = (key: string, value: string) => {
    const values = searchParams.getAll(key);
    const updatedValues = values.filter((v) => v !== value);
    searchParams.delete(key);
    updatedValues.forEach((v) => searchParams.append(key, v));
    setSearchParams(searchParams);
  };

  const deleteAllParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    query,
    searchParams,
    setSortParams,
    appendSortParams,
    deleteSortParams,
    deleteSelectedSortParms,
    deleteAllParams,
  };
}
