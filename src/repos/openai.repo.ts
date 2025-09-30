const conversations = new Map<string, string>();

export const OpenAiRepo = {
  getLastResponseId: (conversationId: string) => {
    return conversations.get(conversationId);
  },
  setLastResponseId: (conversationId: string, responseId: string) => {
    conversations.set(conversationId, responseId);
  },
  deleteConversation: (conversationId: string) => {
    conversations.delete(conversationId);
  },
};
