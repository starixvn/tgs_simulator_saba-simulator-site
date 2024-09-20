import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  link: string;
};

export default function CardNavigation({ title, description, link }: Props) {
  return (
    <Card
      data-resizable
      sx={{
        textAlign: "center",
        alignItems: "center",
        width: 343,
        margin: 3,
        overflow: "auto",
        resize: "horizontal",
        "--icon-size": "100px",
      }}
    >
      <CardOverflow
        variant="solid"
        color="warning"
        style={{ background: "#302f59" }}
      >
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: "auto",
            transform: "translateY(50%)",
            borderRadius: "50%",
            width: "var(--icon-size)",
            boxShadow: "sm",
            bgcolor: "background.surface",
            position: "relative",
          }}
        >
          <div>
            <BakeryDiningIcon
              color="warning"
              sx={{ fontSize: "4rem" }}
              style={{ color: "#302f59" }}
            />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
        {title}
      </Typography>
      <CardContent sx={{ maxWidth: "40ch" }}>{description}</CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          "--Button-radius": "40px",
          width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
        }}
      >
        <Link to={link} style={{ color: "inherit", textDecoration: "none" }}>
          <Button variant="solid" style={{ background: "#302f59" }}>
            Send API
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
