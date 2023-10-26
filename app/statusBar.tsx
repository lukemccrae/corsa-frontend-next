import styled from "styled-components";

interface StatusBarProps {
  picture: string;
  first: string;
  last: string;
}

export const StatusBar = (props: StatusBarProps) => {
  const StatusBarContainer = styled.div`
    position: fixed;
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
        CORSA
      </h1>
      <div style={{ display: "flex" }}>
        <ProfilePicture src={props.picture} alt="Profile Picture" />
      </div>
    </StatusBarContainer>
  );
};

export default StatusBar;
