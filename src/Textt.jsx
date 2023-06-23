import { Text } from '@mantine/core';
import './font.css'
function Textt(props) {
  return (
    <Text
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 70 }}
      sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
      ta="center"
      fz="md"
      fw={700}
      className='homepage-bullet-font'
    >
      {props.content}
    </Text>
  );
}

export default Textt