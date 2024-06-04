import { CometChatContext, CometChatContextProvider } from "./CometChatContext";

import {
  BaseStyle,
  BaseStyleInterface,
  BorderStyle,
  BorderStyleInterface,
  FontStyle,
  FontStyleInterface,
  ShadowStyle,
  ShadowStyleInterface,
  ImageType,
  CometChatContextType,
  CometChatTabAlignment,
  ConversationType,
  DatePattern,
  MessageReceipt
} from './base';

import { ChatConfigurator, DataSource, MessageDataSource, DataSourceDecorator, ExtensionsDataSource } from './framework';
import {
  CometChatOptions,
  CometChatMessageOption,
  CometChatMessageTemplate,
  CometChatDetailsTemplate,
  CometChatDetailsOption,
  CometChatCallLogDetailsTemplate,
  CometChatCallLogDetailsOption,
  APIAction,
  ActionEntity,
  BaseInputElement,
  BaseInteractiveElement,
  ButtonElement,
  CardMessage,
  CheckboxElement,
  CustomAction,
  CustomInteractiveMessage,
  DropdownElement,
  ElementEntity,
  FormMessage,
  SchedulerMessage,
  LabelElement,
  OptionElement,
  RadioButtonElement,
  SingleSelectElement,
  TextInputElement,
  URLNavigationAction
} from './modals';
import { CometChatLocalize, localize } from './resources/CometChatLocalize';
import { CometChatTheme, Palette, Typography } from './resources/CometChatTheme';
import { CometChatConversationEvents, CometChatGroupsEvents, CometChatUIEvents, MessageEvents, CometChatUIEventHandler } from "./events";
import {
  CometChatConversationUtils,
  getDefaultDetailsTemplate,
  CometChatLiveReactions,
  CometChatMessagePreview,
  MessagePreviewConfiguration,
  MessagePreviewStyle,
  CometChatSoundManager,
} from './utils';

import {
  CometChatListItem,
  CometChatListItemInterface,
  ListItemStyle,
  CometChatAvatar,
  CometChatBadge,
  CometChatStatusIndicator,
  CometChatReceipt,
  CometChatDate,
  AvatarConfiguration,
  BadgeConfiguration,
  BadgeStyle,
  DateConfiguration,
  ReceiptConfiguration,
  StatusIndicatorConfiguration,
  StatusIndicatorStyle,
  DateStyle,
  AvatarStyle,
  CometChatMessageInput,
  AudioBubbleStyle,
  AudioBubbleStyleInterface,
  CometChatAudioBubble,
  CometChatAudioBubbleInterface,
  CometChatFileBubble,
  CometChatFileBubbleInterface,
  FileBubbleStyle,
  FileBubbleStyleInterface,
  CometChatVideoBubble,
  CometChatVideoBubbleInterface,
  VideoBubbleStyle,
  VideoBubbleStyleInterface,
  CometChatTextBubble,
  CometChatTextBubbleInterface,
  TextBubbleStyle,
  TextBubbleStyleInterface,
  CometChatImageBubble,
  CometChatImageBubbleInterface,
  ImageBubbleStyle,
  ImageBubbleStyleInterface,
  //
  CometChatActionSheet,
  ActionSheetStyles,
  ActionItem,
  CometChatBottomSheet,
  CometChatConfirmDialog,
  ListItemStyleInterface,
  CometChatList,
  CometChatListProps,
  CometChatListActionsInterface,
  CometChatListStylesInterface,
  CometChatMediaRecorder,
  CometChatMediaRecorderInterface,
  MediaRecorderStyleInterface,
  MediaRecorderStyle,
  AvatarStyleInterface,
  ListItemConfiguration,
  CometChatConfirmDialogInterface,
  CometChatConfirmDialogStyleInterface,
  ActionItemInterface,
  ActionSheetStylesInterface,
  AvatarConfigurationInterface,
  BadgeConfigurationInterface,
  BadgeStyleInterface,
  CometChatBottomSheetInterface,
  CometChatDateInterface,
  CometChatMessageInputInterface,
  CometChatMessageInputStyleInterface,
  CometChatReceiptInterface,
  CometChatStatusIndicatorInterface,
  DateConfigurationInterface,
  DateStyleInterface,
  ReceiptConfigurationInterface,
  StatusIndicatorConfigurationInterface,
  StatusIndicatorStyleInterface,
  CometChatFormBubble,
  CometChatFormBubbleInterface,
  CometChatCardBubble,
  CometChatCardBubbleInterface,

  CometChatReactions,
  CometChatReactionsInterface,
  ReactionsConfiguration,
  ReactionsConfigurationInterface,
  ReactionsStyle,
  ReactionsStyleInterface,
  CometChatReactionList,
  CometChatReactionListInterface,
  ReactionListConfiguration,
  ReactionListConfigurationInterface,
  ReactionListStyle,
  ReactionListStyleInterface,
  CometChatQuickReactions,
  CometChatQuickReactionsInterface,
  QuickReactionsConfiguration,
  QuickReactionsConfigurationInterface,
  QuickReactionsStyle,
  QuickReactionsStyleInterface,

  CometChatEmojiKeyboard,
  EmojiKeyboardConfiguration,
  EmojiKeyboardStyle,

  CometChatSchedulerBubble,
  CometChatSchedulerBubbleInterface,

  CometChatSuggestionList,
  CometChatSuggestionListInterface,
  SuggestionItem,
  SuggestionListConfiguration,
  SuggestionListConfigurationInterface
} from './views';

