"use client";

import { ChatView, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";
import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ChatPreviewList } from "@pushprotocol/uiweb";
import Draggable from "react-draggable"; // Importing Draggable
import { CONSTANTS } from "@pushprotocol/restapi";

interface PushChatProps {
  selectedAddress: string; // Prop to receive selected address
}

function PushChat({ selectedAddress }: PushChatProps) {
  const { data: signer } = useWalletClient();
  const [showChat, setShowChat] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial position for the draggable icon
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 }); // Initial position for the draggable chat window
  const { address } = useAccount();

  const handleIconDrag = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y }); // Update icon position
  };

  const handleChatDrag = (e: any, data: any) => {
    setChatPosition({ x: data.x, y: data.y }); // Update chat position
  };

  const chatId = selectedAddress;

  return (
    <>
      <ChatUIProvider
        signer={signer}
        env={CONSTANTS.ENV.STAGING}
        theme={darkChatTheme}
      >
        <div
          style={{
            height: "700px",
            // Added background color for better visibility
          }}
        >
          <ChatView
            chatId={chatId} // your address
            limit={10}
            isConnected={true}
          />
        </div>
      </ChatUIProvider>
    </>
  );
}

export default PushChat;
