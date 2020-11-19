import React, {useState} from "react";
import styled from "styled-components";
import {Colors} from "../utils/Constants";
import axios from "axios";

export const Feedback = () => {
    let [showFeedback, setShowFeedback] = useState(true);
    let [feedback, setFeedback] = useState("");
    let [showFeedbackResponse, setShowFeedbackResponse] = useState(false);

    return  <div>
        <FeedbackContainer>

            {showFeedbackResponse &&
            <div> You response is saved. Thanks for your feedback!</div>}


            {showFeedback ? <FeedbackContainerInner>
                <FeedbackLabel>Looking for some feature? Got any feedback or suggestions?</FeedbackLabel>

                <FeedbackInput type={"text"} onChange={(event) => setFeedback(event.target.value)} value={feedback}/>
                <FeedbackButton onClick={() => {
                    setShowFeedbackResponse(true)
                    setShowFeedback(false);

                    axios.get(`https://script.google.com/macros/s/AKfycbzBEPbcwDNP7aNGesUtjrusfcuEZRD3kvvdBCfYwVA0Ms7v8ks/exec?feedback=${feedback}`)
                }}>
                    Send Feedback
                </FeedbackButton>
            </FeedbackContainerInner> : <div/>}
        </FeedbackContainer>
    </div> ;
}


const FeedbackContainer = styled.div`
  color: ${Colors.darkGray};
  //justify-content: left;
  font-size: 0.8rem;
  padding: 10px;
  display: flex;
  background-color: ${Colors.gray};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  ;
`;

const FeedbackLabel = styled.div`
  font-size: 1rem;
  color: ${Colors.darkerGray};
`;

const FeedbackContainerInner = styled.div`
  display: flex;
  align-items: flex-end;
  flex-flow: column;
  justify-content: right;
`;
const FeedbackButton = styled.div`
  border: 1px solid ${Colors.darkGray};
  border-radius: 0;
  padding: 5px;
  width: fit-content;
  background: transparent;
  cursor:pointer;
  transition: background-color 0.3s ease-out;
  clear: both;
  &:hover {
    background-color: ${Colors.darkGray};
    color: ${Colors.white};
  }
    `;

const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.25);
`;

const FeedbackInput = styled.textarea`

  width: 100%;
  height: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
