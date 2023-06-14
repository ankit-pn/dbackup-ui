import { Space, Text, Title, Divider, List } from '@mantine/core';
import { Box } from '@mantine/core';
const AboutUs = () => {
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
        About Us
      </Title>
      <Divider my="md"></Divider>

      <Space h="md" />
      <Title order={2} align="center" color="blue">
        Empowering Data Protection with dBackup
      </Title>
      <Space h="md" />
      <Title order={4} align="left">
        Welcome to dBackup, where we are passionate about ensuring the safety
        and accessibility of your valuable data. At dBackup, we believe that
        everyone deserves a reliable and user-friendly solution for securing
        their digital assets. Our dedicated team of experts has developed a
        cutting-edge cloud service that empowers individuals and businesses to
        back up their data seamlessly.
      </Title>
      <Space h="md" />
      {/* <Text fz="xl" fw={700} color="Blue" align='left'>
          1. Information We Collect
        </Text> */}
      <Title order={3} color="Blue" align="left">
        Our Mission
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Our mission is simple: to provide a robust and intuitive platform that
        enables users to effortlessly protect their data from loss, corruption,
        or accidental deletion. We understand the importance of digital
        information in today's world, where memories, business documents, and
        critical files are increasingly stored in the cloud. Our goal is to
        empower individuals and businesses to take control of their data backup
        strategy and enjoy peace of mind, knowing that their information is safe
        and easily recoverable.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        The dBackup Difference
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        What sets dBackup apart from other data backup services? We pride
        ourselves on offering a comprehensive suite of features that prioritize
        simplicity, customization, and reliability. Here's what makes dBackup
        the preferred choice for individuals and businesses alike:
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        1. User-Friendly Interface
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We believe that technology should be accessible to all. Our
        user-friendly interface ensures that you can effortlessly navigate the
        dBackup platform, regardless of your technical expertise. We've designed
        it with simplicity in mind, enabling you to focus on what matters
        most—your data.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        2. Customizable Backup Scheduling
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We understand that every user has unique backup requirements. With
        dBackup, you have the flexibility to schedule backups according to your
        specific needs. Whether you prefer immediate backups, regular intervals,
        or a personalized schedule, our platform caters to your preferences.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        3. Secure and Reliable Infrastructure
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Your data deserves the highest level of protection. That's why we have
        invested in a secure and reliable infrastructure that utilizes advanced
        encryption protocols to keep your files safe. Our dedicated team
        continuously monitors our systems, ensuring optimal performance and
        uptime.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        4. Generous Storage Limits
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We believe in providing ample space for your data backups. With a
        generous storage limit of 20 GB, you can safeguard a substantial amount
        of files, photos, documents, and more. Should you require additional
        storage, our support team is here to assist you in expanding your
        allocation seamlessly
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        5. Easy Data Retrieval
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We understand that the purpose of data backup is to have quick access to
        your files when you need them. With dBackup, retrieving your backed-up
        data is as simple as a few clicks. We provide compressed zip folders for
        easy download, allowing you to restore your files promptly.
      </Text>
      <Space h="sm" />

      <Title order={4}  align="left">
        6. Transparent Data Management
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Transparency is a core value at dBackup. We believe that you should have
        full control over your backup data. Our platform enables you to manage
        and delete specific backup files, helping you maintain an organized and
        clutter-free backup environment.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="center">
        Join dBackup Today!
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        Join thousands of satisfied users who have chosen dBackup as their go-to
        solution for data backup. Whether you are an individual seeking to
        protect your personal files or a business aiming to safeguard critical
        information, dBackup is here to support you every step of the way. Our
        dedicated team is committed to delivering exceptional customer service
        and ensuring that your data is handled with the utmost care and
        security. Experience the peace of mind that comes with knowing your data
        is backed up reliably and conveniently. Start your journey with dBackup
        today and discover a new level of data protection. Together, we can
        empower you to take control of your digital assets and embrace a
        worry-free data backup solution. Protect, secure, and preserve your data
        with dBackup—your trusted partner in data backup.
      </Text>
      <Space h="md" />
    </Box>
  );
};
export default AboutUs;
