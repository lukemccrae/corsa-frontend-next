import styled from "styled-components";
const poweredByStrava = "/api_logo_pwrdBy_strava_horiz_light.svg";

interface StatusBarProps {
  profile: string;
}

export const StatusBar = (props: StatusBarProps) => {
  const StatusBarContainer = styled.div`
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 5px 50px;
    width: 100%;
  `;

  const ProfilePicture = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `;

  return (
    <StatusBarContainer>
      <h1
        style={{ fontWeight: "bold", fontSize: "24px", padding: "0 10px 0 0" }}
      >
        CORSAAAAAA
      </h1>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <ProfilePicture src={props.profile} alt="Profile Picture" />
        <img style={{ width: "100px" }} src={poweredByStrava} alt="My SVG" />
      </div>
    </StatusBarContainer>
  );
};

export default StatusBar;
