import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../state/Restaurant/Action";

const EventCard = ({accessButton,event}) => {

  const dispatch = useDispatch();


  const handleDelete = (eventId) => {
    dispatch(deleteEvent({eventId,jwt:localStorage.getItem("jwt")}));
  }
  
  return (
    <div className="">
      <Card sx={{width:250}}>
        <CardMedia
          sx={{ height: 305 }}
          image={event?.imageUrl}
        />
        <CardContent>
            <Typography variant="h5">
                {event?.name}
            </Typography>
            <Typography variant="body2">
                {event?.restaurant.name}
            </Typography>
            <div className="py-1 space-y-1">
                <p>{event?.location}</p>
                <p className="text-sm text-green-500">{event?.startedAt}</p>
                <p className="text-sm text-orange-300">{event?.endsAt}</p>
            </div>
        </CardContent>
        {accessButton && 
            <CardActions>
                <IconButton onClick={()=>handleDelete(event._id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            </CardActions>
        }
      </Card>
    </div>
  );
};

export default EventCard;
