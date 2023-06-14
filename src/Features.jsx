import { Space, Text, Title, Divider, List } from '@mantine/core';
import { Box } from '@mantine/core';
const Features = () => {
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
        Features
      </Title>
      <Divider my="md"></Divider>

      <Space h="md" />
      <Title order={2} align="center" color="blue">
        Introducing dBackup: The Ultimate Data Backup Solution
      </Title>
      <Space h="md" />
      <Title order={4} align="left">
        Welcome to dBackup, your trusted cloud service for seamless data backup
        from Google Drive. Our innovative web application provides you with a
        range of powerful features to ensure the safety and accessibility of
        your important files and folders. With dBackup, you can effortlessly
        schedule backups, customize your preferences, and securely store your
        data on our reliable cloud infrastructure.
      </Title>
      <Space h="md" />
      {/* <Text fz="xl" fw={700} color="Blue" align='left'>
          1. Information We Collect
        </Text> */}
      <Title order={3} color="Blue" align="left">
        1. Schedule and Automate Backups
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        With dBackup, you are in control of your data backup schedule. Our
        user-friendly interface allows you to specify a folder within your
        Google Drive that you want to back up. Once selected, you can easily
        schedule your backups according to your specific needs:
      </Text>
      <Space h="sm" />
      <List withPadding size="sm" style={{ textAlign: "left" }}>
        <List.Item>
          Backup Now: Initiate an immediate backup of your chosen folder with
          just a single click. Perfect for those moments when you need to secure
          your data promptly.
        </List.Item>
        <List.Item>
          Backup After 1 Hour: Set a backup delay of one hour, allowing you to
          focus on your work while ensuring your files are backed up regularly
          without any hassle.
        </List.Item>
        <List.Item>
          Backup After 1 Day: Opt for a daily backup schedule to keep your data
          continuously protected. With this option, you can rest assured knowing
          your files are always up to date.
        </List.Item>
        <List.Item>
          Schedule Custom Backup: For ultimate flexibility, dBackup offers the
          ability to create a custom backup schedule that aligns perfectly with
          your unique requirements. Whether it's a specific time, day, or
          recurring pattern, you have the power to tailor your backup strategy
          to suit your needs.
        </List.Item>
      </List>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        2. Retrieve and Download Backed-Up Files
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We understand that easy access to your backed-up data is crucial. With
        dBackup, you can effortlessly retrieve your files whenever you need
        them. Once a backup is completed, our platform generates a compressed
        zip folder, making it convenient for you to download and extract your
        data at any time.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        3. Limitless Storage with a Generous Offer
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        At dBackup, we believe in providing ample storage space to accommodate
        your backup needs. Our cloud service offers a substantial limit of 20
        GB, allowing you to safeguard a significant amount of data without
        worrying about running out of storage capacity. Should you require
        additional space, our support team is always available to guide you
        through the process of expanding your storage allocation.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        4. Manage Your Backup Data
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Transparency and control over your data are paramount to us. With
        dBackup, you have full control over your backup files. If you decide
        that certain data is no longer needed or you have reached the storage
        limit, you can easily delete specific backup files from our servers.
        This enables you to maintain a clutter-free backup environment and
        manage your storage efficiently.
      </Text>
      <Space h="md" />

      <Title order={3} color="Blue" align="left">
        5. Experience the Reliability of dBackup
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        At dBackup, we prioritize the security and integrity of your data. Our
        cloud service is built on a robust infrastructure that ensures your
        backups are safeguarded at all times. Our team of dedicated
        professionals continuously monitors our servers to guarantee a seamless
        and reliable backup experience for our valued users.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="center">
        Join dBackup Today!
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Don't leave your important files vulnerable to data loss or corruption.
        Sign up for dBackup today and enjoy the peace of mind that comes with
        automatic and secure backups. With our user-friendly interface, flexible
        scheduling options, and generous storage limits, you can confidently
        entrust your data to dBackup and focus on what matters most to you.
        Start your journey with dBackup and embrace a worry-free data backup
        solution!
      </Text>
      <Space h="md" />
    </Box>
  );
};
export default Features;
