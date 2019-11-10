import axios from 'axios';

const getCharacterDetail = async (characterUrl )=>{
 const res = await axios.get(characterUrl);
 const {
     name, gender, height
} = res.data
return {name, gender, height}
}

const getMovieCharacterDetails = async (movies)=>{
    if(movies.characters.length > 0){
        const moviesCharacter = movies.characters;
        const charactersDetails = await Promise.all(
        moviesCharacter.map(async (characterUrl) => {
            const characters = await getCharacterDetail(characterUrl)
            return characters
        }))
        return charactersDetails;
    }
}

export default getMovieCharacterDetails;
