"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { styled } from '@mui/material/styles'; // Import from styles

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '& .MuiBreadcrumbs-separator': {
    color: theme.palette.action.disabled,
    margin: theme.spacing(0, 0.5),
  },
  '& .MuiBreadcrumbs-ol': {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        Home
      </Typography>
    </StyledBreadcrumbs>
  );
}
