import Card from '@material-ui/core/Card';
// import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function LaunchButton(props) {
	const { title, onClick, icon } = props;

	return (
		<Card className='flex flex-col items-center justify-center w-full h-full rounded py-24' role="button" onClick={onClick}>
			<img src={icon} className="w-80 h-80" alt="icon" />
			<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
				{title}
			</Typography>
		</Card>
	);
}

export default React.memo(LaunchButton);
