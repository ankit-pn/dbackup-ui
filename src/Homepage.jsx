import {Grid, Button, Image, Stack, Space, Text, Flex, Title, Center, Card} from '@mantine/core';
import Card1 from './Card1';
import Textt from './Textt';
import iim from './logo/png/logo-no-background.png'
import drivelogo from './logo/logo_drive_2020q4_color_2x_web_64dp.png'
import signingwithgoogle from './logo/btn_google_signin_light_normal_web@2x.png'
import "./font.css";
import "./homepage.css"
import SmallCard from './SmallCard';
import './images.css'
import CrashCard from './CrashCard';
import FooterLinks from './Footer';
import automatedimage from "./logo/online_backup_cloud_service-100737202-orig.webp";
import restoreimage from './logo/images-restore.jpeg'
import userfriendly from './logo/userfrendlt.jpeg'
import gdrp from './logo/gdrp.png'
import securityimage from './logo/security.png'
import dataown from './logo/own-your-data.png'
import seamlesscloud from './logo/Seamless-Cloud-Integration.png'
import schedulingoptions from './logo/Scheduling-Options-in-cloud-backup--cloud-backup-technology-.png'
import freestorage from './logo/Limitless-Storage-with-a-Generous-Offer--cloud-backup-technology-.png'
import timer from './logo/timer.png'
import harddrive from './logo/hard-disk-drive.png'
import hardwarefail from './logo/error.png'
import money from './logo/dollar.png'
const api_server = process.env.REACT_APP_API_SERVER;


