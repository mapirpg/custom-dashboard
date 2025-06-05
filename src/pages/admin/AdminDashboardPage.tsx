import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  SupervisorAccount as AdminIcon,
  Person as UserIcon,
  Lock as LockIcon,
  Check as CheckIcon,
  Close as CloseIcon,
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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock data
const createUser = (
  id: number,
  name: string,
  email: string,
  role: string,
  status: string,
  lastLogin: string,
) => ({
  id,
  name,
  email,
  role,
  status,
  lastLogin,
});

const mockUsers = [
  createUser(1, 'John Doe', 'john@example.com', 'Admin', 'Active', '2025-06-04'),
  createUser(2, 'Jane Smith', 'jane@example.com', 'User', 'Active', '2025-06-03'),
  createUser(3, 'Robert Johnson', 'robert@example.com', 'Editor', 'Inactive', '2025-05-28'),
  createUser(4, 'Emily Davis', 'emily@example.com', 'User', 'Active', '2025-06-02'),
  createUser(5, 'Michael Wilson', 'michael@example.com', 'User', 'Active', '2025-06-01'),
  createUser(6, 'Sarah Brown', 'sarah@example.com', 'Editor', 'Active', '2025-05-31'),
  createUser(7, 'David Miller', 'david@example.com', 'User', 'Inactive', '2025-05-20'),
  createUser(8, 'Jennifer Garcia', 'jennifer@example.com', 'User', 'Active', '2025-05-29'),
  createUser(9, 'James Rodriguez', 'james@example.com', 'Editor', 'Active', '2025-05-30'),
  createUser(10, 'Lisa Martinez', 'lisa@example.com', 'User', 'Active', '2025-06-01'),
];

const userRoles = ['Admin', 'Editor', 'User'];
const userStatuses = ['Active', 'Inactive'];

const AdminDashboardPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser({ ...user });
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    setSelectedUser({
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
    });
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    if (dialogMode === 'add') {
      setUsers([...users, selectedUser]);
    } else {
      setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
    }

    setIsDialogOpen(false);
  };

  const handleUserChange = (field: string, value: string) => {
    setSelectedUser({ ...selectedUser, [field]: value });
  };

  // Admin dashboard statistics
  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: <UserIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Users',
      value: users.filter(user => user.status === 'Active').length,
      icon: <CheckIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: 'Admins',
      value: users.filter(user => user.role === 'Admin').length,
      icon: <AdminIcon fontSize="large" />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Inactive Users',
      value: users.filter(user => user.status === 'Inactive').length,
      icon: <LockIcon fontSize="large" />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid xs={6} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderLeft: `4px solid ${stat.color}` }}>
              <CardContent>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: `${stat.color}15`,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="admin tabs"
          >
            <Tab label="Users" />
            <Tab label="Settings" />
            <Tab label="Logs" />
          </Tabs>
        </AppBar>

        {/* Users Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={
                          user.role === 'Admin'
                            ? 'secondary'
                            : user.role === 'Editor'
                              ? 'primary'
                              : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'Active' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleEditUser(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            System Settings
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              These settings are available only for administrators. They control global application
              behavior and security preferences.
            </Typography>

            {/* Placeholder for settings content */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {['Security', 'Appearance', 'Notifications', 'Integration'].map(setting => (
                  <Grid md={3} key={setting}>
                    <Paper sx={{ p: 2, textAlign: 'center' }} variant="outlined">
                      <Typography variant="subtitle1">{setting} Settings</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </TabPanel>

        {/* Logs Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            System Logs
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Viewing system logs and activity history.
            </Typography>

            {/* Placeholder for logs content */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      time: '2025-06-05 09:23:45',
                      user: 'admin',
                      action: 'User Created',
                      details: 'Created user: john@example.com',
                    },
                    {
                      time: '2025-06-05 08:17:32',
                      user: 'system',
                      action: 'System Update',
                      details: 'Updated to version 2.1.0',
                    },
                    {
                      time: '2025-06-04 16:42:11',
                      user: 'admin',
                      action: 'Settings Changed',
                      details: 'Modified security settings',
                    },
                    {
                      time: '2025-06-04 14:15:22',
                      user: 'admin',
                      action: 'User Deleted',
                      details: 'Removed user: old_user@example.com',
                    },
                  ].map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </TabPanel>
      </Paper>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={selectedUser?.name || ''}
              onChange={e => handleUserChange('name', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={selectedUser?.email || ''}
              onChange={e => handleUserChange('email', e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedUser?.role || ''}
                label="Role"
                onChange={e => handleUserChange('role', e.target.value)}
              >
                {userRoles.map(role => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedUser?.status || ''}
                label="Status"
                onChange={e => handleUserChange('status', e.target.value)}
              >
                {userStatuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
          >
            {dialogMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardPage;
