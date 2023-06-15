import { Space, Text, Title, Divider, List } from '@mantine/core';
import { Box } from '@mantine/core';

const PrivacyPolicy = () => {
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
        Privacy Policy
      </Title>
      <Divider my="md"></Divider>
      <Text fz="xl" fw={700} align="left" span>
        Effective Date:{" "}
      </Text>
      <Text span aling="left">
        {" "}
        10/6/23
      </Text>
      <Space h="md" />
      {/* <Text fz="xl" fw={700} color="Blue" align='left'>
          1. Information We Collect
        </Text> */}
      <Title order={3} color="Blue" align="left">
        1. Information We Collect
      </Title>
      <Space h="sm" />
      <Title order={4} align="left">
        1.1 Personal Information
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may collect the following personal information when you use dBackup:
      </Text>
      <List withPadding size="sm" style={{ textAlign: "left" }}>
        <List.Item>Your name</List.Item>
        <List.Item>Email address</List.Item>
        <List.Item>
          Google Drive account information (access token and refresh token)
        </List.Item>
        <List.Item>Backup scheduling preferences</List.Item>
      </List>
      <Space h="sm" />
      <Title order={4} align="left">
        1.2 Automatically Collected Information
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may also collect certain information automatically when you use
        dBackup, including:
      </Text>
      <List withPadding size="sm" style={{ textAlign: "left" }}>
        <List.Item>
          Log data (e.g., IP address, browser type, pages visited)
        </List.Item>
        <List.Item>
          Usage data (e.g., interactions with the Service, features used)
        </List.Item>
        <List.Item>
          Device information (e.g., device type, operating system)
        </List.Item>
      </List>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        2. How We Use Your Information
      </Title>
      <Space h="sm" />
      <Title order={4} align="left">
        2.1 Provide and Improve the Service
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We use your personal information to provide and improve dBackup,
        including:
      </Text>
      <List withPadding size="sm" style={{ textAlign: "left" }}>
        <List.Item>Backing up your Google Drive folder as scheduled</List.Item>
        <List.Item>
          Authenticating and connecting to your Google Drive account
        </List.Item>
        <List.Item>Personalizing and enhancing your user experience</List.Item>
        <List.Item>
          Analyzing usage patterns to improve dBackup's performance and
          functionality
        </List.Item>
        <List.Item>
          Responding to your inquiries and providing customer support
        </List.Item>
      </List>
      <Space h="sm" />
      <Title order={4} align="left">
        2.2 Communications
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may use your email address to send you administrative and promotional
        communications related to dBackup. You can opt-out of promotional
        communications at any time by following the instructions provided in the
        communication.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        2.3 Aggregated Data
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may aggregate and anonymize your personal information for statistical
        and analytical purposes. Aggregated data does not personally identify
        you and may be used for any lawful purpose.
      </Text>
      <Space h="md" />

      <Title order={3} color="Blue" align="left">
        3. How We Share Your Information
      </Title>
      <Space h="sm" />
      <Title order={4} align="left">
        3.1 Service Providers
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may share your personal information with third-party service
        providers who assist us in providing and improving dBackup. These
        service providers are bound by confidentiality obligations and are not
        permitted to use your personal information for any other purpose.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        3.2 Legal Requirements
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may disclose your personal information if required to do so by law or
        in response to a valid legal request, such as a court order or subpoena.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        3.3 Business Transfers
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        If we are involved in a merger, acquisition, or sale of all or a portion
        of our assets, your personal information may be transferred as part of
        that transaction. We will notify you via email and/or a prominent notice
        on our website of any change in ownership or use of your personal
        informations.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        4. Your Rights and Choices
      </Title>
      <Space h="sm" />
      <Title order={4} align="left">
        4.1 Access and Update
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        You have the right to access and update your personal information. You
        can review and modify your account details by logging into your dBackup
        account. Data Deletion: You can request the deletion of your personal
        information and specific
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        4.2 Data Deletion
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        You can request the deletion of your personal information and specific
        backup data by contacting our support team. Please note that certain
        data may be retained as required by law or for legitimate business
        purposes.
      </Text>
      <Space h="sm" />
      <Title order={4} align="left">
        4.3 Marketing Communications
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        You can opt out of receiving promotional emails and newsletters by
        following the instructions provided in the communication or by
        contacting us directly.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        5. Data Security
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We take data security seriously and implement robust measures to protect
        your information from unauthorized access, loss, or disclosure. We
        employ industry-standard encryption protocols, firewalls, and secure
        data storage practices to safeguard your data while it is in transit and
        at rest. We retain your personal information and backup data for as long
        as necessary to fulfill the purposes outlined in this Privacy Policy,
        unless a longer retention period is required or permitted by law. If you
        delete your account or request the deletion of specific backup data, we
        will make reasonable efforts to comply with your request, subject to any
        legal obligations.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        6. Third-Party Disclosure
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        dBackup does not sell, trade, or transfer your personal information to
        third parties for marketing or advertising purposes. However, we may
        share your information with trusted third-party service providers who
        assist us in delivering our services, subject to strict confidentiality
        obligations.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        7. Third-Party Links and Services
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        dBackup may contain links to third-party websites or services that are
        not operated by us. We have no control over, and assume no
        responsibility for, the content, privacy policies, or practices of any
        third-party websites or services. We encourage you to review the privacy
        policies of these third parties before providing any personal
        information.
      </Text>
      <Space h="md" />

      <Title order={3} color="Blue" align="left">
        8. Children's Privacy
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        dBackup is not intended for use by individuals under the age of 16. We
        do not knowingly collect personal information from children under 16. If
        we become aware that we have collected personal information from a child
        under 16, we will take steps to delete such information as soon as
        possible. If you believe that we may have collected personal information
        from a child under 16, please contact us.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        9. Changes to this Privacy Policy
      </Title>
      <Space h="sm" />
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the updated Privacy Policy on our website. You
        are advised to review this Privacy Policy periodically for any changes.
      </Text>
      <Space h="md" />
      <Title order={3} color="Blue" align="left">
        10. Contact Us
      </Title>
      <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
        <Text ta="left" style={{ fontSize: "15px", margin: "4px" }}>
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at dbackup service
          <Text fz="md" fw={700} span>
            {" "}
            dbackupservice@gmail.com.
          </Text>
        </Text>
      </Text>
    </Box>
  );
};
export default PrivacyPolicy;
