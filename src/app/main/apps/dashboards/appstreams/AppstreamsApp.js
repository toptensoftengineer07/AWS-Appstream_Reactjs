import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import LaunchButton from './widgets/LaunchButton';
import AppstreamsEmbed from './widgets/AppstreamsEmbed';
import AWS from 'aws-sdk';
import AppStream from 'aws-sdk/clients/appstream';
import obsIcon from '../../../../../assets/images/obs.png';
import vmixIcon from '../../../../../assets/images/vmix.png';
import vset3DIcon from '../../../../../assets/images/vset3d.png';

function AppstreamsApp() {
	const [streamingUrl, setStreamingUrl] = useState('');
	const [appstreamsVisible, setAppstreamsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	AWS.config = new AWS.Config();
	AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
	AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
	AWS.config.region = process.env.REACT_APP_REGION;
	let appstream = new AppStream();

	const handleLaunchObs = () => {
		setIsLoading(true);
		appstream.createStreamingURL({
			FleetName: 'vmixsat1-fleet',
			StackName: 'vmixsat1-stack',
			UserId: 'igors',
			ApplicationId: 'OBS',
			Validity: 1800
		}, (err, data) => {
			if (!err) {
				window.open(data.StreamingURL, '_blank');
				// setStreamingUrl(data.StreamingURL);
				// setAppstreamsVisible(true);
			}
			setIsLoading(false);
		})
	}

	const handleLaunchvMix = () => {
		setIsLoading(true);
		appstream.createStreamingURL({
			FleetName: 'vmixsat1-fleet',
			StackName: 'vmixsat1-stack',
			UserId: 'igors',
			ApplicationId: 'vMix64',
			Validity: 1800
		}, (err, data) => {
			if (!err) {
				window.open(data.StreamingURL, '_blank');
				// setStreamingUrl(data.StreamingURL);
				// setAppstreamsVisible(true);
			}
			setIsLoading(false);
		})
	}

	const handleLaunchVset3D = () => {
		setIsLoading(true);
		appstream.createStreamingURL({
			FleetName: 'vmixsat1-fleet',
			StackName: 'vmixsat1-stack',
			UserId: 'igors',
			ApplicationId: 'Vset3D',
			Validity: 1800
		}, (err, data) => {
			if (!err) {
				window.open(data.StreamingURL, '_blank');
				// setStreamingUrl(data.StreamingURL);
				// setAppstreamsVisible(true);
			}
			setIsLoading(false);
		})
	}

	const handleClose = () => {
		setAppstreamsVisible(false);
		setStreamingUrl('');
	}

	return (
		(!appstreamsVisible || !streamingUrl) ? <div className="w-full">
			<div className="flex flex-col md:flex-row sm:p-8 container">
				<div className="flex flex-1 flex-col min-w-0">
					<FuseAnimate delay={600}>
						<Typography className="p-16 pb-8 text-18 font-300 text-center">
							Please choose the AppStreams.
						</Typography>
					</FuseAnimate>

					<FuseAnimateGroup
						className="flex flex-wrap w-full justify-center py-32 px-16"
						enter={{
							animation: 'transition.slideUpBigIn',
							duration: 300
						}}
					>
						<div className="w-224 h-224 p-16">
							<LaunchButton title="Launch OBS Studio" onClick={handleLaunchObs} icon={obsIcon} />
						</div>
						<div className="w-224 h-224 p-16">
							<LaunchButton title="Launch vMix" onClick={handleLaunchvMix} icon={vmixIcon} />
						</div>
						<div className="w-224 h-224 p-16">
							<LaunchButton title="Launch Vset3D" onClick={handleLaunchVset3D} icon={vset3DIcon} />
						</div>
					</FuseAnimateGroup>
				</div>
			</div>

			{isLoading && <FuseLoading />}
		</div>
		: <AppstreamsEmbed streamingUrl={streamingUrl} onClose={handleClose} />
	);
}

export default AppstreamsApp;
