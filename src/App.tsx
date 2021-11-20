import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { RestaurantCard } from './components/RestaurantCard';
import Drawer from './components/Drawer'
import { Restaurant, ViewPort } from './components/ComponentTypes';

const Header = styled.header`
  /* Display & Box Model */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
      margin-bottom: 0px;
  }

  /* Text */
  color: white;
  background-color: #43E895;
  min-height: 10vh;

  /* Debug */
  /* border: 3px solid red; */
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
  @media (max-width: 768px) {
        grid-template-columns: 1fr;
        row-gap: 0;
  }
  width: 100vw;
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
`


function App() {
  // useState declaration
    // Fetching Data
  const [isLoading, setLoading] = useState<Boolean>(true);  
  const [restaurantsList, setResturants] = useState<Array<Restaurant>>([]);
    // onClick whenever someone selects a restaurant
  const [selectedRestaurant, selectResturaunt] = useState<number>(-1)
  const [isOpen, setIsOpen] = useState(false);
  const [viewport, setViewport] = useState<ViewPort>({
    latitude: 50.3,
    longitude: 23.2,
    // Checks to see how big device to set mapsize, need to be made dynamic
    width: window.innerWidth>768 ? "100%" :"45vw",
    height: window.innerWidth>768 ? "100%" :"35vh",
    zoom: 15,
  })

  // Fetches the data from the API endpoint
  const fetchData = async () =>{
    const response = await fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
    const data  = await response.json()
    setResturants(data.restaurants)
    setLoading(false)
  }

  useEffect(()=>{
    fetchData()
  },[])

  // Conditional Rendering to make sure the data has been fetched
  if(isLoading){
    return(
      <h1>Loading...</h1>
    )
  }
  else{
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
              setViewport({...viewport, latitude: restaurantsList[index]?.location.lat, longitude: restaurantsList[index].location.lng})
              setIsOpen(true)
            }}></RestaurantCard>
            </>
              )
          })}
        </RestaurantsContainer>
        <Drawer isOpen = {isOpen} setOpen={setIsOpen} restauraunt={restaurantsList[selectedRestaurant]} viewport={viewport} setViewport={setViewport}/>
      </>
    );
  }
}

export default App;