import {
  CometChatMentionsFormatter,
  CometChatTextFormatter,
  CometChatUrlsFormatter,
  MentionTextStyle
} from './formatters';

import {
  CometChatUIKit,
  CometChatUIKitHelper,
  UIKitSettings,
} from "./CometChatUiKit";

import {
  CometChatMessageComposerActionInterface,
} from "./helper/types";

import * as CometChatUiKitConstants from './constants/UIKitConstants';

import { messageStatus } from './utils/CometChatMessageHelper/index'

export {
  CometChatContextProvider,
  CometChatUIEventHandler,
  CometChatUiKitConstants,
  messageStatus,
  CometChatConversationEvents,
  CometChatGroupsEvents,
  CometChatUIEvents,
  MessageEvents,
  CometChatTheme,
  Palette,
  Typography,
  ActionItemInterface,
  ActionSheetStylesInterface,
  AvatarConfigurationInterface,
  BadgeConfigurationInterface,
  BadgeStyleInterface,
  CometChatBottomSheetInterface,
  CometChatDateInterface,
  CometChatMessageInputInterface,
  CometChatMessageInputStyleInterface,
  CometChatReceiptInterface,
  CometChatStatusIndicatorInterface,
  DateConfigurationInterface,
  DateStyleInterface,
  ReceiptConfigurationInterface,
  StatusIndicatorConfigurationInterface,
  StatusIndicatorStyleInterface,
  DataSourceDecorator,
  ExtensionsDataSource,
  CometChatContextType,
  CometChatTabAlignment,
  ConversationType,
  DatePattern,
  MessageReceipt,
  CometChatUIKit,
  CometChatUIKitHelper,
  UIKitSettings,
  CometChatConfirmDialogInterface,
  CometChatConfirmDialogStyleInterface,
  CometChatContext,
  ListItemConfiguration,
  BaseStyle,
  BaseStyleInterface,
  BorderStyle,
  BorderStyleInterface,
  FontStyle,
  FontStyleInterface,
  ShadowStyle,
  ShadowStyleInterface,
  ImageType,
  CometChatMessageComposerActionInterface,
  //
  ChatConfigurator,
  DataSource,
  MessageDataSource,
  //
  CometChatOptions,
  CometChatMessageOption,
  CometChatMessageTemplate,
  CometChatDetailsTemplate,
  CometChatDetailsOption,
  CometChatCallLogDetailsTemplate,
  CometChatCallLogDetailsOption,
  //
  CometChatLocalize,
  localize,
  //
  CometChatConversationUtils,
  getDefaultDetailsTemplate,
  CometChatLiveReactions,
  //
  CometChatListItem,
  CometChatListItemInterface,
  ListItemStyleInterface,
  ListItemStyle,
  CometChatAvatar,
  CometChatBadge,
  CometChatStatusIndicator,
  CometChatReceipt,
  CometChatDate,
  AvatarConfiguration,
  BadgeConfiguration,
  BadgeStyle,
  DateConfiguration,
  ReceiptConfiguration,
  StatusIndicatorConfiguration,
  StatusIndicatorStyle,
  DateStyle,
  AvatarStyle,
  CometChatMessageInput,
  AudioBubbleStyle,
  AudioBubbleStyleInterface,
  CometChatAudioBubble,
  CometChatAudioBubbleInterface,
  CometChatFileBubble,
  CometChatFileBubbleInterface,
  FileBubbleStyle,
  FileBubbleStyleInterface,
  CometChatVideoBubble,
  CometChatVideoBubbleInterface,
  VideoBubbleStyle,
  VideoBubbleStyleInterface,
  CometChatTextBubble,
  CometChatTextBubbleInterface,
  TextBubbleStyle,
  TextBubbleStyleInterface,
  CometChatImageBubble,
  CometChatImageBubbleInterface,
  ImageBubbleStyle,
  ImageBubbleStyleInterface,
  AvatarStyleInterface,
  //
  CometChatActionSheet,
  ActionSheetStyles,
  ActionItem,
  CometChatBottomSheet,
  CometChatConfirmDialog,
  CometChatMessagePreview,
  MessagePreviewConfiguration,
  MessagePreviewStyle,
  CometChatSoundManager,
  //
  CometChatList,
  CometChatListProps,
  CometChatListActionsInterface,
  CometChatListStylesInterface,
  CometChatMediaRecorder,
  CometChatMediaRecorderInterface,
  MediaRecorderStyleInterface,
  MediaRecorderStyle,
  CometChatFormBubble,
  CometChatFormBubbleInterface,
  CometChatCardBubble,
  CometChatCardBubbleInterface,
  CometChatSchedulerBubble, 
  CometChatSchedulerBubbleInterface, 
  APIAction,
  ActionEntity,
  BaseInputElement,
  BaseInteractiveElement,
  ButtonElement,
  CardMessage,
  CheckboxElement,
  CustomAction,
  CustomInteractiveMessage,
  DropdownElement,
  ElementEntity,
  FormMessage,
  SchedulerMessage,
  LabelElement,
  OptionElement,
  RadioButtonElement,
  SingleSelectElement,
  TextInputElement,
  URLNavigationAction,

  CometChatReactions,
  CometChatReactionsInterface,
  ReactionsConfiguration,
  ReactionsConfigurationInterface,
  ReactionsStyle,
  ReactionsStyleInterface,
  CometChatReactionList,
  CometChatReactionListInterface,
  ReactionListConfiguration,
  ReactionListConfigurationInterface,
  ReactionListStyle,
  ReactionListStyleInterface,
  CometChatQuickReactions,
  CometChatQuickReactionsInterface,
  QuickReactionsConfiguration,
  QuickReactionsConfigurationInterface,
  QuickReactionsStyle,
  QuickReactionsStyleInterface,

  CometChatEmojiKeyboard,
  EmojiKeyboardConfiguration,
  EmojiKeyboardStyle,

  CometChatMentionsFormatter,
  CometChatTextFormatter,
  CometChatUrlsFormatter,
  MentionTextStyle,
  CometChatSuggestionList,
  CometChatSuggestionListInterface,
  SuggestionItem,
  SuggestionListConfiguration,
  SuggestionListConfigurationInterface
};
