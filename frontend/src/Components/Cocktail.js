import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';


//This is a MUI component
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cocktail(props) {
    const [expanded, setExpanded] = React.useState(false);
    const drink = props.drink;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardHeader
        title={drink.strDrink}
        subheader={drink.strAlcoholic}
      />
      <CardMedia
        component="img"
        height="194"
        image={drink.strDrinkThumb}
        alt="Drink"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {drink.strInstructions}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingrediens:</Typography>
            <Table>
              <TableBody>
            {Object.entries(drink)
                .filter(x => x[0].startsWith('strIngredient') && (x[1] !== null && x[1] !== ""))
                    .map((ingredient, i) => {
                        return(
                           <TableRow key={i}>
                              <TableCell>{ingredient[1]}</TableCell>
                              <TableCell>{drink['strMeasure'+(i+1)]}</TableCell>
                           </TableRow> 
                        )
                     })
                  }
            </TableBody>
          </Table>   
        </CardContent>
      </Collapse>
    </Card>
  );
}