import { Card, Text, Group } from "@mantine/core";
import './homepage.css'

const Card1 = (props) => {
    return (
      <div className="homepage-card">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <img
              src={props.imagecontent}
              alt="nan"
              style={{width:'200px',
              margin:"40px"
            }}
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{props.titlecontent}</Text>
          </Group>

          <Text size="sm" color="dimmed">
            {props.maincontent}
          </Text>
        </Card>
      </div>
    );
}

export default Card1;
