import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random/1600x900/?gym)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
          >
            Welcome to Fitness Center
          </Typography>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            Transform your body, transform your life. Join our community of fitness enthusiasts
            and start your journey to a healthier you.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {!user.token ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/clients')}
              >
                Go to Dashboard
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/300x200/?personal-trainer"
                alt="Personal Training"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Personal Training
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get personalized training programs designed specifically for your goals and fitness level.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/300x200/?group-fitness"
                alt="Group Classes"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Group Classes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join our energetic group classes and train with like-minded individuals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://source.unsplash.com/random/300x200/?nutrition"
                alt="Nutrition Plans"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nutrition Plans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get customized nutrition plans to complement your training and achieve optimal results.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 