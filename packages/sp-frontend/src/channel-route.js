
import React, { Component } from "react";
import SPChannel from "./sp-channel";
import SPCamera from "./sp-camera";
import styled from "styled-components";
import {subscribe} from "./sp-binding";

const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  position: relative;
`;

/**
 * Hacky. Yuck. But it gets the title of the channel up there on the title bar, so I'm fine with
 * it.
 */
const TitleBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  margin-top: -42px;
  font-size: 2em;
  font-weight: 200;
  margin-left: 0.3em;
`;

const ChannelName = styled.strong`
  font-weight: 600;
  font-size: 0.7em;
  position: relative;
  top: -3px;
`;

export class ChannelRoute extends Component {
  static propTypes = {
    channels: React.PropTypes.array,
  };

  constructor() {
    super();
    this.state = {};
  }

  render () {
    const channel = this.props.channels[0] || {};
    return (
      <FlexContainer>
        <TitleBar>
          📹 test <ChannelName>{channel.slug}</ChannelName>
        </TitleBar>
        <SPChannel width={1920} height={1080}>
          <SPCamera x={0} y={0} width={960} height={270} userId="8145ebde-cf2d-44e9-8462-92aac7fe0074"></SPCamera>
          <SPCamera x={960} y={0} width={960} height={1080} userId="8145ebde-cf2d-44e9-8462-92aac7fe0074"></SPCamera>
          <SPCamera x={0} y={270} width={960} height={810} userId="8145ebde-cf2d-44e9-8462-92aac7fe0074"></SPCamera>
        </SPChannel>
      </FlexContainer>
    );
  }
}

export default subscribe(ChannelRoute, function(props, SP) {
  return {
    channels: SP.channels.watch({slug: props.match.params.slug}),
  };
});
