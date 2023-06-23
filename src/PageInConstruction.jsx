import { Space, Text, Title, Divider, List } from "@mantine/core";
import { Box } from "@mantine/core";
const PageInConstruction = () => {
  return (
    <Box
      maw={800}
      mx="auto"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Title order={1} color="Blue" align="center">
        We are currently working on this page. We will soon be back, for any queries contact dbackupservice@gmail.com
      </Title>
      <Divider my="md"></Divider>

     
      <Space h="md" />
    </Box>
  );
};
export default PageInConstruction;
