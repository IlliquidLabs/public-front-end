import React from "react";
import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "../../../components/StyledNoticeIcon";

const ResumedLPsNotice: React.FC = () => (
  <>
    <Notice>
      <StyledNoticeIcon role="img">💧</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span></span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            size="sm"
            text="Add Liquidity"
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

export default ResumedLPsNotice;
