import { AppShell, Header, Grid, Button, Space, Text, Flex, Title, Table, Overlay, Loader } from '@mantine/core';
import iim from './logo/png/logo-no-background.png';
import { TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { IconTrash, IconDownload } from '@tabler/icons-react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./font.css";
import "./navbar.css";
const api_server = process.env.REACT_APP_API_SERVER;
const MainAppContent = (props) => {
    const tableBgColor = "rgba(39, 245, 198, 1)";
    const accessToken = props.accessToken;
    const [loading,setLoading] = useState(false);
    const [rowElements, setRowElements] = useState([]);
    const [click,setClick] = useState(false);
    const [bgColorTable1,setBgColorTable1] = useState(tableBgColor);
    const [bgColorTable2, setBgColorTable2] = useState("");
     const form = useForm({
      initialValues: {
        folderName: '',
        scheduling_type: "0",
        termsOfService: false,
      }
    });
    
    const handleSubmit = async () => {
        const data = form.values;
        if(data['termsOfService']===false)
        alert('You have not agreed with Term and Conditions')
        else{
        setLoading(true)
        const res = {};
        console.log(data)
        res['folder_name']=data['folderName']
        res['scheduling_type'] = data['scheduling_type'];
        res['access_token'] = accessToken;
        const url = `${api_server}/addfolder`
        try{
            const res_data = await axios.post(url, res);
            const msg = res_data.data['Data'];
            alert(`${msg}`);
        }
        catch(error){
            alert(error)
        }
        setLoading(false)
    }
        form.reset();
    }

    const handleClickBackedUpFolders = () => {
        if(bgColorTable1===""){
            setBgColorTable1(tableBgColor)
            setBgColorTable2("")
        }
    }
    const handleClickRequestFolders = () => {
      if (bgColorTable2 === "") {
        setBgColorTable2(tableBgColor);
        setBgColorTable1("");
      }
    };



     const handleDownloadButton = async (folder_name, accessToken) => {
        const url = `${api_server}/downloadfolder`;
        try{
             const response = await axios.post(
               url,
               {
                 folder_name,
                 access_token: accessToken,
               },
               {
                 responseType: 'blob',
               },
             );

             const downloadUrl = window.URL.createObjectURL(response.data);
             const a = document.createElement('a');
             a.href = downloadUrl;
             a.download = `${folder_name}.zip`;
             a.click();
             window.URL.revokeObjectURL(downloadUrl);
        }
        catch(error){
            console.log(error)
        }
    };
     const handleBfDeleteButton = async (folder_name,accessToken) => {
        const url = `${api_server}/deletefolder`;
         try {
            setClick(true)
            const res = {folder_name,access_token:accessToken};
            await axios.post(url,res);
            setClick(false)
         } catch (error) {
            console.log(error)
         }
    }
     const handleRequestDeleteButton = async (folder_name, accessToken) => {
       const url = `${api_server}/deleterequest`;
       try {
         setClick(true);
         const res = { folder_name, access_token: accessToken };
         await axios.post(url, res);
         setClick(false);
       } catch (error) {
         console.log(error);
       }
     };

    
     useEffect(()=>{ 
        const elements = async () => {
          const url = `${api_server}/getfolderlist`;
          try {
            const res = {};
            res['access_token'] = accessToken;
            const response = await axios.post(url, res);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };
        const fetchData = async () => {
            try{
          const elems = await elements();
          const elems1 = elems.backup_folders;
          const elems2 = elems.request_folders;
          console.log(elems);
          const rws1 = elems1.map((element) => (
            <tr key={element[0]}>
              <td>{element[2]}</td>
              <td>{element[3]}</td>
              <td>
                <Button
                  leftIcon={<IconDownload />}
                  variant="subtle"
                  color="gray"
                  onClick={() => handleDownloadButton(element[2], accessToken)}
                >
                  {' '}
                </Button>
              </td>
              <td>
                {' '}
                <Button
                  leftIcon={<IconTrash />}
                  variant="subtle"
                  color="gray"
                  onClick={() => handleBfDeleteButton(element[2], accessToken)}
                >
                  {' '}
                </Button>
              </td>
            </tr>
          ));
          const rws2 = elems2.map((element) => (
            <tr key={element[0]}>
              <td>{element[2]}</td>
              <td>{element[3]}</td>
              <td>
                {" "}
                <Button
                  leftIcon={<IconTrash />}
                  variant="subtle"
                  color="gray"
                  onClick={() => handleRequestDeleteButton(element[2], accessToken)}
                >
                  {" "}
                </Button>
              </td>
            </tr>
          ));
          if(bgColorTable1==="")
          setRowElements(rws2);
          else
          setRowElements(rws1);
          }
          catch(error){
            console.log(error);
          }
        };
        fetchData();

    },[accessToken,loading,click,bgColorTable1,bgColorTable2]);
    return (
      <div style={{ backgroundColor: "rgba(39, 245, 198, 0.05)" }}>
        {" "}
        <Grid>
          <Grid.Col span={9}>
            <Title order={3} align="center">
              <Text span c="blue" inherit>
                {"Scheduled Backup List"}
              </Text>
            </Title>
            <Space h="md" />
            <Flex
              direction="row"
              align="center"
              justify="center"
              gap="xl"
              style={{ marginTop: "20px" }}
            >
              <Table style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: bgColorTable1,
                    height: "35px",
                    padding: "5px",
                  }}
                  onClick={handleClickBackedUpFolders}
                >
                  {" "}
                  <Title order={3}>Backed Up Folders</Title>
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: bgColorTable2,
                    height: "35px",
                    padding: "5px",
                  }}
                  onClick={handleClickRequestFolders}
                >
                  <Title order={3}>Requested Backup</Title>
                </th>
              </Table>
            </Flex>
            <Space h="md" />

            <Table highlightOnHover>
              {bgColorTable1 !== "" && (
                <thead>
                  <tr>
                    <th>Folder Name</th>
                    <th>Backup Time</th>
                    <th>Download</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              )}
              {bgColorTable2 !== "" && (
                <thead>
                  <tr>
                    <th>Folder Name</th>
                    <th>Last Checked</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              )}
              <tbody>{rowElements}</tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span="auto">
            <img
              src={iim}
              alt="logo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
            <Space h="xl" />
            <Title order={3}>
              {"Add "}
              <Text span c="blue" inherit>
                {"folder "}
              </Text>
              {"that you want to "}
              <Text span c="blue" inherit>
                Backup
              </Text>
            </Title>
            <Space h="xl" />
            <Box maw={300} mx="auto">
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                  placeholder="Enter Folder Name"
                  label="Folder Name"
                  radius="md"
                  size="md"
                  withAsterisk
                  {...form.getInputProps("folderName")}
                />
                <Space h="md" />
                <Input
                  component="select"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                  label="Choose Backup Type"
                  {...form.getInputProps("scheduling_type")}
                >
                  <option value="0">Backup Now</option>
                  <option value="1">
                    Backup whenever folder get available
                  </option>
                </Input>

                <Checkbox
                  mt="md"
                  label="I agree to term and conditions"
                  {...form.getInputProps("termsOfService", {
                    type: "checkbox",
                  })}
                />

                <Group position="right" mt="md">
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Group>
              </form>
            </Box>
          </Grid.Col>
        </Grid>
        {loading && (
          <Overlay zIndex={1000} opacity={0.75} color="#fff">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Loader size="md" />
              <Space h="md" />
              <Title order={3}> Backuping folder Now</Title>
            </div>
          </Overlay>
        )}
      </div>
    );
}

export default MainAppContent