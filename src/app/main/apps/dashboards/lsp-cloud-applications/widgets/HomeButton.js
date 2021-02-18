import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';

const useStyles = makeStyles({
	root: {
		maxWidth: 350,
		width: 350
	},
	media: {
		height: 192,
		backgroundSize: 'contain',
	}
});

function HomeButton(props) {
	const { title, onClick, icon } = props;
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, 'flex flex-col items-center justify-center rounded')}>
			<CardActionArea onClick={onClick}>
				<CardMedia
					className={classes.media}
					image={icon}
				/>
			</CardActionArea>
		</Card>
	);
}

export default React.memo(HomeButton);
