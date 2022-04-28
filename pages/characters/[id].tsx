import React from 'react'
import { Character, GetCharacterResults } from '../../types';
import imageLoader from '../../imageLoader';


import Image from 'next/image'
const CharacterPage = ({character}:{character:Character}) => {
  return (
    <div>
        <h1>{character.name}</h1>
        <Image 
        loader={imageLoader} 
        src={character.image} 
        width='200' 
        height={200}
        alt={character.name}
        />
    </div>
  )
}






export const getStaticPaths=async()=>{
    // fetch the data
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const {results}:GetCharacterResults= await res.json();

  
  return{
      paths:results.map((character)=>{
              return{
                  params:{id:String(character.id)}
              }
          }),
      


     fallback:false
  }
  
}


export async function getStaticProps({params}:{params:{id:string}}){
 const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);

 const character = await res.json();

 return{
     props:{character:character}
 }
}


// "https://rickandmortyapi.com/api/character"
export default CharacterPage