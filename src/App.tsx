import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { RestaurantCard } from './components/RestaurantCard';
import Drawer from './components/Drawer'



export interface Restaurant{
  backgroundImageURL: string,
  category: string,
  contact: {phone: string, formattedPhone: string, twitter: string},
  location: {address: string, cc: string, city: string, country: string, crossStreet: string, formattedAddress: Array<string>, lat: number, 
    lng: number, postcalCode: string, state: string},
  name: string
}

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10vh;
  margin-bottom: 1.5rem;

  color: white;
  background-color: #43E895;


  min-height: 10vh;

  
  border: 3px solid red;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 34 px;
`
const RestaurantsContainer = styled.div`
  display: grid;
  gap: 3rem 4rem;
  justify-items: center;
  grid-template-columns: 1fr 1fr;

  width: 100vw;
  height: 200vh;
  max-width: 1170px;
  max-height: 100vh;
  margin: 0 auto;
`

const Section = styled.section`
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
`

function App() {

  const [isLoading, setLoading] = useState<Boolean>(true);
  const [restaurantsList, setResturants] = useState<Array<Restaurant>>([]);
  const [selectedRestaurant, selectResturaunt] = useState<number>(-1)
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () =>{
    const response = await fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
    const data  = await response.json()
    setResturants(data.restaurants)
    setLoading(false)
  }

  useEffect(()=>{
    fetchData()
  },[])
  if(isLoading){
    return(
      <h1>Loading...</h1>
    )
  }
  else{
    {console.log(restaurantsList)}
    return (
      <>
        <Header>
          <Title>Lunch Tyme</Title>
        </Header>
        <RestaurantsContainer>
          {restaurantsList.map((restaurant, index) => {
            return(
              <>
            <RestaurantCard Restaurant={restaurant} key={restaurant.name} onClick={() => {
              selectResturaunt(index)
              setIsOpen(true)
            }}></RestaurantCard>
            </>
              )
          })}
        </RestaurantsContainer>
        <Drawer isOpen = {isOpen} setOpen={setIsOpen} restauraunt={restaurantsList[selectedRestaurant]}/>
      </>
    );
  }
}

export default App;
