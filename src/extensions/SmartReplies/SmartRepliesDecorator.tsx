import { DataSource, DataSourceDecorator } from '../../shared/framework';
// @ts-ignore
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { ReceiverTypeConstants } from '../../shared/constants/UIKitConstants';
import { ViewAlignment } from '../../shared/constants/UIKitConstants';
import { ExtensionConstants } from '../ExtensionConstants';
import { getExtentionData } from '../ExtensionModerator';
// @ts-ignore
import React from 'react';
// @ts-ignore
import { CometChatUIEvents, MessageEvents } from '../../shared/events';
import { SmartRepliesView } from './SmartRepliesView';
import {
  getUnixTimestamp,
  getUnixTimestampInMilliseconds,
} from '../../shared/utils/CometChatMessageHelper';
import { CometChatUIEventHandler } from '../../shared/events/CometChatUIEventHandler/CometChatUIEventHandler';
import { CometChatUIKit } from '../../shared/CometChatUiKit/CometChatUIKit';
import { SmartRepliesConfigurationInterface } from './SmartRepliesExtension';
import { CommonUtils } from '../../shared/utils/CommonUtils';

export class SmartRepliesDecorator extends DataSourceDecorator {
  smartRepliesConfiguration?: SmartRepliesConfigurationInterface;

  loggedInUser!: CometChat.User | null;

  constructor(
    dataSource: DataSource,
    smartRepliesConfiguration?: SmartRepliesConfigurationInterface
  ) {
    super(dataSource);
    if (smartRepliesConfiguration != undefined) {
      this.smartRepliesConfiguration = smartRepliesConfiguration;
    }

    CometChat.getLoggedinUser()
      .then((u: any) => {
        this.loggedInUser = u;
      })
      .catch((err: any) => console.log(err));

    CometChatUIEventHandler.addMessageListener(
      MessageEvents.ccActiveChatChanged,
      {
        ccActiveChatChanged: ({message}: any) => {
          if(message && message['sender']?.['uid'] != this.loggedInUser?.getUid())
            this.getReplies(message);
        }
      }
    );
    CometChat.addMessageListener(
      Date.now()+"",
      {
        onTextMessageReceived: (textMessage: any) => {
          if(textMessage && textMessage['sender']?.['uid'] != this.loggedInUser?.getUid())
          this.getReplies(textMessage);
        },
      }
    );
  }

  isDeletedMessage(message: CometChat.BaseMessage): boolean {
    return message.getDeletedBy() != null;
  }

  getId(): string {
    return 'SmartReply';
  }

  getReplies(message: CometChat.BaseMessage) {

    let id = CommonUtils.getComponentIdFromMessage(message);
    const smartReplyData = getExtentionData(
      message,
      ExtensionConstants.smartReply
    );
    let options: any[] = [];
    if (
      smartReplyData &&
      Object.keys(smartReplyData).length &&
      !smartReplyData.hasOwnProperty('error')
    ) {
      options.push(smartReplyData['reply_positive']);
      options.push(smartReplyData['reply_neutral']);
      options.push(smartReplyData['reply_negative']);
    }
    CometChatUIEventHandler.emitUIEvent(CometChatUIEvents.showPanel, {
      alignment: ViewAlignment.messageListBottom,
      id: id,
      child: () => (
        <SmartRepliesView
          replies={options}
          onClose={this.onCloseRepliesPannel}
          onClick={(smartReply) => {
            this.handleSendMessage(message, smartReply);
          }}
          {...this.smartRepliesConfiguration}
        />
      ),
    });
  }

  handleSendMessage = (message: CometChat.BaseMessage, smartReply: any) => {
    let chatWithId = '';
    let id = CommonUtils.getComponentIdFromMessage(message)
    let chatWith;
    if (!smartReply.trim().length) {
      return;
    }
    if (typeof message !== 'object') return;
    if (message?.getReceiverType() === ReceiverTypeConstants.user) {
      chatWithId = message?.getSender()?.getUid();
      chatWith = ReceiverTypeConstants.user;
    } else {
      chatWithId = message?.getReceiverId();
      chatWith = ReceiverTypeConstants.group;
    }
    let textMessage = new CometChat.TextMessage(
      chatWithId,
      smartReply,
      chatWith
    );
    textMessage.setParentMessageId(message.getParentMessageId());
    this.loggedInUser && textMessage.setSender(this.loggedInUser);
    textMessage.setText(smartReply);
    textMessage.setSentAt(getUnixTimestamp());
    textMessage.setMuid(String(getUnixTimestampInMilliseconds()));

    CometChatUIKit.sendTextMessage(textMessage)
      .then(() => {})
      .catch(() => {})

      CometChatUIEventHandler.emitUIEvent(CometChatUIEvents.showPanel, {
        alignment: ViewAlignment.messageListBottom,
        id: id,
      });
  };

  onCloseRepliesPannel = () => {
    CometChatUIEventHandler.emitUIEvent(CometChatUIEvents.hidePanel, {
      alignment: ViewAlignment.messageListBottom,
    });
  };
}
