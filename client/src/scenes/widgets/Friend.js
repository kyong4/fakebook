import { Avatar, Box, Typography } from "@mui/material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <Avatar src={userPicturePath} alt={`${name}'s avatar`} />
      <Box>
        <Typography fontWeight="500">{name}</Typography>
        <Typography color="text.secondary">{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default Friend;