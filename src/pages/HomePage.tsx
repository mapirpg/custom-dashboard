import { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const theme = useTheme();

  // Example state for favorite buttons
  const [favorites, setFavorites] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sample card data
  const cards = [
    {
      id: 1,
      title: 'Getting Started',
      subheader: 'Introduction',
      content:
        'Welcome to our React Application! This template includes everything you need to build a modern web application.',
      avatar: 'GS',
    },
    {
      id: 2,
      title: 'Features',
      subheader: "What's included",
      content:
        'This application includes Material UI, React Router, React Query, React Hook Form, and theme customization with dark/light mode.',
      avatar: 'FT',
    },
    {
      id: 3,
      title: 'Next Steps',
      subheader: 'Development',
      content:
        'Start building your application by modifying the components and adding new pages. Check the documentation for more details.',
      avatar: 'NS',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {' '}
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" paragraph>
          This is a starter template for building React applications with Material UI, React Router,
          React Query, and more. It provides a solid foundation for your next project.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="body1">
            User Role: <strong>{user?.role || 'Guest'}</strong>
          </Typography>
          <Box>
            <Button variant="outlined" color="primary" href="/dashboard" sx={{ mr: 1 }}>
              View Dashboard
            </Button>
            <Button variant="contained" color="primary" href="/settings">
              Profile Settings
            </Button>
            {user?.role === 'admin' && (
              <Button variant="contained" color="secondary" href="/admin" sx={{ ml: 1 }}>
                Admin Panel
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Getting Started
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {cards.map(card => (
            <Grid md={4} key={card.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{card.avatar}</Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={card.title}
                  subheader={card.subheader}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{card.content}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(card.id)}
                    color={favorites[card.id] ? 'primary' : 'default'}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mb: 4, textAlign: 'center', p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ready to explore more?
        </Typography>
        <Typography variant="body1" paragraph>
          Check out the documentation or start building your application.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          View Documentation
        </Button>
        <Button variant="outlined" color="secondary">
          Explore Features
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
