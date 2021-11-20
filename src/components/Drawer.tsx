import React, { Dispatch, SetStateAction, useState } from 'react'
import {Drawer as MUIDrawer, makeStyles} from "@material-ui/core"
import styled from 'styled-components'
import { Name, Type } from './RestaurantCard';
import ReactMapGL, {Marker} from "react-map-gl"
import { Room } from '@mui/icons-material';
import { Restaurant, ViewPort as Viewport } from './ComponentTypes';

const DetailView = styled.div`
    display: grid;
    grid-template-rows: 4fr 1fr 4fr;
    @media (max-width: 768px) {
        grid-template-rows: 3fr 1fr 3fr;
    }
    height: 100%;

`
const NameBox = styled.div`
    background-color: #34B379;
    font-family: 'Montserrat', sans-serif;
    ${Name}, ${Type}{
        margin-left: 12px;
    }
    @media (max-width: 768px) {
        font-size: 16px;
    } 

    /* Debug */
    /* border: 3px solid orange; */
`
const DescriptionBox = styled.div`
    /* Debug */
    /* border: 3px solid orange; */
`

const DescriptionText = styled.p`
    margin-left: 12px;
    margin-bottom: 26px;
    font-size: 16px;
    @media (max-width: 768px) {
        font-size: 12px;
    } 
    color: #2A2A2A;
`
// Edits the height and width of the drawer animation to not take up the entire vh or vw
const useStyles = makeStyles(() => ({
    drawerPaper: {
        position: 'relative',
        top: '15%',
        width: '35%',
        height: '70%',
        ['@media (max-width: 768px)']: { 
            width: '45%'
          }
    }
}));

const Drawer = ({isOpen, setOpen, restauraunt: restaurant, viewport, setViewport} : 
    {isOpen : boolean, setOpen: Dispatch<SetStateAction<boolean>> ,restauraunt: Restaurant | null, 
    viewport: Viewport | null, setViewport: Dispatch<SetStateAction<Viewport>>}) => {
    const classes = useStyles();
    return (
        <>
            <MUIDrawer 
                transitionDuration={500}
                open={isOpen} 
                onClose = {() => setOpen(false)}
                anchor='left'
                classes={{
                    paper: classes.drawerPaper
                  }}
            >
                <DetailView>
                    {/* MapBox Implementation */}
                    <ReactMapGL {...viewport} 
                    // Attribute for API Token
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={(viewport: React.SetStateAction<Viewport>) => {setViewport(viewport)}}
                    mapStyle="mapbox://styles/mapbox/streets-v11">
                        <Marker latitude={(restaurant?.location.lat!=null) ? restaurant?.location.lat! : 0}
                        longitude={(restaurant?.location.lng!=null) ? restaurant?.location.lng : 0}>
                            <Room></Room>
                        </Marker>
                    </ReactMapGL>
                    <NameBox>
                        <Name>{restaurant?.name}</Name>
                        <Type>{restaurant?.category}</Type>
                    </NameBox>
                    <DescriptionBox>
                        <DescriptionText>{restaurant?.location.formattedAddress[0]}</DescriptionText>
                        <DescriptionText>{(restaurant?.contact!=null) ? restaurant?.contact.formattedPhone : "No Phone Contact Available"}
                        </DescriptionText>
                        <DescriptionText>{(restaurant?.contact!=null && restaurant?.contact.twitter!=null ) ? "@"+restaurant?.contact.twitter : ""}</DescriptionText>
                    </DescriptionBox>
                </DetailView>
            </MUIDrawer>
        </>
    )
}

export default Drawer
