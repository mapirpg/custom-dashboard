import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  Avatar,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  ShowChart as ChartIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const DashboardPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for the dashboard
  const stats = [
    {
      id: 1,
      title: 'Users',
      value: '1,249',
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
    },
    {
      id: 2,
      title: 'Revenue',
      value: '$12,450',
      icon: <MoneyIcon />,
      color: theme.palette.success.main,
    },
    {
      id: 3,
      title: 'Tasks',
      value: '24',
      icon: <AssignmentIcon />,
      color: theme.palette.warning.main,
    },
    {
      id: 4,
      title: 'Notifications',
      value: '8',
      icon: <NotificationsIcon />,
      color: theme.palette.error.main,
    },
  ];

  const activities = [
    { id: 1, user: 'John Doe', action: 'created a new task', time: '5 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'completed Project X', time: '25 minutes ago' },
    { id: 3, user: 'Alex Johnson', action: 'updated their profile', time: '1 hour ago' },
    { id: 4, user: 'Sarah Williams', action: 'added a new comment', time: '3 hours ago' },
    { id: 5, user: 'Mike Brown', action: 'uploaded a document', time: '5 hours ago' },
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, color: theme.palette.primary.main },
    { id: 2, name: 'Mobile App Development', progress: 45, color: theme.palette.secondary.main },
    { id: 3, name: 'CRM Integration', progress: 90, color: theme.palette.success.main },
    { id: 4, name: 'Database Migration', progress: 30, color: theme.palette.warning.main },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map(stat => (
          <Grid size={6} key={stat.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderLeft: `4px solid ${stat.color}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    bgcolor: `${stat.color}15`,
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stat.value}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
                <Tab label="Overview" />
                <Tab label="Activities" />
                <Tab label="Projects" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Dashboard Overview
                </Typography>
                <Typography variant="body2" paragraph>
                  Welcome to your dashboard! Here you can view key metrics and manage your projects.
                </Typography>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Active Projects
                </Typography>
                {projects.map(project => (
                  <Box key={project.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2">{project.name}</Typography>
                      <Typography variant="body2" sx={{ ml: 'auto' }}>
                        {project.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${project.color}20`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: project.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {activities.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body1">{activity.user}</Typography>}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">
                              {activity.action}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={2}>
                {projects.map(project => (
                  <Grid key={project.id}>
                    <Card variant="outlined">
                      <CardHeader
                        title={project.name}
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Progress
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flex: 1, mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={project.progress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: `${project.color}20`,
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: project.color,
                                  },
                                }}
                              />
                            </Box>
                            <Typography variant="body2">{project.progress}%</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ChartIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Last updated: Today
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List dense>
              {activities.slice(0, 3).map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: theme.palette.primary.main }}>
                        {activity.user.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={activity.user} secondary={activity.action} />
                  </ListItem>
                  {index < 2 && <Divider component="li" />}
                </Box>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            {projects.map(project => (
              <Box key={project.id} sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  {project.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      flexGrow: 1,
                      mr: 1,
                      bgcolor: `${project.color}20`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: project.color,
                      },
                    }}
                  />
                  <Typography variant="caption">{project.progress}%</Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
