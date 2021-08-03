import { useState } from 'react';


export const useSort = () => {

  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('');
   
  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
   
  const descendingComparator = (a, b, orderBy) => {
    if(b[orderBy] < a[orderBy]) {
      return -1;
    }
    if(b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);

    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if(order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };
  return {
    sortedRowInformation,
    getComparator,
    createSortHandler,
    orderDirection,
    valueToOrderBy
  };
};
