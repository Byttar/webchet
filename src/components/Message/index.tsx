import React, { useCallback } from 'react';
import { editMessage } from "../../services/edit";
import { removeMessage } from "../../services/remove"

import "./style.scss";

interface IMessage{
  author: string, 
  content: string,
  id: string,
  time: string,
  active: number,
  edited?: boolean
}

const Message: React.FC<IMessage> = ({author, content, id, time, active, edited}) => {

      const deleteMessage = useCallback((key:string) => {
        removeMessage(key);
      }, []);

      const EditMessage = useCallback((key: string) => {

        const newContent = prompt("Digite a nova mensagem");
        
        if(newContent)
        editMessage(key, newContent);
      }, []);


    let Message_from_user:boolean = localStorage.getItem('user') !== author; 
    let moment:Date = new Date(time);
    let timestamp:string = `${moment.getHours()}:${moment.getMinutes() < 10 ? ("0" + moment.getMinutes()) : ("" + moment.getMinutes())}`;




    return(
      <div className="Message">
        <div style={!Message_from_user ? {marginLeft: 'auto'} : {marginRight: 'auto', marginLeft: '0'}}>
          <p className="author"> 
          {author}
          <small>{(edited && active) && "(editada)"}</small>
          </p>
          <div>
            <p className="mensagem_content">{active ? content : "Mensagem Excluida"}</p>
            <div className="time">{timestamp}
              { localStorage.getItem("user") === author && active ? <div>
                  <i className="fas fa-pen-square" onClick={() => EditMessage(id)}></i>
                  <i className="fas fa-window-close" onClick={() => deleteMessage(id)}/>
              </div> : ""
              }
            </div>
          </div>
        </div>
      </div>
    )
}

export default Message;