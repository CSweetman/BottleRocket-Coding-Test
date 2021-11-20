import React, { Dispatch, SetStateAction } from 'react'
import {Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core"
import styled from 'styled-components'
import { Restaurant } from '../App';
import { Name, Type } from './RestaurantCard';

const DetailView = styled.div`
    display: grid;
    grid-template-rows: 4fr 1fr 4fr;
    @media (max-width: 768px) {
        grid-template-rows: 3fr 1fr 3fr;
    }
    height: 100%;

`
const MapBox = styled.div`

    border: 3px solid orange;
`
const NameBox = styled.div`
    background-color: #34B379;
    font-family: 'Montserrat', sans-serif;
    ${Name}, ${Type}{
        margin-left: 12px;
    }
    border: 3px solid orange;
`
const DescriptionBox = styled.div`
    border: 3px solid orange;
`

const DescriptionText = styled.p`
    margin-left: 12px;
    margin-bottom: 26px;
    font-size: 16px;
    color: #2A2A2A;
`


const drawerWidth = '35%';
const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
        top: '15%',
        width: drawerWidth,
        height: '70%'
    }
}));


const Drawer = ({isOpen, setOpen, restauraunt} : {isOpen : boolean, setOpen: Dispatch<SetStateAction<boolean>> ,restauraunt: Restaurant | null}) => {
    const classes = useStyles();
    return (
        <>
            <MUIDrawer 
                open={isOpen} 
                onClose = {() => setOpen(false)}
                anchor='left'
                classes={{
                    paper: classes.drawerPaper
                  }}
            >
                <DetailView>
                    <MapBox></MapBox>
                    <NameBox>
                        <Name>{restauraunt?.name}</Name>
                        <Type>{restauraunt?.category}</Type>
                    </NameBox>
                    <DescriptionBox>
                        <DescriptionText>{restauraunt?.location.formattedAddress[0]}</DescriptionText>
                        <DescriptionText>{(restauraunt?.contact!=null) ? restauraunt?.contact.formattedPhone : "No Phone Contact Available"}
                        </DescriptionText>
                        <DescriptionText>{(restauraunt?.contact!=null && restauraunt?.contact.twitter!=null ) ? "@"+restauraunt?.contact.twitter : ""}</DescriptionText>
                    </DescriptionBox>
                </DetailView>
            </MUIDrawer>
        </>
    )
}

export default Drawer
