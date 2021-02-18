// import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';

const useStyles = makeStyles({
	root: {
		maxWidth: 350,
	},
	media: {
		height: 168,
		backgroundSize: 'contain',
	},
	actionArea: {
		height: '100%',
		verticalAlign: 'top',
		display: 'contents'
	}
});

function LaunchButton(props) {
	const { title, onClick, icon, body } = props;
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, 'rounded mx-16 mb-56')}>
			<CardActionArea className={clsx(classes.actionArea)} onClick={onClick}>
				<CardMedia
					className={classes.media}
					image={icon}
					title="Contemplative Reptile"
				/>
				<CardContent>
					{body()}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default React.memo(LaunchButton);
