import {
  Grid,
  Button,
  Image,
  Stack,
  Space,
  Text,
  Flex,
  Title,
  Center,
  Card,
} from "@mantine/core";
import Card1 from "./Card1";
import Textt from "./Textt";
import iim from "./logo/png/logo-no-background.png";
import "./font.css";
import "./homepage.css";
import SmallCard from "./SmallCard";
import "./images.css";


const CrashCard = (props) => {
    return (
      <div style={{margin:'30px'}}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <img
              src={props.imagecontent}
              alt="nan"
              className="carsh-card-image"
            ></img>
            <text className="red-text">{props.titlecontent}</text>
            <text className="smaller-text">
              {props.maincontent}
            </text>
          </Stack>
        </Card>
      </div>
    );
}

export default CrashCard;