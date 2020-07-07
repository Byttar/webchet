import React, { useEffect, useCallback, useState, FormEvent} from 'react';
import "./style.scss";
import { database } from "../../services/config"
import firebase from "firebase";
import Message from "../Message/index"
import { writeNewMessage } from "../../services/insert"

interface IMessage{
  author: string, 
  content: string,
  key: string,
  time: string,
  active: number,
  edited?: boolean
}

const Chat: React.FC = () => {

  const messageRef = database.ref().child("Messages");
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const HandleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let time = firebase.database.ServerValue.TIMESTAMP;
    writeNewMessage(localStorage.getItem('user'), event.currentTarget.MESSAGE.value, "text", time);
    event.currentTarget.MESSAGE.value = "";
  }

  const getLists = useCallback(async (message:IMessage) => {
    setMessages((old:Array<IMessage>) => [...old, message]);
  }, [setMessages])

  const setLists = useCallback(async (message:IMessage) => {
    const editedMessage:Array<IMessage> = [...messages];

    const MessageIndex = messages.findIndex(x => x.key === message.key);
    editedMessage[MessageIndex] = message;
    setMessages(editedMessage);
    
  }, [messages])

  useEffect(() => {
    
    messageRef.orderByChild("time").on('child_changed', function(data){
      const _data:IMessage = Object.assign(data.val(), {key : data.key})
      setLists(_data);
      console.log('changed');
   });

  }, [setLists, messageRef]);

  useEffect(() => {
    messageRef.orderByChild("time").on('child_added', function(data){
          const _data:IMessage = Object.assign(data.val(), {key : data.key})
          getLists(_data);
      });
  }, [getLists]);

  return (
    <div className="Chat">
      <div className="Messages" ref={el => {if(el) el.scrollTop = el.scrollHeight}}>
        {
          messages && messages.map((message: IMessage) => {  
          
          return <Message
              author={message.author}
              content={message.content}
              time={message.time} key={message.key}
              id={message.key} active={message.active}
              edited={message.edited}
            />
          })
        }
      </div > 
      <form className="SEND_MESSAGE" onSubmit={HandleSubmit}>
        <input type="text" name="MESSAGE" required/>
        <button><i className="fas fa-share"></i></button>
      </form>
    </div>
  );
}

export default Chat;