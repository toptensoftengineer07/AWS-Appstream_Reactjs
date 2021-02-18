import FuseAnimate from '@fuse/core/FuseAnimate';
import LinearProgress from '@material-ui/core/LinearProgress';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LaunchButton from './widgets/LaunchButton';
import HomeButton from './widgets/HomeButton';
import Card from '@material-ui/core/Card';
import { submitLoginWithGuacamole } from 'app/auth/store/loginSlice';
import { getConnections } from './store/cloudApplicationsSlice';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import config from 'app/services/guacamoleAPI/guacamoleAPIConfig'

function CloudApplications() {
	const [streamingUrl, setStreamingUrl] = useState('');
	const [appstreamsVisible, setAppstreamsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const authStore = useSelector(({ cloudApplications }) => cloudApplications.login);
	const connectionsStore = useSelector(({ cloudApplications }) => cloudApplications.cloudApplications);

	const vMixBody = () => {
		return <Typography className="text-15 font-700 leading-6" variant="body2" color="textSecondary" component="p">
			vMix is software that allows you to create professional quality productions on your own computer at a fraction of the cost. vMix gives you the power to add multiple cameras, videos, images, audio, web streams, Powerpoint, titles, virtual sets, chroma key, and much more to your production. You are then able to display, record and live stream your production all at the same time!
		</Typography>;
	}
	const obsBody = () => {
		return <Typography className="text-15 font-700 leading-6" variant="body2" color="textSecondary" component="p">
			High performance real time video/audio capturing and mixing. Create scenes made up of multiple sources including window captures, images, text, browser windows, webcams, capture cards and more. Set up an unlimited number of scenes you can switch between seamlessly via custom transitions.
		</Typography>;
	}
	const unrealBody = () => {
		return <Typography className="text-15 font-700 leading-6" variant="body2" color="textSecondary" component="p">
			Unreal Engine is the world’s most open and advanced real-time 3D creation tool. Continuously evolving to serve not only its original purpose as a state-of-the-art game engine, today it gives creators across industries the freedom and control to deliver cutting-edge content, interactive experiences, and immersive virtual worlds.
		</Typography>;
	}
	const realityBody = () => {
		return <>
			<Typography className="text-15 font-700 leading-6" variant="body2" color="textSecondary" component="p">
				<strong>Reality Engine<sup>®</sup></strong>&nbsp;from Zero Density is the ultimate<strong>&nbsp;real-time broadcast compositing system</strong>&nbsp;enabling&nbsp;<strong>real-time visual effects</strong>&nbsp;pipelines featuring video I/O, keying, compositing and rendering in one single machine.&nbsp; As the most&nbsp;<strong>photo-realistic real-time production</strong>&nbsp;solution,&nbsp;<b>Reality Engine<sup>®</sup></b>&nbsp;provides its client the tools to create the most&nbsp;<strong>immersive content</strong>&nbsp;possible and revolutionize story-telling in broadcasting, media and cinema industry.
			</Typography>
			<Typography className="text-15 font-700 leading-6 text-black" variant="body2" component="p">
				Reality Engine® uses NVidia Quadro GPUDirect technology for high performance video I/O in order to streamline real-time 4K UltraHD workflows.
			</Typography>
		</>
	}
	const vset3DBody = () => {
		return <Typography className="text-15 font-700 leading-6 text-black" variant="body2" component="p">
			Vset3D is a virtual set software, fully compatible with Vmix and OBS Studio. With no rendering time necessary, you can produce your own videos in real-time, using live footage and pre-recorded green screen videos. You may also insert still images as well as videos and 3D objects into the Vset3D. Vset3D offers a true virtual environment where you can create a large number of lighting effects using the same set.
		</Typography>;
	}
	const blenderBody = () => {
		return <Typography className="text-15 font-700 leading-6" variant="body2" color="textSecondary" component="p">
			Blender is the free and open source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing and motion tracking, video editing and 2D animation pipeline.
		</Typography>;
	}

	useEffect(() => {
		dispatch(submitLoginWithGuacamole({
			username: 'test1',
			password: 'test1',
			remember: false
		}))
	}, [dispatch])

	useEffect(() => {
		if (authStore && authStore.authToken) {
			dispatch(getConnections({
				token: authStore.authToken
			}))
		}
	}, [authStore])

	useEffect(() => {
		if (Object.keys(connectionsStore.connections).length > 0) {
			setIsLoading(false);
		}
	}, [connectionsStore])

	const handleGotoHome = () => {
		window.open(window.origin, '_self');
	}

	const handleLaunchOBS = () => {
		if (connectionsStore.connections['OBS']) {
			const connection = connectionsStore.connections['OBS'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleLaunchvMix = () => {
		if (connectionsStore.connections['vMix']) {
			const connection = connectionsStore.connections['vMix'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleLaunchVset3D = () => {
		if (connectionsStore.connections['Vset3D']) {
			const connection = connectionsStore.connections['Vset3D'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleLaunchBlender = () => {
		if (connectionsStore.connections['Blender']) {
			const connection = connectionsStore.connections['Blender'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleLaunchUnreal = () => {
		if (connectionsStore.connections['Unreal Engine']) {
			const connection = connectionsStore.connections['Unreal Engine'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleLaunchReality = () => {
		if (connectionsStore.connections['Reality Engine']) {
			const connection = connectionsStore.connections['Reality Engine'];
			let value = connection.identifier + '\0c\0' + authStore.dataSource;
			window.open(config.guacEndpoint + '/' + btoa(value), '_blank');
		}
	}

	const handleClose = () => {
		setAppstreamsVisible(false);
		setStreamingUrl('');
	}

	return (
		<div className="w-full">
			{!isLoading ? <div className="flex flex-col md:flex-row sm:p-8 container">
				<div className="flex flex-1 flex-col min-w-0">
					<FuseAnimate delay={600}>
						<Typography className="p-16 pb-8 text-18 font-300 text-center">
							Please choose the LSP cloud applications.
						</Typography>
					</FuseAnimate>

					<FuseAnimateGroup
						className="flex flex-wrap w-full justify-center py-32 px-16"
						enter={{
							animation: 'transition.slideUpBigIn',
							duration: 300
						}}
					>
						<LaunchButton title="Launch vMix" onClick={handleLaunchvMix} icon={'/appstreams/assets/images/vmix.png'} body={vMixBody} />
						<LaunchButton title="Launch OBS" onClick={handleLaunchOBS} icon={'/appstreams/assets/images/obs.jpg'} body={obsBody} />
						<LaunchButton title="Launch Unreal Engine" onClick={handleLaunchUnreal} icon={'/appstreams/assets/images/unreal-engine.png'} body={unrealBody} />
						<LaunchButton title="Launch Reality Engine" onClick={handleLaunchReality} icon={'/appstreams/assets/images/reality-engine.png'} body={realityBody} />
						<LaunchButton title="Launch Vset3D" onClick={handleLaunchVset3D} icon={'/appstreams/assets/images/vset3d.png'} body={vset3DBody} />
						<LaunchButton title="Launch blender" onClick={handleLaunchBlender} icon={'/appstreams/assets/images/blender.png'} body={blenderBody} />
					</FuseAnimateGroup>
				</div>
			</div>
			: <div className="flex flex-1 flex-col h-screen items-center justify-center p-12">
				<Typography className="text-20 mb-16" color="textSecondary">
					Loading...
				</Typography>
				<LinearProgress className="w-xs max-w-full" color="secondary" />
			</div>}
		</div>
	);
}

export default withReducer('cloudApplications', reducer)(CloudApplications);
