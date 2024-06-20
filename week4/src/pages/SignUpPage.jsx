import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BtnComponent from '../Components/BtnComponent';


function SignUpPage() {
    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userName, setUserName] = useState("");
    const [userNum, setUserNum] = useState("");

    let [inputNum, setInputNum] = useState("")

    const pwdComment = "비밀번호 형식은 숫자, 영어 알파벳, 특수문자가 \n포함된 8자 이상이어야 합니다.";

    const navigate = useNavigate();

    const postSignUpData = async() => {
        try {
            const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/member/join`,
            {
                authenticationId: userId,
                password: userPwd,
                nickname: userName,
                phone: userNum,
            }
            );
            navigate('/')
            alert(response.data.message);
            return response.data;
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
    }

    return (
        <SignUpWrapper>
            <SignUpContainer>
                <SignUpTitle>회원가입 페이지</SignUpTitle>
                <InputSection>
                    ID
                    <IDInput
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)} />
                </InputSection>
                <InputSection>
                    PW
                    <PWInput
                    type="text"
                    value={userPwd}
                    onChange={(e) => setUserPwd(e.target.value)} />
                </InputSection>
                {pwdComment}
                <InputSection>
                    닉네임
                    <NameInput
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                </InputSection>
                <InputSection>
                    전화번호
                    <NumInput
                    type="text"
                    value={userNum}
                    onChange={(e) => setUserNum(e.target.value)} />
                </InputSection>
                전화번호 형식은 010-0000-0000입니다.
                <BtnSection>
                    <BtnComponent 
                        type="button" 
                        buttonTitle = {"회원가입"}
                        onClickFunc={postSignUpData} />
                    <BtnComponent 
                    type="button" 
                    buttonTitle = {"로그인 페이지"}
                    onClickFunc={() =>  navigate('/')} />
                </BtnSection>
                
            </SignUpContainer>
        </SignUpWrapper>
    )
}

export default SignUpPage

const SignUpWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60rem;

    background-color: ${({ theme }) => theme.colors.BgColor};
`
const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 35rem;
    height: 50rem;

    background-color: ${({ theme }) => theme.colors.LightBlue1};

    white-space: pre-line;
`

const SignUpTitle = styled.div`
    display: flex;

    margin: 5rem;

    font-size: 2.5rem;
`

const InputSection = styled.section`
`

const IDInput = styled.input`
    margin: 2rem;
`

const PWInput = styled.input`
    margin: 2rem;
    margin-bottom: 0.5rem;
`
const NameInput = styled.input`
    margin: 2rem;
`

const NumInput = styled.input`
    margin: 2rem;
    margin-bottom: 0.5rem;
`

const BtnSection = styled.section`
    display: flex;
    float: left;
`