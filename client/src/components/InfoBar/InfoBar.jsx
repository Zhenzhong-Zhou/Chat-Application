import "./infobar.css";
import online from "../../assets/icons/onlineIcon.png";
import close from "../../assets/icons/closeIcon.png";

const InfoBar = ({room}) => {
	return (
		<div className={"infoBar"}>
			<div className={"leftInnerContainer"}>
				<img className={"onlineIcon"} src={online} alt={"online image"}/>
				<h3>{room}</h3>
			</div>
			<div className={"rightInnerContainer"}>
				<a href={"/"}><img src={close} alt={"close image"}/></a>
			</div>
		</div>
	);
};

export default InfoBar;