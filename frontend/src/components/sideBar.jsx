import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import{ Link } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Conection from './conection';

import { useNavigate } from 'react-router-dom';
import Session from '../utils/session';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function SideBar() {

  const SidebarData = [
    {
        title: "Projects",
        path: '/projects',
    },
    {
      title:"Logout",
      path: ""
    },
  ]
const {RemoveValue,GetValue} = Session();

  const { DoLogout} = Conection();
  const navigate = useNavigate();

  const handleLogout = data =>{
      console.log(data)
      const sessionId= GetValue("PM_sessionId")
      DoLogout({sessionId}).then(res =>{
        console.log(res.data)
        RemoveValue("PM_sessionId")
        navigate('/');
    })
    .catch(err =>{
        console.log(err)
        console.log("User can't be reached")
    })
      }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography 
            variant="h6" noWrap component="div" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Welcome Back
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
              {SidebarData.map((item, index) => {
                if (item.title == 'Logout'){
                  return (<ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <DashboardRoundedIcon/>{item.title}  <ListItemText/>
                    </ListItemIcon>
                  </ListItem>)
                } else {
                  return(<Link to ={item.path}>
                    <ListItem button >
                      <ListItemIcon>
                        <DashboardRoundedIcon/>{item.title}  <ListItemText/>
                      </ListItemIcon>
                    </ListItem>
                  </Link>)
                }
                
                
              })}
              
              </List>
            </Box>
            
          </Drawer>
          
        
      <Toolbar />
        
      </Box>
      
    </React.Fragment>
    
    
            
    
  );
}