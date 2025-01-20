import React from 'react';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import {
    Box,
    CssBaseline,
    Typography,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './ThemeContext';
import './App.css';

function App() {
    const { mode, toggleTheme } = useTheme();

    return (
        <Box className="container" sx={{ padding: '20px' }}>
            <CssBaseline />
            <AppBar position="static" sx={{ marginBottom: '20px' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Library Management System
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <BookList />
            <MemberList />
        </Box>
    );
}

export default App;
