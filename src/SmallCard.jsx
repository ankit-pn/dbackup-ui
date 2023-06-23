
import {Grid, Button, Image, Stack, Space, Text, Flex, Title, Center, Card} from '@mantine/core';
import './font.css'
import './images.css'


const SmallCard = (props) => {
    return (
      <div className="homepage-card">
        <Card shadow="sm" radius="md" withBorder>
          <Flex direction="row">
            <img
              src={props.imagecontent}
              alt="text"
              className="smallcard-image"
              style={{width:'120px'}}
            />
            <Stack>
              <Title order={5}>{props.titlecontent}</Title>
              <Text className="smallcard-font-size" lineClamp={4} >
                {props.maincontent}
              </Text>
            </Stack>
          </Flex>
        </Card>
      </div>
    );
}

export default SmallCard