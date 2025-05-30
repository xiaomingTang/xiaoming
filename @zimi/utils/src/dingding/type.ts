export interface DingTextMessage {
  msgtype: 'text'
  text: {
    content: string
  }
}

export interface DingMarkdownMessage {
  msgtype: 'markdown'
  markdown: {
    /**
     * 消息会话列表中展示的标题，非消息体的标题。
     */
    title: string
    text: string
  }
}

export interface DingLinkMessage {
  msgtype: 'link'
  link: {
    /**
     * 链接消息标题。
     */
    title: string
    /**
     * 链接消息的内容。
     */
    text: string
    /**
     * 点击消息跳转的URL。
     */
    messageUrl: string
    /**
     * 链接消息内的图片地址，建议使用[上传媒体文件](https://open.dingtalk.com/document/orgapp/upload-media-files)接口获取。
     */
    picUrl?: string
  }
}

type DingActionButtons =
  | {
      /**
       * 单个按钮的方案。(设置此项和singleURL后btns无效。)
       * 消息内只有一个按钮时，该参数必填。
       */
      singleTitle: string
      /**
       * 点击singleTitle按钮触发的URL。
       * 消息内只有一个按钮时，该参数必填。
       */
      singleURL: string
    }
  | {
      btns: {
        /**
         * 按钮上显示的文本。
         */
        title: string
        /**
         * 按钮跳转的URL。
         */
        actionURL: string
      }[]
    }

export interface DingActionCardMessage {
  msgtype: 'actionCard'
  actionCard: {
    /**
     * 消息会话列表中展示的标题，非消息体的标题。
     */
    title: string
    /**
     * 正文内容，支持markdown语法
     */
    text: string
    /**
     * - 0: 按钮竖直排列
     * - 1: 按钮横向排列
     */
    btnOrientation?: '0' | '1'
  } & DingActionButtons
}

export interface DingFeedCardMessage {
  msgtype: 'feedCard'
  feedCard: {
    /**
     * feedCard消息的内容列表。
     */
    links: {
      /**
       * feedCard消息内每条内容的标题。
       */
      title: string
      /**
       * feedCard消息的链接地址。
       */
      messageURL: string
      /**
       * feedCard消息内的图片地址，建议使用[上传媒体文件](https://open.dingtalk.com/document/orgapp/upload-media-files)接口获取。
       */
      picURL?: string
    }[]
  }
}

export type DingMessage =
  | DingTextMessage
  | DingMarkdownMessage
  | DingLinkMessage
  | DingActionCardMessage
  | DingFeedCardMessage

export interface DingRes {
  errcode: number
  errmsg: string
}
