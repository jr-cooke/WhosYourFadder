import useSWR, { mutate } from "swr"
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Times New Roman";
    font-size: 24px;
  }
  body {
    background-color: #eeeeee;
    margin: 0;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const fetcher = (url) =>
  fetch(url, { headers: {'Accept': "application/json"} }).then((r) => r.json());

export default function App() {
  const { data, error } = useSWR("https://icanhazdadjoke.com/", fetcher);

  if (error) {
    return <></>
  }
  if (!data) {
    return <></>
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <JokeWrapper>
          <Joke>
            {data.joke}
          </Joke>
        </JokeWrapper>
        <Img src="/dad.png" alt="dad" />
        <Button onClick={() => mutate("https://icanhazdadjoke.com/")}>Hit Me!</Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  max-width: 800px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const JokeWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  justify-content: center;
  `;

const Joke = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid black;
`;

const Img = styled.img`
  display: flex;
  flex: 1;
  width: calc(100vw - 24px);
  max-width: 318px;
  max-height: 399px;
`;

const Button = styled.button`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 40px;
  font-family: 'Time New Roman';
  border: 1px solid black;
  background: transparent;
  border-radius: 10px;
  padding: 10px;
  outline: none;
`;