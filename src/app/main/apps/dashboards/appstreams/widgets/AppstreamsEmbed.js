import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(0),
		color: theme.palette.grey[500],
	},
}));

function AppstreamsEmbed(props) {
	const [appstreamEmbed, setAppstreamEmbed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { streamingUrl, onClose } = props;
	const classes = useStyles(props);

	let AppStream = window.AppStream;

	useEffect(() => {
		if (streamingUrl) {
			let userInterfaceConfig = {};
			userInterfaceConfig[AppStream.Embed.Options.HIDDEN_ELEMENTS] = [AppStream.Embed.Elements.CATALOG_BUTTON, AppStream.Embed.Elements.END_SESSION_BUTTON]
			let appstreamOptions = {
				sessionURL: streamingUrl,
				userInterfaceConfig: userInterfaceConfig
			};
			setIsLoading(true);
			let embed = new AppStream.Embed("appstream-container", appstreamOptions);
			embed.addEventListener(AppStream.Embed.Events.SESSION_STATE_CHANGE, updateSessionStateCallback);
			setAppstreamEmbed(embed);
		}
	}, [streamingUrl])

	const updateSessionStateCallback = (event) => {
		let status = event[AppStream.Embed.EventParams.STATUS];
		switch(AppStream.Embed.SessionStatus[status]) {
			case AppStream.Embed.SessionStatus.Unknown:
				break;
			case AppStream.Embed.SessionStatus.Started:
				setIsLoading(false);
				break;
			default:
				onClose();
				break;
		}
	}

	const handleClose = () => {
		onClose();
	}

	return (
		<div className="w-full">
			<IconButton className={clsx(classes.closeButton, 'z-99')} onClick={handleClose}>
				<CloseIcon />
			</IconButton>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div id="appstream-container" className="w-full h-screen m-auto">
				</div>
			</FuseAnimate>
		</div>
	);
}

export default React.memo(AppstreamsEmbed);
