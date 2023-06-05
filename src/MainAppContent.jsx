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
const api_server = process.env.REACT_APP_API_SERVER;
const MainAppContent = (props) => {
    const accessToken = props.accessToken;
    const [loading,setLoading] = useState(false);
    const [rowElements, setRowElements] = useState([]);
    const [click,setClick] = useState(false);
     const form = useForm({
      initialValues: {
        folderName: '',
        scheduling_type: "Backup Now",
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
        res['folder_name']=data['folderName']
        res['scheduling_type'] = data['scheduling_type'];
        res['access_token'] = accessToken;
        const url = `${api_server}/addfolder`
        try{
            await axios.post(url, res);
            alert("Folder Backup Successful")
        }
        catch(error){
            alert(error)
        }
        setLoading(false)
    }
        form.reset();
    }
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
     const handleDeleteButton = async (folder_name,accessToken) => {
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

   
     useEffect(()=>{
        
        const elements = async () => {
          const url = `${api_server}/getfolderlist`;
          try {
            const res = {};
            res['access_token'] = accessToken;
            const response = await axios.post(url, res);
            return response.data.data;
          } catch (error) {
            console.log(error);
          }
        };
        const fetchData = async () => {
            try{
          const elems = await elements();
          console.log(elems);
          const rws = elems.map((element) => (
            <tr key={element[0]}>
              <td>{element[2]}</td>
              <td>{element[3]}</td>
              <td>{element[4]}</td>
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
                  onClick={() => handleDeleteButton(element[2], accessToken)}
                >
                  {' '}
                </Button>
              </td>
            </tr>
          ));
          setRowElements(rws);
          }
          catch(error){
            console.log(error);
          }
        };
        fetchData();

    },[accessToken,loading,click]);
    return ( <> <Grid>
          <Grid.Col span={9}>
            <Title order={3} align="center">
              {/* {'Add '} */}
              <Text span c="blue" inherit>
                {'Scheduled Backup List'}
              </Text>
              {/* {'that you want to '} */}
              {/* <Text span c="blue" inherit>
              Backup
            </Text> */}
            </Title>
            <Space h="md" />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Folder Name</th>
                  <th>Scheduling Type</th>
                  <th>Backup Time</th>
                  <th>Download</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{rowElements}</tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span="auto">
            <img src={iim} alt="logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            <Space h="xl" />
            <Title order={3}>
              {'Add '}
              <Text span c="blue" inherit>
                {'folder '}
              </Text>
              {'that you want to '}
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
                  {...form.getInputProps('folderName')}
                />
                <Space h="md" />
                <Input
                  component="select"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                  label="Choose Backup Type"
                  {...form.getInputProps('scheduling_type')}
                >
                  <option value="Backup Now">Backup Now</option>
                  <option value="Backup after 1 hour">Backup after 1 hour</option>
                  <option value="Backup whenever folder get avaiable">Backup whenever folder get avaiable</option>
                  <option value="Schedule Custom Backup">Schedule Custom Backup</option>
                </Input>

                <Checkbox
                  mt="md"
                  label="I agree to term and conditions"
                  {...form.getInputProps('termsOfService', { type: 'checkbox' })}
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Loader size="md" />
              <Space h="md" />
              <Title order={3}> Backuping folder Now</Title>
            </div>
          </Overlay>
        )}
        </>
        )
}

export default MainAppContent