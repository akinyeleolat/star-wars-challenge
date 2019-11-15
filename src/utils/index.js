
import { toast } from 'react-toastify';

export const getRequiredData = (movieList) => movieList.map((movie, index)=>{
  const newList = {
   movieId:  (index+1),
    title: movie.title,
    releaseDate: movie.release_date,
    movieUrl: movie.url
  }
  return newList
});

export const sortByReleaseDate =(sortData)=>sortData.sort((a,b)=> new Date(a.releaseDate) - new Date(b.releaseDate));

export const computeHeight = (data)=>{
    if(data){
      const totalHeight = data
      .map(height => parseInt(height.height))
      .filter(x =>!isNaN(x))
      .reduce((sum,height) => sum + height, 0);
      const heightInFeet = Number((totalHeight/30.48).toFixed(0));
      const heightInInches = Number((totalHeight/2.54).toFixed(2));
      const result = `${totalHeight}cm (${heightInFeet}ft/${heightInInches}in)`
      return result;
    }
    toast.warn('invalid parameters');
  };

  export const getRowData = (data) =>{
  const tableData = data;
      const rows = tableData;
   return rows;
  };

  export const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  export const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  export const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }
