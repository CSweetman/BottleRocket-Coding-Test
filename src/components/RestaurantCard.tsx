import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Restaurant } from '../App'
import WebFont from 'webfontloader';


export const Card = styled.div`
   
    position: relative;
    width: 100%;
    height: 240px;

    color: white;

    font-family: 'Montserrat', sans-serif;

    /* Test Border */
    border: 5px solid black;
`
const Photo = styled.div<{bg: string}>`
    position: relative;
    height: 100%;  
    width: 100%;

    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url(${(props) => props.bg});
    background-position: center;
    background-size: cover;
    
    border: 0.25rem solid green;
    border-radius: var(--radius);
`
export const RestaurantInfo = styled.div`
    position: absolute;
    bottom: 0px;
    margin-left: 12px;
    margin-bottom: 12px;

    border: 3px solid black;

    font-family: 'Montserrat', sans-serif;
`



export const Name = styled.h1`
    position: relative;
    height: 12px;
    padding: 0;

    font-size: 18px;
`

export const Type = styled.p`
    height: 0px;
    font-size: 16px;
`
const DrawerDiv = styled.div`
    position: relative;
    left: 30px;
`


export const RestaurantCard = ({Restaurant, onClick} : {Restaurant: Restaurant, onClick: any}) => {



    const {name, category, backgroundImageURL} = Restaurant
    return (
        <>
        <Card onClick = {onClick}>
            <Photo bg={backgroundImageURL}>
                <RestaurantInfo>
                    <Name>{name}</Name>
                    <Type>{category}</Type>
                </RestaurantInfo>
            </Photo>
        </Card>
        </>
    )
}
