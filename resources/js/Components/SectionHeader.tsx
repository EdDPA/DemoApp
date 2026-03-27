import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
interface SectionHeaderProps {
  title: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  onCreate?: () => void;
  createLabel?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  search = "",
  onSearchChange,
  onCreate,
  createLabel = "Crear",
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          spacing={2}
        >
          <Typography variant="h4" fontWeight={600}>
            {title}
          </Typography>

          <Stack direction="row" spacing={2}>
            {onSearchChange && (
              <TextField
                size="small"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                slotProps={{
                    input: {
                    endAdornment: <SearchIcon/>,
                    },
                }}
              />
            )}

            {onCreate && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onCreate}
              >
                {createLabel}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SectionHeader;