const HomePage = () => {
         const handleConnectNow = () => {
           window.location.href = `${api_server}/connect`;
         };
         const handleLoginNow = () => {
           window.location.href = `${api_server}/login`;
         };
         const data = [
           {
             title: "Product",
             links: [
               {
                 label: "Features",
                 link: "/features",
               },
               {
                 label: "Pricing",
                 link: "/pageinconstruction",
               },
               {
                 label: "Security",
                 link: "/pageinconstruction",
               },
               {
                 label: "Why DBackup",
                 link: "/pageinconstruction",
               },
             ],
           },
           {
             title: "Company",
             links: [
               {
                 label: "About us",
                 link: "/aboutus",
               },
               {
                 label: "Support",
                 link: "/pageinconstruction",
               },
               {
                 label: "Help Guides",
                 link: "/pageinconstruction",
               },
               {
                 label: "Articles",
                 link: "/pageinconstruction",
               },
             ],
           },
         ];


    return (
      <Flex
        justify="center"
        direction="column"
        style={{ backgroundColor: "rgba(39, 245, 198, 0.15)", margin: "-10px" }}
      >
        <Grid className="home-content-border">
          <Grid.Col span="auto"> </Grid.Col>
          <Grid.Col span={7}>
            <Stack spacing="md" align="flex-start" h={600}>
              <Image src={iim} />
              <Space h="xl" />
              <Textt content="✔ Easily store up to 20 GB of data and retrieve it at your convenience." />
              <Textt content="✔ Securely capture a snapshot of your drive folder in our cloud storage." />
              <Textt content="✔ Automatically backup your Google drive folder to secure cloud" />
              <Textt
                content={`✔ Schedule your backup and we will automatically backup your\n\nfolder`}
              />
              <Textt content="✔ Download your folder whenever you want without going to any hustle" />
              <Space h="xl" />
              <Flex
                mih={50}
                gap="xl"
                justify="space-between"
                align="center"
                direction="row"
              >
                <Button
                  style={{ color: "gray", backgroundColor: "white", boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'}}
                  radius="xl"
                  onClick={handleConnectNow}
                >
                  <Text>Connect {"Google Drive  "}</Text>
                  <img
                    src={drivelogo}
                    alt="nan"
                    style={{ width: "20px", margin: "10px" }}
                  />
                </Button>
                <Space h="xl" />
                <Flex justify="space-between" align="center" gap="xs">
                  <Title order={6}>
                    <Text span c="blue" fw={700} inherit>
                      Already have Backup?{" "}
                    </Text>
                  </Title>
                  <Space h="xl" />

                  <img
                    src={signingwithgoogle}
                    alt="nan"
                    style={{ width: "200px" }}
                    onClick={handleLoginNow}
                  />
                </Flex>
              </Flex>
            </Stack>
          </Grid.Col>
          <Grid.Col span="auto"></Grid.Col>
        </Grid>
        <div style={{ backgroundColor: "rgba(39, 245, 198, 0.05)" }}>
          <Title
            order={1}
            align="center"
            className="enhance-title"
            style={{ marginBottom: "40px" }}
          >
            How does dBackUp enhance your productivity?
          </Title>
          <Flex direction="column">
            <Flex direction="row" className="homepage-productivity-flex-row">
              <img
                src={automatedimage}
                style={{
                  borderRadius: "20px",
                  width: "200px",
                  marginRight: "25px",
                }}
                alt="nan"
              />
              <Stack>
                <Title order={3}>Automated Data Backup Solution</Title>
                <Text className="common-text-small">
                  dBackUp automates the process of backing up your important
                  data, eliminating the need for manual intervention. With
                  scheduled backups and customizable settings, you can ensure
                  that your files are regularly and securely saved to our cloud
                  service, providing peace of mind and saving you time and
                  effort.
                </Text>
              </Stack>
            </Flex>
            <Flex direction="row" className="homepage-productivity-flex-row">
              <Stack>
                <Title order={3}>Seamless File Restoration Solution</Title>
                <Text className="common-text-small">
                  In the event of data loss or accidental deletion, dBackUp
                  allows you to effortlessly restore your files from the backup.
                  With just a few clicks, you can retrieve specific files or
                  entire folders, ensuring quick and efficient recovery without
                  disrupting your workflow.
                </Text>
              </Stack>
              <img
                src={restoreimage}
                class="homepage-productivity-image"
                alt="nan"
                style={{ marginRight: "0px", marginLeft: "25px" }}
              />
            </Flex>
            <Flex direction="row" className="homepage-productivity-flex-row">
              <img
                src={userfriendly}
                class="homepage-productivity-image"
                alt="nan"
              />
              <Stack>
                <Title order={3}>User-Friendly Interface</Title>
                <Text className="common-text-small">
                  dBackUp features a user-friendly interface that makes it easy
                  for anyone to navigate and utilize the app. With intuitive
                  controls and clear instructions, you can easily set up
                  backups, manage your data, and access your files whenever
                  needed, enhancing your productivity without the need for
                  technical expertise.
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </div>
        <div style={{ backgroundColor: "rgba(39, 245, 198, 0.1)" }}>
          <Title
            order={1}
            align="center"
            className="enhance-title-without-margin"
          >
            With dBackUp, your data is 100% secure
          </Title>
          <Flex direction="row" className="need-padding">
            <Card1
              className="homepage-card"
              imagecontent={dataown}
              titlecontent="Take Charge: Own and Safeguard Your Data"
              maincontent="dBackup acts as a bridge, linking your personal cloud drives. Your valuable files reside securely within trusted cloud backup services, granting exclusive access solely to you."
            ></Card1>
            <Card1
              className="homepage-card"
              imagecontent={securityimage}
              titlecontent="Industry-leading Technologies."
              maincontent="
Experience Secure Data Transfer: Our advanced 256-bit AES Encryption ensures tamper-proof communication. Connect cloud drives using OAuth authentication, guaranteeing no storage of login information for ultimate protection."
            ></Card1>
            <Card1
              className="homepage-card"
              imagecontent={gdrp}
              titlecontent="GDPR Compliance"
              maincontent="We enforce robust security protocols and employ technical safeguards to safeguard the privacy of personal data. DBackup strictly processes only the essential personal data required for specific purposes."
            ></Card1>
          </Flex>
        </div>

        <div style={{ backgroundColor: "rgba(39, 245, 198, 0.17)" }}>
          <Title align="center" className="enhance-title">
            Our Cloud Features
          </Title>
          <Flex direction="column"></Flex>
          <Flex direction="row">
            <SmallCard
              titlecontent="Seamless Cloud Integration"
              maincontent=" Seamlessly transfer cloud files to our secure storage without the need for time-consuming downloads and re-uploads."
              imagecontent={seamlesscloud}
            ></SmallCard>
            <SmallCard
              titlecontent="Scheduling Options"
              maincontent="Schedule backup of your data whenever you want, and we will backup that data for you. We have mulitple scheduing options for you."
              imagecontent={schedulingoptions}
            ></SmallCard>
          </Flex>
          <Flex direction="row" justify="center">
            <SmallCard
              titlecontent="20 GB free storage"
              maincontent="Benefit from 20GB of complimentary storage space in our secure cloud, allowing you to store your valuable data with peace of mind."
              imagecontent={freestorage}
              style={{ flexBasic: "0", flex: "1 1 0px", width: "0px" }}
            ></SmallCard>
            <SmallCard
              titlecontent="User friendly Interface"
              maincontent="
Seamless and Effortless Navigation Providing an Intuitive User Experience that Enhances Accessibility and Simplifies Interactions."
              imagecontent={userfriendly}
              style={{ flexBasic: "0", flex: "1 1 0px", width: "0px" }}
            ></SmallCard>
          </Flex>
        </div>

        <div style={{ padding: "40px" }}>
          <Title
            align="center"
            className="enhance-title"
            style={{ marginBottom: "5px" }}
          >
            Why Do You Need Cloud Backup?
          </Title>
          <Text
            align="center"
            className="small-text"
            style={{ marginBottom: "20px" }}
          >
            There are numerous threats to cause data loss and breaches.
            Traditional cloud data backup solutions cannot address various kinds
            of threats any more. Losing your files is much more common than
            you'd think.
          </Text>
          <Flex direction="row">
            <CrashCard
              titlecontent="10s"
              maincontent="How often someone in world is attacked by ransomware."
              imagecontent={timer}
            ></CrashCard>
            <CrashCard
              titlecontent="100000"
              maincontent="hard drives crash each week in U.S alone ."
              imagecontent={harddrive}
            ></CrashCard>
            <CrashCard
              titlecontent="40%"
              maincontent="of data loss is caused by hardware failure."
              imagecontent={hardwarefail}
            ></CrashCard>
            <CrashCard
              titlecontent="$600B"
              maincontent="Global losses from cybercrimes each year."
              imagecontent={money}
            ></CrashCard>
          </Flex>
        </div>
        <div
          style={{
            backgroundColor: "rgba(39, 245, 198, 0.17)",
            padding: "50px",
          }}
        >
          <Flex
            style={{
              backgroundColor: "rgba(64, 219, 152,0.8)",
              borderRadius: "20px",
              padding: "20px",
              border: "10px",
            }}
            direction="column"
          >
            <Title order={2} align="center" className="backup-down">
              Afraid to lose your precious files?
            </Title>
            <Title order={2} align="center" className="backup-down">
              Backup your files with the best free cloud backup solution.
            </Title>
            <Flex direction="row" justify="center" align="center">
              <Button
                radius="xl"
                onClick={handleConnectNow}
                style={{ margin: "40px",color: "gray", backgroundColor: "white", boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)' }}
              >
                <Text>Connect {"Google Drive  "}</Text>
                <img
                  src={drivelogo}
                  alt="nan"
                  style={{ width: "20px", margin: "10px" }}
                />
              </Button>
              <Flex justify="space-between" align="center" gap="xs">
                <Title order={6}>
                  <Text span c="blue" fw={700} inherit>
                    Already have Backup?{" "}
                  </Text>
                </Title>
                <Space h="xl" />

                <img
                  src={signingwithgoogle}
                  alt="nan"
                  style={{ width: "200px" }}
                  onClick={handleLoginNow}
                />
              </Flex>
            </Flex>
          </Flex>
        </div>
        <FooterLinks data={data} />
      </Flex>
    );
}

export default HomePage