import React from "react";
import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "../../../components/StyledNoticeIcon";

const PausedLPsNotice: React.FC = () => (
  <>
    <Notice>
      <StyledNoticeIcon>💧</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>LP rewards are paused for now, remove your liquidity.</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            size="sm"
            text="Remove Liquidity"
            href=""
            variant="secondary"
          />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
    <Spacer />
  </>
);

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default PausedLPsNotice;
